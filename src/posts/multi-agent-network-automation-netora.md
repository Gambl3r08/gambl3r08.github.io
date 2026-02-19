---
title: "Netora: Multi-Agent System for Intelligent Network Automation"
description: "How I designed a platform of specialized AI agents that orchestrate network operations across 6 different platforms"
date: "2025-02-17"
published: true
lang: en
tags:
  - python
  - fastapi
  - openai-agents
  - multi-agent
  - network-automation
---

# Netora: Multi-Agent System for Intelligent Network Automation

In an enterprise network infrastructure, engineers constantly jump between NetBox for inventory, Infoblox for IPAM, ServiceNow for tickets, AWX for playbooks, and SSH terminals for live commands. Netora unifies all of this into a conversational interface where a system of specialized AI agents understands what you need and executes it on the right platform.

## The Problem

Network operations teams manage 5-6 different platforms daily. Creating a host in NetBox, assigning an IP in Infoblox, configuring the device via SSH, and documenting everything in ServiceNow are tasks that involve multiple tools, each with its own API and conventions. The cognitive load is enormous and human errors are frequent.

## The Solution

Netora Agent is a multi-agent orchestration platform with 6 specialized agents, each expert in a specific platform. A triage agent analyzes the user's intent and delegates to the appropriate agent, maintaining a persistent conversation context and self-correction capabilities.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Backend | Python 3.13, FastAPI, Uvicorn |
| Database | PostgreSQL 15 (asyncpg), SQLAlchemy 2.0, Alembic |
| AI/LLM | OpenAI Agents SDK, FastMCP 3.0 |
| Network | Netmiko, Paramiko (SSH) |
| Integrations | NetBox, Infoblox, ServiceNow, AWX/Ansible |
| Infrastructure | Docker Compose, PgAdmin |

## Architecture

```
User → [Triage Agent] → Analyzes intent
              ↓
    ┌─────────┼──────────────┬──────────────┬──────────────┐
    ↓         ↓              ↓              ↓              ↓
[Device]  [NetBox]     [Infoblox]   [ServiceNow]       [AWX]
 Agent     Agent         Agent         Agent           Agent
   ↓         ↓              ↓              ↓              ↓
  SSH     REST API      REST API      REST API        REST API
```

## Technical Challenges

### Intelligent Routing with Grammatical Indicators

The triage agent doesn't just use keywords; it analyzes the grammatical structure of the request. I implemented an indicator system that distinguishes between "create a device **in** NetBox" vs "create a device **with data from** NetBox":

```python
def get_triage_instructions():
    current_date = datetime.now().strftime("%Y-%m-%d")
    return f"""You are the main coordination agent for network operations.
CURRENT DATE: {current_date}
You NEVER process requests yourself. You ONLY analyze the user's intent
and route to the correct specialized agent.

GRAMMATICAL DESTINATION INDICATORS:
  "en X"           → X is the destination platform
  "para X"         → X is the destination platform
  "de X" / "del X" → X is a reference, NOT the destination
  "desde X"        → X is a data source, NOT the destination
  "con datos de X" → X is a reference, NOT the destination
"""
```

### Persistent Self-Correction System

When a tool call fails, the system doesn't just retry: it classifies the error, searches for known fixes, and learns from the correction for future sessions. I implemented a TTL cache with eviction policy:

```python
class _TTLCache:
    def __init__(self, ttl: float = 300, max_size: int = 256):
        self._ttl = ttl
        self._max_size = max_size
        self._store: dict[str, tuple[float, Any]] = {}
        self._hits = 0
        self._misses = 0

    def get(self, key: str) -> Any | None:
        entry = self._store.get(key)
        if entry is None:
            self._misses += 1
            return None
        ts, value = entry
        if time.monotonic() - ts > self._ttl:
            del self._store[key]
            self._misses += 1
            return None
        self._hits += 1
        return value
```

### Transparent Self-Correction Wrapper

The most elegant part of the design is that self-correction is transparent to the agents. A wrapper intercepts tool calls, detects errors, and applies corrections without the agent needing to know:

```python
def wrap_with_self_correction(tool: Any) -> Any:
    original_invoke = tool.on_invoke_tool
    tool_name: str = getattr(tool, "name", "unknown")

    async def _wrapped_invoke(ctx: Any, raw_json: str) -> Any:
        result = await original_invoke(ctx, raw_json)
        error_msg = _extract_error(result)
        if error_msg is None:
            return result
        try:
            return await _attempt_correction(
                tool_name, original_invoke, ctx, raw_json, result, error_msg,
            )
        except Exception:
            return result

    tool.on_invoke_tool = _wrapped_invoke
    return tool
```

## Notable Code

The main application is surprisingly clean thanks to FastAPI and the separation into independent modules per agent:

```python
app = FastAPI(
    title="Multi-Agent API",
    description="Conversational interface for intelligent network automation agents",
    version="1.0.0",
)

app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(file_router)
app.include_router(session_router)
app.include_router(settings_router)
app.include_router(user_router)
app.include_router(admin_router, prefix="/admin", tags=["admin"])
```

## Key Takeaways

1. **Specialized agents outperform generalists**: A single agent with all tools gets confused. Dividing by domain (NetBox, Infoblox, etc.) dramatically improves routing accuracy.

2. **Grammatical context matters**: In a bilingual system (Spanish/English), grammatical indicators are more reliable than keywords for determining the target platform.

3. **Self-correction must be transparent**: Intercepting tool calls with a wrapper the agent doesn't know about allows correcting errors without complicating agent instructions.

4. **Correlation IDs for multi-agent**: Tracking a request's flow through multiple agents requires correlation IDs from the start. I implemented this at the workflow tracking level.

## Future Improvements

- [ ] Add Terraform/IaC agent
- [ ] Implement approval workflows for configuration changes
- [ ] Multi-tenant support with team isolation
- [ ] Usage analytics dashboard per agent

## Conclusion

Netora demonstrates that multi-agent architecture is the right path for systems integrating multiple platforms. Each agent is an expert in its domain, triage is intelligent in routing, and self-correction makes the system improve with use. With 6 agents, 50+ tools, and over 15,000 lines of code, Netora transforms network operations that took hours into conversations that take minutes.

---

*Built by [Roberto Lozada](https://github.com/gambl3r08) in Barranquilla, Colombia.*
