---
title: "Flow Weaver: Orquestador de Workflows de Red Impulsado por IA"
description: "Cómo construí un sistema multi-agente que traduce lenguaje natural en workflows complejos de automatización de redes"
date: "2025-02-10"
published: true
lang: es
tags:
  - python
  - fastapi
  - openai-agents
  - network-automation
  - clean-architecture
---

# Flow Weaver: Orquestador de Workflows de Red Impulsado por IA

Imagina decirle a un sistema: *"Haz backup de la configuración de todos los routers en la sede principal, valida que el protocolo BGP esté activo, y envía un reporte por Slack"*. Eso es exactamente lo que hace Flow Weaver Agent: traduce solicitudes en lenguaje natural en workflows ejecutables de automatización de redes, orquestando más de 30 tipos de servicios diferentes.

## El Problema

La automatización de redes enterprise involucra decenas de herramientas: Netmiko para SSH, NAPALM para configuración multi-vendor, Ansible para playbooks, REST APIs para integraciones con ServiceNow o NetBox. Crear un workflow que combine estas herramientas requiere conocimiento profundo de cada una y horas de configuración manual. Los ingenieros de red necesitaban una forma más intuitiva de orquestar operaciones complejas.

## La Solución

Flow Weaver Agent es un sistema multi-agente que actúa como intermediario inteligente entre el usuario y una plataforma de automatización de redes (eNMS). Usa el OpenAI Agents SDK para interpretar la intención del usuario, descubrir el inventario de dispositivos disponibles, crear servicios con parámetros validados, conectarlos en un grafo de workflow, y ejecutar todo automáticamente.

## Stack Tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| Backend | Python 3.11+, FastAPI, Uvicorn |
| Base de datos | PostgreSQL 16 (asyncpg), SQLAlchemy 2.0 async, Alembic |
| AI/LLM | OpenAI Agents SDK, LiteLLM (multi-provider), Anthropic Claude |
| Protocolos | REST API, MCP (Model Context Protocol), WebSocket |
| Infra | Docker, Docker Compose, multi-stage builds |

## Arquitectura

El sistema sigue una arquitectura de capas con agentes especializados:

```
Solicitud del Usuario (lenguaje natural)
         ↓
[Capa de Agentes IA] → Interpreta intención, explora inventario
         ↓
[Capa de Herramientas] → 30+ funciones @function_tool especializadas
         ↓
[Motor de Validación] → Valida configuraciones con reglas por servicio
         ↓
[Contexto de Workflow] → Thread-safe, gestiona servicios y edges
         ↓
[Integración Backend] → Llamadas REST al API de automatización
         ↓
[Ejecución + Aprendizaje] → Ejecuta, analiza resultados, aprende de errores
```

## Desafíos Técnicos

### Circuit Breaker para Prevenir Fallas en Cascada

Cuando el backend de automatización tiene problemas, las llamadas repetidas pueden saturar el sistema. Implementé un Circuit Breaker con tres estados que protege al sistema automáticamente:

```python
class CircuitState(Enum):
    CLOSED = "closed"      # Operación normal
    OPEN = "open"          # Servicio fallando, bloquear requests
    HALF_OPEN = "half_open"  # Probando recuperación

@dataclass
class CircuitBreakerConfig:
    failure_threshold: int = 5    # Fallos antes de abrir circuito
    success_threshold: int = 2    # Éxitos en half-open para cerrar
    timeout: float = 60.0         # Segundos antes de probar half-open
    half_open_max_calls: int = 3  # Máximo de llamadas en half-open
```

### Auto-Corrección Inspirada en OpenAI Kepler

Uno de los features más interesantes es el motor de auto-corrección. Cuando una herramienta falla, el sistema clasifica el error, busca fixes conocidos en una base de aprendizajes persistentes, y reintenta automáticamente con parámetros corregidos:

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

### Pipeline de Ejecución Paralela

Para workflows con servicios independientes, implementé un pipeline que analiza dependencias usando NetworkX y ejecuta en paralelo cuando es posible:

```python
class TaskStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
```

## Código Destacado

El corazón del sistema es el `WorkflowContext`, un contexto thread-safe que rastrea todo el estado de la construcción del workflow. Usa hash-based lookups para O(1) en búsquedas de servicios y un grafo de dependencias para optimizar la ejecución:

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

## Aprendizajes Clave

1. **La auto-corrección cambia el juego**: Persistir los fixes de errores entre sesiones reduce drásticamente las fallas repetitivas. El patrón de "aprender de los errores" es fundamental para sistemas de IA en producción.

2. **Thread-safety desde el diseño**: El uso de `Lock` en lugar de `RLock` y hash-based indexes para lookups O(1) fue crucial para manejar múltiples agentes concurrentes sin degradar performance.

3. **Circuit Breaker es esencial en integraciones**: En un sistema que coordina múltiples servicios externos, el Circuit Breaker previene que un servicio caído arrastre a todo el sistema.

4. **Multi-provider LLM como estrategia**: Implementar soporte para OpenAI, Anthropic y Azure a través de LiteLLM permite cambiar de proveedor sin modificar código, crucial para resiliencia y costos.

## Mejoras Futuras

- [ ] Implementar WebSocket para streaming de progreso en tiempo real al frontend
- [ ] Agregar soporte para workflows condicionales con branching dinámico
- [ ] Crear un visual workflow builder que muestre el grafo de servicios
- [ ] Implementar A/B testing entre proveedores LLM por tipo de tarea

## Conclusión

Flow Weaver Agent demuestra que la combinación de agentes IA con patrones de ingeniería de software robustos (Circuit Breaker, auto-corrección, pipelines paralelos) puede crear sistemas que realmente simplifican operaciones complejas. El proyecto tiene más de 20,000 líneas de código y maneja más de 30 tipos de servicios de red, pero para el usuario final es tan simple como escribir lo que necesita en lenguaje natural.

---

*Construido por [Roberto Lozada](https://github.com/gambl3r08) en Barranquilla, Colombia.*
