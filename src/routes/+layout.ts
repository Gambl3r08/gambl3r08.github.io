/**
 * Prerender every route.
 *
 * Without this only the pages that opted in individually (blog, projects) were
 * emitted as HTML; `/`, `/about`, `/skills` and `/contact` fell through to the
 * adapter's `404.html` SPA fallback. That still renders for visitors, but
 * GitHub Pages serves it with a 404 status and crawlers only ever saw an empty
 * shell — so none of the page titles, descriptions or structured data counted.
 */
export const prerender = true;
