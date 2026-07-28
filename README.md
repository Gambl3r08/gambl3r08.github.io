# Portfolio & Blog - Roberto Lozada

Portfolio personal y blog construido con SvelteKit, Tailwind CSS y mdsvex.

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Blog**: [mdsvex](https://mdsvex.pngwn.io/) (Markdown + Svelte)
- **Deploy**: GitHub Pages con GitHub Actions

## Desarrollo Local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar servidor de desarrollo

```bash
npm run dev
```

Abre http://localhost:5173 en tu navegador. Los cambios se actualizan automáticamente.

### 3. Build y Preview de producción

```bash
# Generar build de producción
npm run build

# Ver el build localmente
npm run preview
```

Abre http://localhost:4173 para ver el sitio como se verá en producción.

## Estructura del Proyecto

```
src/
├── lib/
│   ├── components/     # Componentes reutilizables (Navbar, Footer, etc.)
│   ├── data/           # Datos del sitio (personalizar aquí)
│   │   └── site.ts     # Nombre, skills, contacto
│   ├── types/          # Interfaces TypeScript
│   └── utils/          # Utilidades
│       ├── github.ts   # Fetch de repositorios GitHub
│       └── posts.ts    # Carga de posts del blog
├── posts/              # Artículos del blog en Markdown
│   ├── mi-post.md
│   └── otro-post.md
├── routes/             # Páginas del sitio
│   ├── +page.svelte    # Home (/)
│   ├── about/          # /about
│   ├── blog/           # /blog y /blog/[slug]
│   ├── contact/        # /contact
│   ├── projects/       # /projects (repos de GitHub)
│   └── skills/         # /skills
├── app.css             # Estilos globales + Tailwind
└── app.html            # Template HTML base
```

## Personalización

### Datos Personales

Edita `src/lib/data/site.ts` para cambiar:

```typescript
export const siteData = {
  name: 'Tu Nombre',
  title: 'Tu Título',
  description: 'Tu descripción',
  skills: ['Skill1', 'Skill2', ...],
  contact: {
    email: 'tu-email@dominio.com',
    phone: '+123456789',
    address: 'Tu ciudad',
    github: 'tu-usuario',
    linkedin: 'tu-linkedin'
  }
};
```

## Blog: Crear Entradas

### Ubicación de los posts

Los artículos del blog se guardan en: `src/posts/`

### Estructura de un post

Cada archivo `.md` debe tener un **frontmatter** al inicio con metadatos:

```markdown
---
title: "Título del Post"
description: "Descripción breve que aparece en el listado"
date: "2024-01-15"
published: true
tags:
  - python
  - backend
  - tutorial
---

# Contenido del post

Aquí va el contenido en Markdown...

## Subtítulos

Texto normal, **negrita**, *cursiva*, [enlaces](https://ejemplo.com).

### Bloques de código

```python
def hello():
    print("Hola mundo")
```

### Listas

- Item 1
- Item 2
- Item 3

### Imágenes

![Alt text](/images/mi-imagen.jpg)
```

### Campos del frontmatter

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `title` | string | Sí | Título del post |
| `description` | string | Sí | Descripción corta para el listado |
| `date` | string | Sí | Fecha en formato YYYY-MM-DD |
| `published` | boolean | Sí | `true` para publicar, `false` para ocultar |
| `tags` | array | No | Lista de etiquetas |
| `image` | string | No | Imagen de portada (opcional) |

### Ejemplo completo

Archivo: `src/posts/mi-primer-api-con-fastapi.md`

```markdown
---
title: "Creando mi primera API con FastAPI"
description: "Tutorial paso a paso para crear una API REST con FastAPI y Python"
date: "2024-02-15"
published: true
tags:
  - python
  - fastapi
  - api
  - tutorial
---

# Creando mi primera API con FastAPI

FastAPI es un framework moderno y rápido para construir APIs con Python.

## Instalación

```bash
pip install fastapi uvicorn
```

## Código básico

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hola mundo"}
```

## Ejecutar

```bash
uvicorn main:app --reload
```

¡Listo! Tu API estará en http://localhost:8000
```

## Deploy en GitHub Pages

### Paso 1: Commit y Push

```bash
git add .
git commit -m "Mi cambio"
git push origin main
```

### Paso 2: Configurar GitHub Pages (solo la primera vez)

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Pages**
3. En **Build and deployment > Source**: selecciona **GitHub Actions**

### Paso 3: Verificar

1. Ve a la pestaña **Actions** en tu repositorio
2. Espera a que el workflow termine (check verde)
3. Tu sitio estará en: **https://gambl3r08.github.io**

### Deploy automático

Cada push a `main` despliega automáticamente el sitio en ~1 minuto. Además hay
un rebuild semanal programado (lunes 06:00 UTC) para refrescar los datos que se
leen de la API de GitHub en tiempo de build.

## Curar qué proyectos aparecen

La página de Proyectos se construye desde la API de GitHub. Por defecto muestra
tus repos propios ordenados por fecha de push, lo que incluye repos de práctica.

Para elegir qué se publica, **añade el topic `portfolio`** a los repos que
quieras destacar:

> Repositorio → pestaña **About** (arriba a la derecha) → ⚙ → campo **Topics** →
> escribe `portfolio` → **Save changes**

En cuanto un repo tenga el topic, la web pasa a mostrar **solo** los que lo
lleven. Mientras ninguno lo tenga, se muestran todos y el build deja un aviso.

Se excluyen siempre: forks, repos archivados, `gambl3r08.github.io` y el repo de
perfil `Gambl3r08`.

Cada proyecto genera además una ficha en `/projects/<nombre>` con su README
renderizado por GitHub. Un repo sin README muestra igualmente su ficha con los
metadatos.

## Comentarios en el blog (giscus)

Los comentarios usan **GitHub Discussions**. No se renderizan hasta que las
cuatro variables estén configuradas, así que el blog funciona sin ellas.

Alta, una sola vez:

1. **Settings → General → Features** → marca **Discussions**.
2. Instala la app: <https://github.com/apps/giscus> (dale acceso a este repo).
3. Ve a <https://giscus.app>, introduce `Gambl3r08/gambl3r08.github.io` y elige
   el mapeo **pathname**. La página te devuelve `data-repo-id` y
   `data-category-id`.
4. En **Settings → Secrets and variables → Actions → Variables**, crea:

   | Variable | Valor |
   |---|---|
   | `PUBLIC_GISCUS_REPO` | `Gambl3r08/gambl3r08.github.io` |
   | `PUBLIC_GISCUS_REPO_ID` | el `data-repo-id` de giscus.app |
   | `PUBLIC_GISCUS_CATEGORY` | p. ej. `Announcements` |
   | `PUBLIC_GISCUS_CATEGORY_ID` | el `data-category-id` de giscus.app |

   Son identificadores públicos, no secretos: por eso van en *Variables* y no en
   *Secrets*.

Para probarlo en local, copia esos valores a tu `.env`.

## Chequeos de calidad

`.github/workflows/quality.yml` corre en cada push y PR: type-check, build,
accesibilidad (pa11y con axe + HTML_CodeSniffer), Lighthouse y detección de
enlaces rotos en los posts.

Es **independiente del deploy**: si un chequeo falla, el sitio se publica igual.
Para que bloquee, activa protección de rama en `main` exigiendo el workflow
`Quality`.

## Licencia

MIT
