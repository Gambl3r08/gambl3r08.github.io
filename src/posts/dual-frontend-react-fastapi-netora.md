---
title: "Netora Frontend: Dual React + FastAPI Interface for an AI Network Agent"
description: "How I built two frontends (React 19 and FastAPI/Jinja2) to interact with a multi-agent network automation system"
date: "2025-01-15"
published: true
lang: en
tags:
  - react
  - fastapi
  - frontend
  - ai-agents
  - network-automation
---

# Netora Frontend: Dual React + FastAPI Interface for an AI Network Agent

A multi-agent network automation system needs an interface that allows engineers to interact naturally. I built two independent frontends: one in React 19 with persistent conversations, and another in FastAPI with Jinja2 as a lightweight alternative, both connected to the same agent backend.

## The Problem

The Netora agent could diagnose networks, configure devices, and learn from its mistakes, but it was only accessible via API. Network engineers needed a conversational interface where they could ask natural language questions, view interaction history, and visualize responses with technical formatting (tables, configurations, logs).

## The Solution

I implemented two frontends with different approaches: a React 19 SPA with full conversation management, and a server-rendered frontend with FastAPI + Jinja2 + HTMX for environments where simplicity is preferred. Both share the same backend API and offer a conversational experience with markdown rendering.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| React Frontend | React 19, Vite, Axios, React Markdown, Highlight.js |
| FastAPI Frontend | FastAPI, Jinja2, HTMX, Vanilla JS |
| Communication | REST API, Axios interceptors |
| UI/UX | Custom CSS, responsive design, dark theme |
| Build | Vite, npm, hot reload |

## Architecture

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

## Technical Challenges

### User-Friendly Error Handling

A key priority was translating technical API errors into comprehensible user messages. I implemented a centralized mapper that intercepts each error type:

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

### Chat Service with Persistent Conversations

The chat service handles full CRUD for conversations with a consistent `{success, data, error}` response pattern:

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

### Dual Frontend: Same API, Different Experience

The FastAPI/Jinja2 frontend provides a server-rendered alternative that requires no build tooling or Node.js, ideal for quick deployments or restricted environments. Both frontends consume exactly the same backend endpoints.

## Key Takeaways

1. **Two frontends, one contract**: Maintaining two independent frontends forces you to design a clean, well-documented API. If the API works for both, it works for any client.

2. **Centralized error mapping**: Translating HTTP errors to human messages in a single place avoids duplication and guarantees consistency across the entire application.

3. **React 19 with Vite is productive**: The combination of React 19, Vite, and hot reload allows fast UI iteration. The setup is minimal compared to Next.js for a pure SPA.

## Future Improvements

- [ ] Agent response streaming with Server-Sent Events
- [ ] Conversation export to PDF/Markdown
- [ ] Attachment support (network diagrams, configurations)
- [ ] Light/dark theme with persistence

## Conclusion

Netora Frontend demonstrates that a single AI agent backend can be served through completely different interfaces. The React frontend offers rich interactivity with persistent conversations, while the FastAPI/Jinja2 alternative offers deployment simplicity. Both enable network engineers to interact with AI naturally.

---

*Built by [Roberto Lozada](https://github.com/gambl3r08) in Barranquilla, Colombia.*
