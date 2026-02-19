---
title: "Netora Frontend: Interfaz Dual React + FastAPI para un Agente de Redes con IA"
description: "Cómo construí dos frontends (React 19 y FastAPI/Jinja2) para interactuar con un sistema multi-agente de automatización de redes"
date: "2025-01-15"
published: true
lang: es
tags:
  - react
  - fastapi
  - frontend
  - ai-agents
  - network-automation
---

# Netora Frontend: Interfaz Dual React + FastAPI para un Agente de Redes con IA

Un sistema multi-agente de automatización de redes necesita una interfaz que permita a los ingenieros interactuar de forma natural. Construí dos frontends independientes: uno en React 19 con conversaciones persistentes, y otro en FastAPI con Jinja2 como alternativa ligera, ambos conectados al mismo backend de agentes.

## El Problema

El agente Netora podía diagnosticar redes, configurar dispositivos y aprender de sus errores, pero solo era accesible vía API. Los ingenieros de redes necesitaban una interfaz conversacional donde pudieran hacer preguntas en lenguaje natural, ver el historial de interacciones, y visualizar respuestas con formato técnico (tablas, configuraciones, logs).

## La Solución

Implementé dos frontends con enfoques diferentes: un SPA en React 19 con gestión completa de conversaciones, y un frontend server-rendered con FastAPI + Jinja2 + HTMX para entornos donde se prefiere simplicidad. Ambos comparten la misma API del backend y ofrecen experiencia conversacional con markdown rendering.

## Stack Tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| Frontend React | React 19, Vite, Axios, React Markdown, Highlight.js |
| Frontend FastAPI | FastAPI, Jinja2, HTMX, Vanilla JS |
| Comunicación | REST API, Axios interceptors |
| UI/UX | CSS custom, responsive design, dark theme |
| Build | Vite, npm, hot reload |

## Arquitectura

```
[React 19 SPA]          [FastAPI + Jinja2]
  port 5173                 port 8001
       \                      /
        \                    /
     [Netora Agent Backend]
           port 8000
               ↓
     [OpenAI Agents SDK]
               ↓
     [Network Devices]
```

## Desafíos Técnicos

### Manejo de Errores User-Friendly

Una de las prioridades fue traducir errores técnicos de la API en mensajes comprensibles para el usuario. Implementé un mapper centralizado que intercepta cada tipo de error:

```javascript
const friendlyError = (error) => {
  const msg = error?.message || String(error);
  if (msg.includes('Network Error') || msg.includes('Failed to fetch'))
    return 'Unable to connect to server. Check your connection.';
  if (msg.includes('401') || msg.includes('Unauthorized'))
    return 'Session expired. Please log in again.';
  if (msg.includes('504') || msg.includes('timeout'))
    return 'Request timed out. The server is still processing — please wait.';
  if (msg.includes('500') || msg.includes('Internal Server'))
    return 'Server error. Please try again later.';
  return msg;
};
```

### Servicio de Chat con Conversaciones Persistentes

El servicio de chat maneja CRUD completo de conversaciones con un patrón consistente de respuesta `{success, data, error}`:

```javascript
const chatService = {
  getConversations: async () => {
    try {
      const response = await chatApi.get('/api/chat/conversations');
      return {
        success: true,
        data: response.data.conversations || []
      };
    } catch (error) {
      return {
        success: false,
        error: friendlyError(error),
        data: []
      };
    }
  },

  createConversation: async (title = 'New conversation') => {
    try {
      const formData = new URLSearchParams();
      formData.append('title', title);
      const response = await chatApi.post('/api/chat/conversations', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      return { success: true, data: response.data.conversation };
    } catch (error) {
      return { success: false, error: friendlyError(error), data: null };
    }
  },
};
```

### Dual Frontend: Misma API, Diferente Experiencia

El frontend en FastAPI/Jinja2 ofrece una alternativa server-rendered que no requiere build tooling ni Node.js, ideal para despliegues rápidos o entornos restringidos. Ambos frontends consumen exactamente los mismos endpoints del backend.

## Aprendizajes Clave

1. **Dos frontends, un contrato**: Mantener dos frontends independientes obliga a diseñar una API limpia y bien documentada. Si la API funciona para ambos, funciona para cualquier cliente.

2. **Error mapping centralizado**: Traducir errores HTTP a mensajes humanos en un solo lugar evita duplicación y garantiza consistencia en toda la aplicación.

3. **React 19 con Vite es productivo**: La combinación de React 19, Vite y hot reload permite iterar rápido sobre la UI. El setup es mínimo comparado con Next.js para una SPA pura.

## Mejoras Futuras

- [ ] Streaming de respuestas del agente con Server-Sent Events
- [ ] Exportación de conversaciones a PDF/Markdown
- [ ] Soporte para adjuntos (diagramas de red, configuraciones)
- [ ] Tema claro/oscuro con persistencia

## Conclusión

Netora Frontend demuestra que un mismo backend de agentes IA puede servirse a través de interfaces completamente diferentes. El frontend React ofrece interactividad rica con conversaciones persistentes, mientras que la alternativa FastAPI/Jinja2 ofrece simplicidad de despliegue. Ambos permiten a ingenieros de redes interactuar con IA de forma natural.

---

*Construido por [Roberto Lozada](https://github.com/gambl3r08) en Barranquilla, Colombia.*
