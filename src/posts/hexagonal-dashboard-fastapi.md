---
title: "Demo Frontend: Dashboard with Hexagonal Architecture in FastAPI"
description: "How I implemented an analytical dashboard using ports and adapters with FastAPI, Jinja2, and Chart.js"
date: "2024-07-10"
published: true
lang: en
tags:
  - python
  - fastapi
  - hexagonal-architecture
  - jinja2
  - chartjs
---

# Demo Frontend: Dashboard with Hexagonal Architecture in FastAPI

Most dashboards are built as monoliths where presentation, data, and configuration logic are intertwined. This project applies Hexagonal Architecture (Ports and Adapters) to an analytical dashboard with FastAPI, completely separating the domain from infrastructure and allowing data source changes without touching business logic.

## The Problem

Typical dashboards mix database queries, data transformation, and rendering in the same files. This means changing the data source (from a JSON file to an API, or from one database to another) requires rewriting a large portion of the code. An architecture was needed that decoupled these responsibilities.

## The Solution

I implemented a dashboard using Hexagonal Architecture where the domain defines ports (abstract interfaces) and infrastructure provides concrete adapters. FastAPI serves as the HTTP interface, Jinja2 renders views, and Chart.js visualizes data. Changing the data source is a matter of creating a new adapter.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Backend | Python 3.11+, FastAPI, Uvicorn |
| Templates | Jinja2, HTML5, CSS3 |
| Visualization | Chart.js, responsive charts |
| Architecture | Hexagonal (Ports & Adapters) |
| Models | Pydantic, dataclasses |
| Testing | Pytest |

## Architecture

```
[HTTP Request]
       ↓
[FastAPI Routes] (Interfaces)
       ↓
[DashboardService] (Application)
       ↓
[DashboardPort] <── interface (Domain)
       ↓
[DashboardAdapter] (Infrastructure)
       ↓
[Data Source] (JSON/API/DB)
```

## Technical Challenges

### Ports as Domain Contracts

The domain defines abstract ports that act as contracts. Any adapter that implements these methods can plug into the system:

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

### Adapters as Concrete Implementations

Adapters implement ports and connect to real infrastructure. The `DashboardAdapter` delegates to the application service and exposes data for individual charts:

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

### Layer Separation

The project structure reflects the hexagonal layers:
- **Domain**: Models (`DashboardConfig`, `DashboardData`) and ports (abstract interfaces)
- **Application**: Services that orchestrate business logic
- **Infrastructure**: Adapters that connect to real data sources
- **Interfaces**: FastAPI routes and Jinja2 templates

## Key Takeaways

1. **Hexagonal in Python feels natural**: Python with ABC and type hints allows expressing ports and adapters cleanly. Pydantic complements with domain model validation.

2. **Decoupling pays dividends**: When I needed to change the configuration source from JSON to a YAML file, I only had to create a new adapter. Zero changes to the domain or application layers.

3. **FastAPI + Jinja2 is viable for dashboards**: You don't always need a heavy JavaScript framework. For internal dashboards, server-side rendering with Chart.js is sufficient and simpler to deploy.

## Future Improvements

- [ ] PostgreSQL database adapter
- [ ] WebSocket for real-time chart updates
- [ ] Data export to CSV/Excel
- [ ] Plugin system for new chart types

## Conclusion

Demo Frontend demonstrates that Hexagonal Architecture isn't exclusive to complex microservices. Applied to a dashboard, it cleanly separates data logic from presentation, making the code more testable and extensible. The ports and adapters pattern in Python turns out to be both elegant and practical.

---

*Built by [Roberto Lozada](https://github.com/gambl3r08) in Barranquilla, Colombia.*
