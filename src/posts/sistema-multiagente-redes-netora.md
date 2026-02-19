---
title: "Netora: Sistema Multi-Agente para Automatización Inteligente de Redes"
description: "Cómo diseñé una plataforma de agentes IA especializados que orquestan operaciones de red a través de 6 plataformas diferentes"
date: "2025-02-17"
published: true
lang: es
tags:
  - python
  - fastapi
  - openai-agents
  - multi-agent
  - network-automation
---

# Netora: Sistema Multi-Agente para Automatización Inteligente de Redes

En una infraestructura de red enterprise, los ingenieros saltan constantemente entre NetBox para inventario, Infoblox para IPAM, ServiceNow para tickets, AWX para playbooks, y terminales SSH para comandos en vivo. Netora unifica todo esto en una interfaz conversacional donde un sistema de agentes IA especializados entiende lo que necesitas y lo ejecuta en la plataforma correcta.

## El Problema

Los equipos de operaciones de red manejan 5-6 plataformas diferentes diariamente. Crear un host en NetBox, asignarle una IP en Infoblox, configurar el dispositivo vía SSH y documentar todo en ServiceNow son tareas que involucran múltiples herramientas, cada una con su propia API y convenciones. La carga cognitiva es enorme y los errores humanos, frecuentes.

## La Solución

Netora Agent es una plataforma de orquestación multi-agente con 6 agentes especializados, cada uno experto en una plataforma específica. Un agente de triage analiza la intención del usuario y delega al agente apropiado, manteniendo un contexto de conversación persistente y capacidades de auto-corrección.

## Stack Tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| Backend | Python 3.13, FastAPI, Uvicorn |
| Base de datos | PostgreSQL 15 (asyncpg), SQLAlchemy 2.0, Alembic |
| AI/LLM | OpenAI Agents SDK, FastMCP 3.0 |
| Red | Netmiko, Paramiko (SSH) |
| Integraciones | NetBox, Infoblox, ServiceNow, AWX/Ansible |
| Infra | Docker Compose, PgAdmin |

## Arquitectura

```
Usuario → [Triage Agent] → Analiza intención
                ↓
    ┌───────────┼───────────────┬──────────────┬──────────────┐
    ↓           ↓               ↓              ↓              ↓
[Device]   [NetBox]      [Infoblox]    [ServiceNow]      [AWX]
 Agent      Agent          Agent          Agent          Agent
   ↓           ↓               ↓              ↓              ↓
  SSH      REST API       REST API       REST API       REST API
```

## Desafíos Técnicos

### Routing Inteligente con Indicadores Gramaticales

El agente de triage no solo usa keywords, sino que analiza la estructura gramatical del request. Implementé un sistema de indicadores que distingue entre "crear un dispositivo **en** NetBox" vs "crear un dispositivo **con datos de** NetBox":

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

### Sistema de Auto-Corrección Persistente

Cuando un tool call falla, el sistema no solo reintenta: clasifica el error, busca fixes conocidos, y aprende de la corrección para sesiones futuras. Implementé un TTL cache con eviction policy:

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

### Wrapper de Auto-Corrección Transparente

Lo más elegante del diseño es que la auto-corrección es transparente para los agentes. Un wrapper intercepta los tool calls, detecta errores, y aplica correcciones sin que el agente necesite saberlo:

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

## Código Destacado

La aplicación principal es sorprendentemente limpia gracias a FastAPI y la separación en módulos independientes por agente:

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

## Aprendizajes Clave

1. **Los agentes especializados superan al generalista**: Un solo agente con todas las herramientas se confunde. Dividir por dominio (NetBox, Infoblox, etc.) mejora dramáticamente la precisión del routing.

2. **El contexto gramatical importa**: En un sistema bilingüe (español/inglés), los indicadores gramaticales son más confiables que los keywords para determinar la plataforma destino.

3. **La auto-corrección debe ser transparente**: Interceptar tool calls con un wrapper que el agente no conoce permite corregir errores sin complicar las instrucciones del agente.

4. **Correlation IDs para multi-agente**: Rastrear el flujo de un request a través de múltiples agentes requiere correlation IDs desde el inicio. Lo implementé a nivel de workflow tracking.

## Mejoras Futuras

- [ ] Agregar agente para Terraform/IaC
- [ ] Implementar approval workflows para cambios de configuración
- [ ] Soporte para multi-tenant con aislamiento por equipo
- [ ] Dashboard de analytics de uso por agente

## Conclusión

Netora demuestra que la arquitectura multi-agente es el camino correcto para sistemas que integran múltiples plataformas. Cada agente es experto en su dominio, el triage es inteligente en el routing, y la auto-corrección hace que el sistema mejore con el uso. Con 6 agentes, 50+ herramientas y más de 15,000 líneas de código, Netora transforma operaciones de red que tomaban horas en conversaciones de minutos.

---

*Construido por [Roberto Lozada](https://github.com/gambl3r08) en Barranquilla, Colombia.*
