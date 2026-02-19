---
title: "RAG Assistant: Asistente de Documentación con Retrieval-Augmented Generation"
description: "Cómo construí un sistema de QA sobre documentación técnica que redujo tiempos de respuesta de 72 a 10 segundos"
date: "2024-09-01"
published: true
lang: es
tags:
  - python
  - langchain
  - rag
  - ollama
  - fastapi
---

# RAG Assistant: Asistente de Documentación con Retrieval-Augmented Generation

Cuando tienes más de 100 archivos de documentación técnica sobre automatización de redes, encontrar la respuesta correcta puede tomar minutos de búsqueda manual. RAG Assistant es un sistema que combina búsqueda semántica con un LLM local para responder preguntas sobre tu documentación en segundos, sin enviar datos a la nube.

## El Problema

Los equipos de ingeniería de redes manejan documentación extensa sobre herramientas como Netmiko, NAPALM, Scrapli y workflows de automatización. Buscar información específica en más de 100 documentos de texto es tedioso, y las respuestas a menudo están distribuidas en múltiples archivos. Se necesitaba una forma de hacer preguntas en lenguaje natural y obtener respuestas contextualizadas.

## La Solución

Implementé un pipeline RAG completo que procesa documentos (PDF, TXT, MD), genera embeddings con Sentence Transformers, los almacena en ChromaDB, y usa Ollama con el modelo Phi-3 mini para generar respuestas. El sistema incluye un retriever adaptativo que clasifica la consulta y ajusta el número de documentos a recuperar.

## Stack Tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| Backend | Python 3.13, FastAPI, Uvicorn |
| RAG | LangChain, ChromaDB, Sentence Transformers (all-MiniLM-L6-v2) |
| LLM | Ollama (Phi-3 mini), inferencia local |
| API | REST endpoints, Pydantic validation |
| Deployment | Bash scripts, systemd, multi-plataforma |

## Arquitectura

```
Documentos (PDF/TXT/MD)
       ↓
DocumentProcessor (chunking, limpieza)
       ↓
Sentence Transformers (embeddings)
       ↓
ChromaDB (almacenamiento vectorial)
       ↓
IntelligentRetriever (clasificación de consulta)
       ↓
Ollama/Phi-3 (generación de respuesta)
       ↓
FastAPI (API HTTP)
```

## Desafíos Técnicos

### Optimización de Performance: De 72s a 10s

El primer prototipo tardaba 50-72 segundos por consulta. Implementé optimizaciones en dos etapas:

**Etapa 1 - Optimización Multi-Core del LLM:**
```python
class RAGConfig:
    EMBEDDING_MODEL = "all-MiniLM-L6-v2"
    LLM_MODEL = os.getenv("LLM_MODEL", "phi3:mini")
    OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://127.0.0.1:11434")
    LLM_CONTEXT_SIZE = int(os.getenv("LLM_CONTEXT", "4096"))
    LLM_MAX_TOKENS = int(os.getenv("LLM_MAX_TOKENS", "512"))
    LLM_TEMPERATURE = float(os.getenv("LLM_TEMPERATURE", "1"))
```

**Etapa 2 - Retrieval Adaptativo:** Un clasificador de consultas que ajusta K dinámicamente:

```python
class QueryType(Enum):
    SPECIFIC = "specific"          # K=2, consulta puntual
    COMPARATIVE = "comparative"    # K=4, comparar elementos
    COMPREHENSIVE = "comprehensive"  # K=3, explicación completa

class IntelligentRetriever:
    def classify_query(self, question: str) -> QueryType:
        question_lower = question.lower()
        for pattern in self.comparative_patterns:
            if re.search(pattern, question_lower):
                return QueryType.COMPARATIVE
        for pattern in self.comprehensive_patterns:
            if re.search(pattern, question_lower):
                return QueryType.COMPREHENSIVE
        return QueryType.SPECIFIC

    def get_optimal_k(self, question: str) -> int:
        query_type = self.classify_query(question)
        k_mapping = {
            QueryType.SPECIFIC: self.specific_k,
            QueryType.COMPARATIVE: self.comparative_k,
            QueryType.COMPREHENSIVE: self.comprehensive_k,
        }
        return k_mapping[query_type]
```

## Código Destacado

Los patrones de clasificación soportan consultas en español e inglés, usando regex para detectar la intención:

```python
self.comparative_patterns = [
    r"\b(compar[ae]?|diferenci[ae]?|versus|vs|entre)\b",
    r"\b(todos|all|cuál[es]?|which|list[ae]?)\b.*\b(servicios?|services?)\b",
    r"\b(opciones|options|alternativas|alternatives)\b",
]

self.comprehensive_patterns = [
    r"\b(completo|complete|detallado|detailed|explicar?|explain)\b",
    r"\b(cómo funciona|how.*work|proceso|process)\b",
    r"\b(guía|guide|tutorial|manual)\b",
    r"\b(configurar|configure|setup|install)\b",
]
```

## Aprendizajes Clave

1. **La inferencia local es viable**: Ollama con Phi-3 mini ofrece respuestas aceptables sin costos de API ni riesgos de privacidad. Ideal para documentación interna sensible.

2. **El K adaptativo mejora calidad y velocidad**: No todas las consultas necesitan el mismo número de documentos. Clasificar la consulta antes de recuperar es una optimización simple con gran impacto.

3. **El 75% de los cores es el sweet spot**: Después de probar múltiples configuraciones, usar el 75% de los cores disponibles del CPU para inferencia maximiza velocidad sin afectar la estabilidad del sistema.

## Mejoras Futuras

- [ ] Implementar re-ranking con cross-encoders para mejorar relevancia
- [ ] Agregar soporte para Markdown con tablas y código
- [ ] Cache de respuestas frecuentes con hash de la consulta
- [ ] Frontend web con historial de conversaciones

## Conclusión

RAG Assistant demuestra que puedes construir un asistente de documentación potente usando solo herramientas open source y hardware local. La combinación de retrieval adaptativo con optimización multi-core logró reducir tiempos de respuesta en un 85%, haciendo viable el uso en producción.

---

*Construido por [Roberto Lozada](https://github.com/gambl3r08) en Barranquilla, Colombia.*
