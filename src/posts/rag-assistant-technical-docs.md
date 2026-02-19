---
title: "RAG Assistant: Technical Documentation with Retrieval-Augmented Generation"
description: "How I built a documentation QA system that reduced response times from 72 to 10 seconds using local LLM inference"
date: "2024-09-01"
published: true
lang: en
tags:
  - python
  - langchain
  - rag
  - ollama
  - fastapi
---

# RAG Assistant: Technical Documentation with Retrieval-Augmented Generation

When you have over 100 technical documentation files about network automation, finding the right answer can take minutes of manual searching. RAG Assistant is a system that combines semantic search with a local LLM to answer questions about your documentation in seconds, without sending data to the cloud.

## The Problem

Network engineering teams manage extensive documentation about tools like Netmiko, NAPALM, Scrapli, and automation workflows. Searching for specific information across 100+ text documents is tedious, and answers are often spread across multiple files. We needed a way to ask natural language questions and get contextualized answers.

## The Solution

I implemented a complete RAG pipeline that processes documents (PDF, TXT, MD), generates embeddings with Sentence Transformers, stores them in ChromaDB, and uses Ollama with the Phi-3 mini model to generate answers. The system includes an adaptive retriever that classifies the query and adjusts the number of documents to retrieve.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Backend | Python 3.13, FastAPI, Uvicorn |
| RAG | LangChain, ChromaDB, Sentence Transformers (all-MiniLM-L6-v2) |
| LLM | Ollama (Phi-3 mini), local inference |
| API | REST endpoints, Pydantic validation |
| Deployment | Bash scripts, systemd, cross-platform |

## Architecture

```
Documents (PDF/TXT/MD)
       ↓
DocumentProcessor (chunking, cleaning)
       ↓
Sentence Transformers (embeddings)
       ↓
ChromaDB (vector storage)
       ↓
IntelligentRetriever (query classification)
       ↓
Ollama/Phi-3 (answer generation)
       ↓
FastAPI (HTTP API)
```

## Technical Challenges

### Performance Optimization: From 72s to 10s

The first prototype took 50-72 seconds per query. I implemented optimizations in two stages:

**Stage 1 - Multi-Core LLM Optimization:**
```python
class RAGConfig:
    EMBEDDING_MODEL = "all-MiniLM-L6-v2"
    LLM_MODEL = os.getenv("LLM_MODEL", "phi3:mini")
    OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://127.0.0.1:11434")
    LLM_CONTEXT_SIZE = int(os.getenv("LLM_CONTEXT", "4096"))
    LLM_MAX_TOKENS = int(os.getenv("LLM_MAX_TOKENS", "512"))
    LLM_TEMPERATURE = float(os.getenv("LLM_TEMPERATURE", "1"))
```

**Stage 2 - Adaptive Retrieval:** A query classifier that adjusts K dynamically:

```python
class QueryType(Enum):
    SPECIFIC = "specific"          # K=2, pinpoint query
    COMPARATIVE = "comparative"    # K=4, compare elements
    COMPREHENSIVE = "comprehensive"  # K=3, full explanation

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

## Notable Code

The classification patterns support queries in both Spanish and English, using regex to detect intent:

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

## Key Takeaways

1. **Local inference is viable**: Ollama with Phi-3 mini provides acceptable answers without API costs or privacy risks. Ideal for sensitive internal documentation.

2. **Adaptive K improves quality and speed**: Not all queries need the same number of documents. Classifying the query before retrieval is a simple optimization with significant impact.

3. **75% of cores is the sweet spot**: After testing multiple configurations, using 75% of available CPU cores for inference maximizes speed without affecting system stability.

## Future Improvements

- [ ] Implement re-ranking with cross-encoders for better relevance
- [ ] Add support for Markdown with tables and code blocks
- [ ] Response caching for frequent queries using query hashing
- [ ] Web frontend with conversation history

## Conclusion

RAG Assistant demonstrates that you can build a powerful documentation assistant using only open-source tools and local hardware. The combination of adaptive retrieval with multi-core optimization achieved an 85% reduction in response times, making it viable for production use.

---

*Built by [Roberto Lozada](https://github.com/gambl3r08) in Barranquilla, Colombia.*
