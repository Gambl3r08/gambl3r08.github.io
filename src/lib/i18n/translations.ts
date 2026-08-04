import { yearsOfExperience } from '$lib/data/site';

// Strings that quote the years of experience are template literals so the
// figure tracks the calendar year instead of going stale.
export const translations = {
  es: {
    // Navegación
    nav: {
      home: 'Inicio',
      about: 'Sobre Mí',
      projects: 'Proyectos',
      skills: 'Habilidades',
      blog: 'Blog',
      contact: 'Contacto'
    },
    // Home
    home: {
      greeting: 'Hola, mi nombre es',
      title: 'Desarrollador de Software',
      description:
        `Especializado en automatización de redes y sistemas inteligentes con IA. +${yearsOfExperience} años construyendo plataformas enterprise con Python, .NET y Rust: desde APIs con FastAPI y agentes de OpenAI hasta servicios de alto rendimiento y arquitecturas cloud-native.`,
      viewProjects: 'Ver Proyectos',
      contactMe: 'Contactar',
      downloadCV: 'Descargar CV',
      role: 'Software Engineer',
      techStrip: 'Tecnologías que uso',
      featuredProjects: 'Proyectos destacados',
      featuredProjectsDesc: 'Una muestra de lo que he estado construyendo últimamente.',
      latestPosts: 'Últimas publicaciones',
      latestPostsDesc: 'Notas sobre backend, IA y automatización de redes.',
      seeAllProjects: 'Ver todos los proyectos',
      seeAllPosts: 'Ver todo el blog'
    },
    // About
    about: {
      title: 'Sobre Mí',
      description:
        `Soy desarrollador de software con más de ${yearsOfExperience} años de experiencia, especializado en el diseño y desarrollo de plataformas de automatización de redes y sistemas inteligentes basados en inteligencia artificial. Trabajo de forma habitual con Python, .NET y Rust: aplicaciones empresariales en C#/.NET, servicios y herramientas de sistemas en Rust cuando el rendimiento y la seguridad de memoria son críticos, y backends de alto rendimiento con FastAPI y PostgreSQL. He construido soluciones enterprise completas que integran agentes de IA multimodales con infraestructura de red, desde interfaces conversacionales con React hasta arquitecturas de microservicios orquestadas con Docker y Kubernetes en Google Cloud Platform. Mi experiencia abarca el ciclo completo de desarrollo: arquitecturas hexagonales y microservicios, pipelines de RAG con LangChain y ChromaDB, sistemas multi-agente con OpenAI Agents SDK, e integración de herramientas como Netmiko, NAPALM y Ansible para gestión de dispositivos de red multi-vendor. Me apasiona resolver problemas complejos donde la IA y la ingeniería de software convergen, siempre con enfoque en Clean Architecture, seguridad robusta y despliegues containerizados listos para producción.`,
      experience: 'Experiencia',
      yearsExperience: 'Años de experiencia',
      projectsCompleted: 'Proyectos completados',
      technologiesMastered: 'Tecnologías dominadas',
      location: 'Ubicación',
      locationValue: 'Barranquilla, Colombia',
      focus: 'Enfoque',
      focusValue: 'Agentes de IA, backend escalable y automatización',
      techStack: 'Tech Stack Principal',
      techStackItems: ['Python', 'FastAPI', '.NET', 'Rust', 'OpenAI Agents', 'Docker', 'Kubernetes', 'GCP'],
      downloadCV: 'Descargar CV'
    },
    // Projects
    projects: {
      title: 'Proyectos',
      description:
        'Estos son algunos de mis proyectos más recientes en GitHub. Cada uno representa un desafío único y una oportunidad de aprendizaje.',
      noRepos: 'No se pudieron cargar los repositorios.',
      viewOnGitHub: 'Ver en GitHub',
      viewAllRepos: 'Ver todos los repositorios',
      noDescription: 'Sin descripción',
      emptyState: 'No hay repositorios disponibles',
      emptyDescription: 'Los proyectos no pudieron cargarse en este momento. Visita mi perfil de GitHub directamente.',
      visitGithub: 'Visitar GitHub',
      lastUpdated: 'Actualizado el',
      liveDemo: 'Ver demo',
      noReadme: 'Este repositorio todavía no tiene README.',
      repoListHeading: 'Repositorios'
    },
    // Skills
    skills: {
      title: 'Habilidades',
      specializations: 'Tecnologías y herramientas que domino, organizadas por área de especialización.',
      allTech: 'Todas las Tecnologías',
      backend: {
        title: 'AI & Multi-Agent Systems',
        description:
          'Sistemas multi-agente, pipelines RAG y orquestación de LLMs.'
      },
      cloud: {
        title: 'Cloud & DevOps',
        description:
          'Arquitecturas cloud-native, containers y CI/CD.'
      },
      databases: {
        title: 'Network Automation',
        description:
          'Automatización multi-vendor y protocolos de red.'
      },
      frameworks: {
        title: 'Backend & Microservicios',
        description:
          'APIs de alto rendimiento y arquitecturas event-driven.'
      },
      languages: {
        title: 'Lenguajes de Programación',
        description:
          'Lenguajes que manejo en proyectos reales.'
      }
    },
    // Blog
    blog: {
      title: 'Blog',
      description:
        'Artículos sobre desarrollo backend, buenas prácticas, tecnologías cloud y más.',
      noPosts: 'Aún no hay artículos publicados. ¡Vuelve pronto!',
      backToBlog: '← Volver al blog',
      minRead: 'min de lectura',
      searchPlaceholder: 'Buscar artículos...',
      allTags: 'Todos',
      noResults: 'No se encontraron artículos con esos filtros.',
      comments: 'Comentarios'
    },
    // Contact
    contact: {
      title: 'Contacto',
      description:
        '¿Tienes un proyecto en mente o quieres colaborar? No dudes en contactarme. Estaré encantado de escucharte.',
      email: 'Email',
      location: 'Ubicación',
      followMe: 'Sígueme en redes',
      name: 'Nombre',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado correctamente!',
      errorSend: 'Error al enviar. Intenta de nuevo.',
      notConfigured: 'El formulario de contacto no está configurado aún. Envíame un email directamente.'
    },
    // Footer
    footer: {
      rights: 'Todos los derechos reservados.',
      builtWith: 'Hecho con SvelteKit & Tailwind CSS'
    },
    // Error
    error: {
      notFound: 'Página no encontrada',
      backHome: 'Volver al inicio',
      title: '404',
      subtitle: 'Oops! Esta página se perdió en el void',
      description: 'Parece que la página que buscas no existe o fue movida.',
      goProjects: 'Ver Proyectos',
      goBlog: 'Leer Blog'
    }
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      blog: 'Blog',
      contact: 'Contact'
    },
    // Home
    home: {
      // The name lives in the home page <h1>; repeating it here duplicated it.
      greeting: 'Hi! my name is',
      title: 'Software Engineer',
      description:
        `Specialized in network automation and AI-powered intelligent systems. ${yearsOfExperience}+ years building enterprise platforms with Python, .NET and Rust — from FastAPI APIs and OpenAI agents to high-performance services and cloud-native architectures.`,
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      downloadCV: 'Download CV',
      role: 'Software Engineer',
      techStrip: 'Technologies I work with',
      featuredProjects: 'Featured projects',
      featuredProjectsDesc: 'A sample of what I have been building lately.',
      latestPosts: 'Latest posts',
      latestPostsDesc: 'Notes on backend, AI and network automation.',
      seeAllProjects: 'See all projects',
      seeAllPosts: 'Read the blog'
    },
    // About
    about: {
      title: 'About Me',
      description:
        `I'm a software engineer with ${yearsOfExperience}+ years of experience, specialized in designing and building network automation platforms and AI-powered intelligent systems. I work day to day across Python, .NET and Rust: enterprise applications in C#/.NET, services and systems tooling in Rust where performance and memory safety matter, and high-performance backends with FastAPI and PostgreSQL. I've built end-to-end enterprise solutions that integrate multi-agent AI architectures with network infrastructure, from conversational interfaces with React to microservices architectures orchestrated with Docker and Kubernetes on Google Cloud Platform. My experience covers the full development lifecycle: hexagonal and microservices architectures, RAG pipelines with LangChain and ChromaDB, multi-agent systems using OpenAI Agents SDK, and integration of tools like Netmiko, NAPALM, and Ansible for multi-vendor network device management. I'm passionate about solving complex problems at the intersection of AI and software engineering, always focusing on Clean Architecture, robust security, and production-ready containerized deployments.`,
      experience: 'Experience',
      yearsExperience: 'Years of experience',
      projectsCompleted: 'Projects completed',
      technologiesMastered: 'Technologies mastered',
      location: 'Location',
      locationValue: 'Barranquilla, Colombia',
      focus: 'Focus',
      focusValue: 'AI agents, scalable backends and automation',
      techStack: 'Main Tech Stack',
      techStackItems: ['Python', 'FastAPI', '.NET', 'Rust', 'OpenAI Agents', 'Docker', 'Kubernetes', 'GCP'],
      downloadCV: 'Download CV'
    },
    // Projects
    projects: {
      title: 'Projects',
      description:
        'These are some of my most recent projects on GitHub. Each one represents a unique challenge and a learning opportunity.',
      noRepos: 'Could not load repositories.',
      viewOnGitHub: 'View on GitHub',
      viewAllRepos: 'View all repositories',
      noDescription: 'No description',
      emptyState: 'No repositories available',
      emptyDescription: 'Projects could not be loaded at this time. Visit my GitHub profile directly.',
      visitGithub: 'Visit GitHub',
      lastUpdated: 'Updated on',
      liveDemo: 'Live demo',
      noReadme: 'This repository does not have a README yet.',
      repoListHeading: 'Repositories'
    },
    // Skills
    skills: {
      title: 'Skills',
      specializations: 'Technologies and tools I master, organized by area of specialization.',
      allTech: 'All Technologies',
      backend: {
        title: 'AI & Multi-Agent Systems',
        description:
          'Multi-agent systems, RAG pipelines and LLM orchestration.'
      },
      cloud: {
        title: 'Cloud & DevOps',
        description:
          'Cloud-native architectures, containers and CI/CD.'
      },
      databases: {
        title: 'Network Automation',
        description:
          'Multi-vendor automation and network protocols.'
      },
      frameworks: {
        title: 'Backend & Microservices',
        description:
          'High-performance APIs and event-driven architectures.'
      },
      languages: {
        title: 'Programming Languages',
        description:
          'Languages I use in real-world projects.'
      }
    },
    // Blog
    blog: {
      title: 'Blog',
      description:
        'Articles about backend development, best practices, cloud technologies and more.',
      noPosts: 'No articles published yet. Come back soon!',
      backToBlog: '← Back to blog',
      minRead: 'min read',
      searchPlaceholder: 'Search articles...',
      allTags: 'All',
      noResults: 'No articles found matching those filters.',
      comments: 'Comments'
    },
    // Contact
    contact: {
      title: 'Contact',
      description:
        "Have a project in mind or want to collaborate? Don't hesitate to contact me. I'd be happy to hear from you.",
      email: 'Email',
      location: 'Location',
      followMe: 'Follow me on social media',
      name: 'Name',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      errorSend: 'Error sending. Please try again.',
      notConfigured: 'Contact form is not configured yet. Send me an email directly.'
    },
    // Footer
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Built with SvelteKit & Tailwind CSS'
    },
    // Error
    error: {
      notFound: 'Page not found',
      backHome: 'Back to home',
      title: '404',
      subtitle: "Oops! This page got lost in the void",
      description: "The page you're looking for doesn't exist or has been moved.",
      goProjects: 'View Projects',
      goBlog: 'Read Blog'
    }
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.es;
