---
title: "eNMS + MCP: Integrando IA con una Plataforma Enterprise de Automatización de Redes"
description: "Cómo extendí una plataforma de 42K líneas de código con un servidor MCP para habilitar agentes de IA"
date: "2025-01-22"
published: true
lang: es
tags:
  - python
  - flask
  - network-automation
  - mcp
  - enterprise
---

# eNMS + MCP: Integrando IA con una Plataforma Enterprise de Automatización de Redes

eNMS es una plataforma open source de automatización de redes con más de 42,000 líneas de Python, 39 tipos de servicios y soporte para múltiples fabricantes. Mi contribución fue integrar un servidor MCP (Model Context Protocol) que permite a agentes de IA interactuar con la plataforma, habilitando automatización por lenguaje natural sobre una base de código enterprise robusta.

## El Problema

Las plataformas de automatización de redes enterprise son potentes pero complejas. Crear workflows que combinen servicios de Netmiko, NAPALM, Ansible y REST requiere navegar interfaces gráficas complejas y conocer los parámetros específicos de cada servicio. Los agentes de IA podían resolver esto, pero necesitaban un protocolo estandarizado para comunicarse con la plataforma.

## La Solución

Integré FastMCP 3.0 como servidor MCP dentro de eNMS, exponiendo herramientas para ejecutar servicios, gestionar workflows, consultar inventario y acceder a resultados de ejecución. El servidor incluye autenticación multi-nivel (read, write, execute, admin) y se despliega como un contenedor independiente en el stack de Docker.

## Stack Tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| Backend | Python 3.11+, Flask 3.1, Gunicorn |
| Base de datos | PostgreSQL 14, SQLAlchemy 2.0, Alembic |
| Cache | Redis, Dramatiq (task queue) |
| Red | Netmiko, NAPALM, Scrapli, Ansible, NETCONF |
| Auth | JWT, LDAP, TACACS+, OAuth2/Azure, Vault |
| MCP | FastMCP 3.0, port 8780 |
| Infra | Docker Compose (5 servicios) |

## Arquitectura

```
[eNMS Main App]  ←→  [PostgreSQL]  ←→  [Redis]
    port 5000              5432
        ↑
[Scheduler Service]     [MCP Server]
    port 5001            port 8780
                             ↑
                      [AI Agents]
```

## Código Destacado

El servidor MCP se configura como una instancia FastMCP con autenticación granular y warmup de base de datos:

```python
@asynccontextmanager
async def flowweaver_lifespan(mcp: FastMCP):
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

## Aprendizajes Clave

1. **MCP como puente entre IA y legacy**: El Model Context Protocol permite que agentes de IA interactúen con sistemas existentes sin modificar la lógica de negocio original.

2. **Autenticación multi-nivel es crucial**: En un sistema enterprise, las operaciones de lectura, escritura, ejecución y administración deben tener permisos diferenciados.

3. **Database warmup previene cold starts**: Pre-calentar la conexión a la base de datos durante el lifespan del servidor MCP elimina latencia en las primeras consultas.

## Mejoras Futuras

- [ ] Streaming de resultados de ejecución vía MCP
- [ ] Soporte para background tasks con progreso
- [ ] Cache de inventario en el servidor MCP
- [ ] Métricas de uso por herramienta MCP

## Conclusión

Integrar MCP en eNMS demuestra que plataformas enterprise existentes pueden habilitarse para IA sin reescribirlas. El servidor MCP actúa como un adaptador inteligente que expone las capacidades de 42K líneas de código a través de un protocolo que cualquier agente de IA puede consumir.

---

*Contribución de [Roberto Lozada](https://github.com/gambl3r08) en Barranquilla, Colombia.*
