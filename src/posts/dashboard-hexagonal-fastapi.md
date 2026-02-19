---
title: "Demo Frontend: Dashboard con Arquitectura Hexagonal en FastAPI"
description: "Cómo implementé un dashboard analítico usando puertos y adaptadores con FastAPI, Jinja2 y Chart.js"
date: "2024-07-10"
published: true
lang: es
tags:
  - python
  - fastapi
  - hexagonal-architecture
  - jinja2
  - chartjs
---

# Demo Frontend: Dashboard con Arquitectura Hexagonal en FastAPI

La mayoría de dashboards se construyen como monolitos donde la lógica de presentación, datos y configuración están entrelazados. Este proyecto aplica Arquitectura Hexagonal (Puertos y Adaptadores) a un dashboard analítico con FastAPI, separando completamente el dominio de la infraestructura y permitiendo cambiar fuentes de datos sin tocar la lógica de negocio.

## El Problema

Los dashboards típicos mezclan consultas a base de datos, transformación de datos y renderizado en los mismos archivos. Esto hace que cambiar la fuente de datos (de un archivo JSON a una API, o de una base de datos a otra) requiera reescribir gran parte del código. Se necesitaba una arquitectura que desacoplara estas responsabilidades.

## La Solución

Implementé un dashboard usando Arquitectura Hexagonal donde el dominio define puertos (interfaces abstractas) y la infraestructura proporciona adaptadores concretos. FastAPI sirve como interfaz HTTP, Jinja2 renderiza las vistas, y Chart.js visualiza los datos. Cambiar la fuente de datos es cuestión de crear un nuevo adaptador.

## Stack Tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| Backend | Python 3.11+, FastAPI, Uvicorn |
| Templates | Jinja2, HTML5, CSS3 |
| Visualización | Chart.js, responsive charts |
| Arquitectura | Hexagonal (Ports & Adapters) |
| Modelos | Pydantic, dataclasses |
| Testing | Pytest |

## Arquitectura

```
[HTTP Request]
       ↓
[FastAPI Routes] (Interfaces)
       ↓
[DashboardService] (Application)
       ↓
[DashboardPort] ←── interface (Domain)
       ↓
[DashboardAdapter] (Infrastructure)
       ↓
[Data Source] (JSON/API/DB)
```

## Desafíos Técnicos

### Puertos como Contratos del Dominio

El dominio define puertos abstractos que actúan como contratos. Cualquier adaptador que implemente estos métodos puede conectarse al sistema:

```python
from abc import ABC, abstractmethod
from src.domain.models.dashboard_config import DashboardConfig

class DashboardConfigPort(ABC):
    """Port interface for dashboard configuration operations"""

    @abstractmethod
    def get_dashboard_config(self) -> DashboardConfig:
        """Get dashboard configuration from a data source"""
        pass

    @abstractmethod
    def save_dashboard_config(self, config: DashboardConfig) -> bool:
        """Save dashboard configuration to a data source"""
        pass
```

### Adaptadores como Implementaciones Concretas

Los adaptadores implementan los puertos y conectan con la infraestructura real. El `DashboardAdapter` delega en el servicio de aplicación y expone datos para gráficos individuales:

```python
class DashboardAdapter(DashboardPort):
    """Adapter implementation for DashboardPort."""

    def __init__(self):
        self.dashboard_service = DashboardService()

    def get_dashboard_data(self) -> DashboardData:
        return self.dashboard_service.get_dashboard_data()

    def get_chart_data(self, chart_id: str) -> Optional[dict]:
        config = self.dashboard_service.config_adapter.get_dashboard_config()
        if chart_id in config.charts and config.charts[chart_id].chart_data:
            chart_config = config.charts[chart_id]
            return {
                "chart_type": chart_config.chart_type,
                "title": chart_config.title,
                "labels": chart_config.chart_data.labels,
                "datasets": chart_config.chart_data.datasets,
                "options": chart_config.options,
            }
        return None
```

### Separación en Capas

La estructura del proyecto refleja las capas hexagonales:
- **Domain**: Modelos (`DashboardConfig`, `DashboardData`) y puertos (interfaces abstractas)
- **Application**: Servicios que orquestan la lógica de negocio
- **Infrastructure**: Adaptadores que conectan con fuentes de datos reales
- **Interfaces**: Rutas FastAPI y templates Jinja2

## Aprendizajes Clave

1. **Hexagonal en Python es natural**: Python con ABC y type hints permite expresar puertos y adaptadores de forma limpia. Pydantic complementa con validación de modelos del dominio.

2. **El desacoplamiento paga dividendos**: Cuando necesité cambiar la fuente de configuración de JSON a un archivo YAML, solo tuve que crear un nuevo adaptador. Cero cambios en el dominio o la aplicación.

3. **FastAPI + Jinja2 es viable para dashboards**: No siempre se necesita un framework JavaScript pesado. Para dashboards internos, server-side rendering con Chart.js es suficiente y más simple de desplegar.

## Mejoras Futuras

- [ ] Adaptador para base de datos PostgreSQL
- [ ] WebSocket para actualización en tiempo real de gráficos
- [ ] Exportación de datos a CSV/Excel
- [ ] Sistema de plugins para nuevos tipos de gráficos

## Conclusión

Demo Frontend demuestra que la Arquitectura Hexagonal no es exclusiva de microservicios complejos. Aplicada a un dashboard, separa limpiamente la lógica de datos de la presentación, haciendo el código más testeable y extensible. El patrón de puertos y adaptadores en Python resulta elegante y práctico.

---

*Construido por [Roberto Lozada](https://github.com/gambl3r08) en Barranquilla, Colombia.*
