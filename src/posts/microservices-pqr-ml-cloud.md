---
title: "PQR System: Microservices with ML, RAG, and Kubernetes on Google Cloud"
description: "How I designed a distributed system that classifies complaints with ML, searches regulations with RAG, and deploys on Kubernetes"
date: "2024-09-23"
published: true
lang: en
tags:
  - microservices
  - machine-learning
  - kubernetes
  - google-cloud
  - rag
---

# PQR System: Microservices with ML, RAG, and Kubernetes on Google Cloud

When a company receives hundreds of petitions, complaints, and claims (PQR) daily, manually classifying them, assigning them to the right person, and verifying applicable regulations is a slow, error-prone process. This system automates that entire flow using ML for classification, RAG for regulatory search, and Kafka for real-time notifications.

## The Problem

In the Colombian context, companies must manage PQRs (Petitions, Complaints, Claims) within legal deadlines. Classifying each PQR by type, priority, and category, determining whether it requires human escalation or automatic response, and consulting applicable regulations were manual tasks that consumed hours of administrative team time.

## The Solution

I designed a microservices architecture with three independent services: an authentication service with Firestore, a PQR processing engine with 3 ML models, and a regulatory search service with RAG. Everything orchestrated by Nginx as an API gateway and deployed on Kubernetes with Google Cloud Run support.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Backend | Python 3.11-3.12, FastAPI, Uvicorn |
| ML/AI | HuggingFace Transformers, PyTorch, scikit-learn, LangChain |
| Database | Google Firestore, ChromaDB (vector), FAISS |
| Messaging | Apache Kafka (Confluent Cloud, SASL/SSL) |
| Cloud | Google Cloud Run, Artifact Registry, Cloud Build, IAM |
| Orchestration | Kubernetes, Docker Compose, Nginx |

## Architecture

```
Client
  ↓
[Nginx Gateway] (rate limiting, security headers)
  ├→ /auth/*  → [Auth Service]     → Firestore (JWT)
  ├→ /pqr/*   → [PQR Manager]      → ML Models + Kafka
  └→ /api/*   → [Regulation RAG]   → ChromaDB + OpenAI
```

## Technical Challenges

### Decision Engine with ML

The system's core is a decision engine that combines results from 3 ML models to determine the correct action. The logic is clear and deterministic after classification:

```python
def decision_engine(
    pqr_type: PQRType, category: PQRCategory, priority: PQRPriority
) -> PQRAction:
    # Always escalate if high priority or complaint type
    if priority == PQRPriority.ALTA or pqr_type == PQRType.RECLAMO:
        return PQRAction.ESCALAR_A_HUMANO

    # Consult regulations if regulatory topic
    if category == PQRCategory.NORMATIVIDAD:
        return PQRAction.CONSULTAR_NORMATIVA

    # Automate for petitions/complaints in known categories
    if pqr_type in [PQRType.PETICION, PQRType.QUEJA] and category in [
        PQRCategory.MANTENIMIENTO,
        PQRCategory.SERVICIOS_GENERALES,
        PQRCategory.SEGURIDAD,
        PQRCategory.FACTURACION,
    ]:
        return PQRAction.RESPUESTA_AUTOMATICA

    return PQRAction.ESCALAR_A_HUMANO
```

### Semantic Regulation Search with RAG

For regulatory queries, I implemented a RAG pipeline with ChromaDB and OpenAI embeddings. The search returns the most relevant fragments of regulatory documents with similarity scores:

```python
def search_regulations(consult: str, index_dir: str, top_k: int = 5) -> list[tuple[Document, float]]:
    embeddings = OpenAIEmbeddings()
    db = Chroma(persist_directory=index_dir, embedding_function=embeddings)
    return db.similarity_search_with_score(consult, k=top_k)
```

### Event Streaming with Kafka

Each processed PQR generates a Kafka event for real-time notifications. I implemented a producer with SASL/SSL for Confluent Cloud:

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

## Notable Code

The domain enums reflect the Colombian PQR business model, with clearly defined types, categories, and actions:

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

## Key Takeaways

1. **Clean Architecture in microservices**: The Domain/Application/Infrastructure/Interfaces separation per service makes each microservice independent and testable.

2. **Kubernetes for ML**: ML workloads need more resources (2Gi memory vs 512Mi for auth). K8s manifests allow configuring this per service with PersistentVolumes for models.

3. **Differentiated timeouts per service**: In Nginx, I configured 30s for auth, 60s for ML, and 120s for RAG/AI, reflecting the different nature of each operation.

## Future Improvements

- [ ] Implement feedback loop to retrain models with real data
- [ ] Add metrics dashboard with response times per PQR type
- [ ] Support for attachments (images, documents) in PQRs
- [ ] Integration with updated regulatory databases

## Conclusion

PQR System demonstrates that combining classic ML (scikit-learn), modern NLP (Transformers), and RAG with LLMs in a microservices architecture can solve real business problems. The system reduces classification time from minutes to milliseconds, and regulatory search from hours to seconds, all deployed on scalable cloud-native infrastructure.

---

*Built by [Roberto Lozada](https://github.com/gambl3r08) in Barranquilla, Colombia.*
