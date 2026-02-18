---
title: "Configurando FastAPI para Producción"
description: "Guía completa para configurar y desplegar FastAPI con las mejores prácticas"
date: "2024-02-01"
published: true
tags:
  - python
  - fastapi
  - backend
  - tutorial
---

# Configurando FastAPI para Producción

FastAPI es uno de los frameworks más populares para crear APIs en Python. En este artículo veremos cómo configurarlo correctamente para un entorno de producción.

## Estructura del Proyecto

Una buena estructura de proyecto es fundamental:

```
my_api/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── tests/
├── requirements.txt
└── Dockerfile
```

## Configuración Básica

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Mi API",
    description="API de ejemplo",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Variables de Entorno

Usa Pydantic Settings para manejar la configuración:

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    debug: bool = False

    class Config:
        env_file = ".env"

settings = Settings()
```

## Conclusión

Con estas configuraciones básicas, tu aplicación FastAPI estará lista para producción. En próximos artículos veremos cómo añadir autenticación, testing y despliegue en AWS.
