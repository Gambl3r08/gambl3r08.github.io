---
title: "eNMS + MCP: Integrating AI with an Enterprise Network Automation Platform"
description: "How I extended a 42K-line codebase with an MCP server to enable AI agents"
date: "2025-01-22"
published: true
lang: en
tags:
  - python
  - flask
  - network-automation
  - mcp
  - enterprise
---

# eNMS + MCP: Integrating AI with an Enterprise Network Automation Platform

eNMS is an open-source network automation platform with over 42,000 lines of Python, 39 service types, and multi-vendor support. My contribution was integrating an MCP (Model Context Protocol) server that allows AI agents to interact with the platform, enabling natural language automation on top of a robust enterprise codebase.

## The Problem

Enterprise network automation platforms are powerful but complex. Creating workflows that combine Netmiko, NAPALM, Ansible, and REST services requires navigating complex GUIs and knowing each service's specific parameters. AI agents could solve this, but they needed a standardized protocol to communicate with the platform.

## The Solution

I integrated FastMCP 3.0 as an MCP server within eNMS, exposing tools to execute services, manage workflows, query inventory, and access run results. The server includes multi-level authentication (read, write, execute, admin) and deploys as an independent container in the Docker stack.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Backend | Python 3.11+, Flask 3.1, Gunicorn |
| Database | PostgreSQL 14, SQLAlchemy 2.0, Alembic |
| Cache | Redis, Dramatiq (task queue) |
| Network | Netmiko, NAPALM, Scrapli, Ansible, NETCONF |
| Auth | JWT, LDAP, TACACS+, OAuth2/Azure, Vault |
| MCP | FastMCP 3.0, port 8780 |
| Infra | Docker Compose (5 services) |

## Architecture

```
[eNMS Main App]  <->  [PostgreSQL]  <->  [Redis]
    port 5000              5432
        ^
[Scheduler Service]     [MCP Server]
    port 5001            port 8780
                             ^
                      [AI Agents]
```

## Notable Code

The MCP server is configured as a FastMCP instance with granular authentication and database warmup:

```python
@asynccontextmanager
async def flowweaver_lifespan(mcp: FastMCP):
    """Initialize and cleanup FlowWeaver MCP server."""
    logger.info("FlowWeaver MCP server starting...")
    try:
        from eNMS.database import db
        with db.session_scope():
            db.fetch("service", id=1, allow_none=True, rbac=None)
        logger.info("Database connection warmed up")
    except Exception as e:
        logger.warning(f"Database warmup failed (non-fatal): {e}")
    yield
    logger.info("FlowWeaver MCP server shutting down...")

def get_mcp() -> FastMCP:
    global _mcp_instance
    if _mcp_instance is None:
        _mcp_instance = FastMCP(
            "FlowWeaver",
            instructions="""FlowWeaver MCP Server - Network Automation Platform
            This server provides tools to:
            - Execute automation services and workflows
            - Manage services (create, update, delete, duplicate)
            - Query device inventory and configurations
            - Access run results and logs
            - Schedule and manage tasks
            """,
        )
    return _mcp_instance
```

The authentication system uses decorators with granular permission levels, ensuring each MCP tool operation maps to the appropriate RBAC role:

```python
from eNMS.mcp.auth import (
    AUTH_ADMIN,
    AUTH_EXECUTE,
    AUTH_READ,
    AUTH_WRITE,
    get_creator_from_context,
    get_current_username,
    require_enms_auth,
)
```

## Key Takeaways

1. **MCP as a bridge between AI and legacy**: The Model Context Protocol allows AI agents to interact with existing systems without modifying the original business logic.

2. **Multi-level authentication is crucial**: In an enterprise system, read, write, execute, and admin operations must have differentiated permissions.

3. **Database warmup prevents cold starts**: Pre-warming the database connection during the MCP server lifespan eliminates latency on the first queries.

## Future Improvements

- [ ] Streaming of execution results via MCP
- [ ] Support for background tasks with progress tracking
- [ ] Inventory caching in the MCP server
- [ ] Per-tool usage metrics for MCP

## Conclusion

Integrating MCP into eNMS demonstrates that existing enterprise platforms can be AI-enabled without rewriting them. The MCP server acts as an intelligent adapter that exposes the capabilities of 42K lines of code through a protocol any AI agent can consume.

---

*Contribution by [Roberto Lozada](https://github.com/gambl3r08) in Barranquilla, Colombia.*
