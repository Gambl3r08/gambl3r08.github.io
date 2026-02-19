---
title: "Flow Weaver: AI-Powered Network Workflow Orchestrator"
description: "How I built a multi-agent system that translates natural language into complex network automation workflows"
date: "2025-02-10"
published: true
lang: en
tags:
  - python
  - fastapi
  - openai-agents
  - network-automation
  - clean-architecture
---

# Flow Weaver: AI-Powered Network Workflow Orchestrator

Imagine telling a system: *"Back up the configuration of all routers at the main site, validate that BGP is active, and send a report via Slack."* That's exactly what Flow Weaver Agent does: it translates natural language requests into executable network automation workflows, orchestrating over 30 different service types.

## The Problem

Enterprise network automation involves dozens of tools: Netmiko for SSH, NAPALM for multi-vendor configuration, Ansible for playbooks, REST APIs for integrations with ServiceNow or NetBox. Creating a workflow that combines these tools requires deep knowledge of each one and hours of manual configuration. Network engineers needed a more intuitive way to orchestrate complex operations.

## The Solution

Flow Weaver Agent is a multi-agent system that acts as an intelligent intermediary between the user and a network automation platform (eNMS). It uses the OpenAI Agents SDK to interpret user intent, discover available device inventory, create services with validated parameters, connect them in a workflow graph, and execute everything automatically.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Backend | Python 3.11+, FastAPI, Uvicorn |
| Database | PostgreSQL 16 (asyncpg), SQLAlchemy 2.0 async, Alembic |
| AI/LLM | OpenAI Agents SDK, LiteLLM (multi-provider), Anthropic Claude |
| Protocols | REST API, MCP (Model Context Protocol), WebSocket |
| Infrastructure | Docker, Docker Compose, multi-stage builds |

## Architecture

The system follows a layered architecture with specialized agents:

```
User Request (natural language)
         ↓
[AI Agent Layer] → Interprets intent, explores inventory
         ↓
[Tool Layer] → 30+ specialized @function_tool functions
         ↓
[Validation Engine] → Validates configurations with per-service rules
         ↓
[Workflow Context] → Thread-safe, manages services and edges
         ↓
[Backend Integration] → REST calls to automation API
         ↓
[Execution + Learning] → Executes, analyzes results, learns from errors
```

## Technical Challenges

### Circuit Breaker to Prevent Cascading Failures

When the automation backend has issues, repeated calls can overwhelm the system. I implemented a three-state Circuit Breaker that protects the system automatically:

```python
class CircuitState(Enum):
    CLOSED = "closed"      # Normal operation
    OPEN = "open"          # Service failing, block requests
    HALF_OPEN = "half_open"  # Testing recovery

@dataclass
class CircuitBreakerConfig:
    failure_threshold: int = 5    # Failures before opening circuit
    success_threshold: int = 2    # Successes in half-open to close
    timeout: float = 60.0         # Seconds before trying half-open
    half_open_max_calls: int = 3  # Max calls allowed in half-open
```

### Self-Correction Inspired by OpenAI Kepler

One of the most interesting features is the self-correction engine. When a tool fails, the system classifies the error, searches for known fixes in a persistent learnings database, and automatically retries with corrected parameters:

```python
@dataclass
class CorrectionAttempt:
    original_tool: str
    original_args: dict[str, Any]
    error_message: str
    error_category: str      # timeout, validation, auth, connection
    correction_strategy: str  # parameter_adjust, alternative_tool, escalate
    corrected_args: dict[str, Any] | None
    success: bool
    attempt_number: int
    learning_id: int | None = None
    correction_source: str = ""  # learnings_store, static_rules, schema_validation
```

### Parallel Execution Pipeline

For workflows with independent services, I implemented a pipeline that analyzes dependencies using NetworkX and executes in parallel when possible:

```python
class TaskStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
```

## Notable Code

The heart of the system is the `WorkflowContext`, a thread-safe context that tracks the entire workflow construction state. It uses hash-based lookups for O(1) service searches and a dependency graph to optimize execution:

```python
class WorkflowPhase(Enum):
    PLANNING = "planning"
    INVENTORY = "inventory"
    VALIDATION = "validation"
    CONSTRUCTION = "construction"
    EXECUTION = "execution"
    DIAGNOSIS = "diagnosis"

@dataclass
class ServiceInfo:
    service_id: int
    service_name: str
    service_type: str
    scoped_name: str
    config: dict[str, Any]
    dependencies: list[int] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)
```

## Key Takeaways

1. **Self-correction is a game changer**: Persisting error fixes across sessions drastically reduces repetitive failures. The "learn from mistakes" pattern is fundamental for production AI systems.

2. **Thread-safety by design**: Using `Lock` instead of `RLock` and hash-based indexes for O(1) lookups was crucial for handling multiple concurrent agents without degrading performance.

3. **Circuit Breaker is essential for integrations**: In a system coordinating multiple external services, the Circuit Breaker prevents a single failed service from bringing down the entire system.

4. **Multi-provider LLM as strategy**: Implementing support for OpenAI, Anthropic, and Azure through LiteLLM allows switching providers without code changes, crucial for resilience and cost management.

## Future Improvements

- [ ] Implement WebSocket for real-time progress streaming to frontend
- [ ] Add support for conditional workflows with dynamic branching
- [ ] Create a visual workflow builder showing the service graph
- [ ] Implement A/B testing between LLM providers per task type

## Conclusion

Flow Weaver Agent demonstrates that combining AI agents with robust software engineering patterns (Circuit Breaker, self-correction, parallel pipelines) can create systems that genuinely simplify complex operations. The project has over 20,000 lines of code and handles more than 30 network service types, but for the end user, it's as simple as typing what they need in natural language.

---

*Built by [Roberto Lozada](https://github.com/gambl3r08) in Barranquilla, Colombia.*
