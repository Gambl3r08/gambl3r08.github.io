---
title: "PQR System: Microservicios con ML, RAG y Kubernetes en Google Cloud"
description: "Cómo diseñé un sistema distribuido que clasifica quejas con ML, busca regulaciones con RAG y se despliega en Kubernetes"
date: "2024-09-23"
published: true
lang: es
tags:
  - microservices
  - machine-learning
  - kubernetes
  - google-cloud
  - rag
---

# PQR System: Microservicios con ML, RAG y Kubernetes en Google Cloud

Cuando una empresa recibe cientos de peticiones, quejas y reclamos (PQR) diariamente, clasificarlos manualmente, asignarlos al responsable correcto y verificar la normatividad aplicable es un proceso lento y propenso a errores. Este sistema automatiza todo ese flujo usando ML para clasificación, RAG para búsqueda normativa, y Kafka para notificaciones en tiempo real.

## El Problema

En el contexto colombiano, las empresas deben gestionar PQRs (Peticiones, Quejas, Reclamos) dentro de plazos legales. Clasificar cada PQR por tipo, prioridad y categoría, determinar si requiere escalamiento humano o respuesta automática, y consultar la normatividad aplicable eran tareas manuales que consumían horas del equipo administrativo.

## La Solución

Diseñé una arquitectura de microservicios con tres servicios independientes: un servicio de autenticación con Firestore, un motor de procesamiento de PQR con 3 modelos de ML, y un servicio de búsqueda normativa con RAG. Todo orquestado por Nginx como API gateway y desplegado en Kubernetes con soporte para Google Cloud Run.

## Stack Tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| Backend | Python 3.11-3.12, FastAPI, Uvicorn |
| ML/AI | HuggingFace Transformers, PyTorch, scikit-learn, LangChain |
| Base de datos | Google Firestore, ChromaDB (vector), FAISS |
| Mensajería | Apache Kafka (Confluent Cloud, SASL/SSL) |
| Cloud | Google Cloud Run, Artifact Registry, Cloud Build, IAM |
| Orquestación | Kubernetes, Docker Compose, Nginx |

## Arquitectura

```
Cliente
  ↓
[Nginx Gateway] (rate limiting, security headers)
  ├→ /auth/*  → [Auth Service]     → Firestore (JWT)
  ├→ /pqr/*   → [PQR Manager]      → ML Models + Kafka
  └→ /api/*   → [Regulation RAG]   → ChromaDB + OpenAI
```

## Desafíos Técnicos

### Motor de Decisiones con ML

El corazón del sistema es un decision engine que combina los resultados de 3 modelos de ML para determinar la acción correcta. La lógica es clara y determinista después de la clasificación:

```python
def decision_engine(
    pqr_type: PQRType, category: PQRCategory, priority: PQRPriority
) -> PQRAction:
    # Siempre escalar si prioridad alta o tipo reclamo
    if priority == PQRPriority.ALTA or pqr_type == PQRType.RECLAMO:
        return PQRAction.ESCALAR_A_HUMANO

    # Consultar normativa si es tema regulatorio
    if category == PQRCategory.NORMATIVIDAD:
        return PQRAction.CONSULTAR_NORMATIVA

    # Automatizar para peticiones/quejas en categorías conocidas
    if pqr_type in [PQRType.PETICION, PQRType.QUEJA] and category in [
        PQRCategory.MANTENIMIENTO,
        PQRCategory.SERVICIOS_GENERALES,
        PQRCategory.SEGURIDAD,
        PQRCategory.FACTURACION,
    ]:
        return PQRAction.RESPUESTA_AUTOMATICA

    return PQRAction.ESCALAR_A_HUMANO
```

### Búsqueda Semántica de Regulaciones con RAG

Para consultas normativas, implementé un pipeline RAG con ChromaDB y embeddings de OpenAI. La búsqueda retorna los fragmentos más relevantes de documentos regulatorios con scores de similitud:

```python
def search_regulations(consult: str, index_dir: str, top_k: int = 5) -> list[tuple[Document, float]]:
    embeddings = OpenAIEmbeddings()
    db = Chroma(persist_directory=index_dir, embedding_function=embeddings)
    return db.similarity_search_with_score(consult, k=top_k)
```

### Event Streaming con Kafka

Cada PQR procesado genera un evento en Kafka para notificaciones en tiempo real. Implementé un producer con SASL/SSL para Confluent Cloud:

```python
class KafkaPQRProducer:
    def __configure(self):
        self.producer = Producer({
            'bootstrap.servers': self.bootstrap_servers,
            'security.protocol': 'SASL_SSL',
            'sasl.mechanism': 'PLAIN',
            'sasl.username': self.username,
            'sasl.password': self.password,
            'session.timeout.ms': 45000,
            'client.id': self.client_id
        })

    def send(self, message: dict):
        self.producer.produce(
            topic=self.topic,
            value=json.dumps(message).encode("utf-8"),
            callback=self.delivery_report
        )
        self.producer.poll(0)
```

## Código Destacado

Los enums del dominio reflejan el modelo de negocio colombiano de PQRs, con tipos, categorías y acciones claramente definidos:

```python
class PQRType(str, Enum):
    RECLAMO = "Reclamo"
    PETICION = "Petición"
    QUEJA = "Queja"

class PQRAction(str, Enum):
    ESCALAR_A_HUMANO = "escalar a humano"
    RESPUESTA_AUTOMATICA = "respuesta automatica"
    CONSULTAR_NORMATIVA = "consultar normativa"
```

## Aprendizajes Clave

1. **Clean Architecture en microservicios**: La separación en Domain/Application/Infrastructure/Interfaces por servicio hace que cada microservicio sea independiente y testeable.

2. **Kubernetes para ML**: Los workloads de ML necesitan más recursos (2Gi memoria vs 512Mi para auth). Los manifiestos de K8s permiten configurar esto por servicio con PersistentVolumes para modelos.

3. **Timeouts diferenciados por servicio**: En Nginx, configuré 30s para auth, 60s para ML y 120s para RAG/AI, reflejando la naturaleza diferente de cada operación.

## Mejoras Futuras

- [ ] Implementar feedback loop para reentrenar modelos con datos reales
- [ ] Agregar dashboard de métricas con tiempos de respuesta por tipo de PQR
- [ ] Soporte para adjuntos (imágenes, documentos) en las PQR
- [ ] Integración con bases de datos de normatividad actualizada

## Conclusión

PQR System demuestra que combinar ML clásico (scikit-learn), NLP moderno (Transformers), y RAG con LLMs en una arquitectura de microservicios puede resolver problemas reales de negocio. El sistema reduce el tiempo de clasificación de minutos a milisegundos, y la búsqueda normativa de horas a segundos, todo desplegado en una infraestructura cloud-native escalable.

---

*Construido por [Roberto Lozada](https://github.com/gambl3r08) en Barranquilla, Colombia.*
