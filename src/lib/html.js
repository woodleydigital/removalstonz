/** Small HTML helpers. Templates are plain template literals so that the
 *  rendered DOM is exactly what we author — no framework, no hydration. */

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape text destined for element content or an attribute value. */
export const esc = (value) =>
  String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ENTITIES[c]);

/** Join an array of strings, dropping null/undefined/false entries. */
export const join = (parts, sep = '\n') => parts.filter(Boolean).join(sep);

/** Render `fn(item)` for each item, or '' for an empty list. */
export const map = (items, fn, sep = '\n') => (items || []).map(fn).join(sep);

/** Slug used for heading ids and anchors. */
export const slugify = (text) =>
  String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * A very small Markdown-ish inline renderer for body copy held in data files.
 * Deliberately limited: links, bold, code and non-breaking hyphens only. Block
 * structure is expressed in the page data as explicit blocks, not parsed.
 */
export const inline = (text) =>
  esc(text)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

/** Format an ISO date as a readable date in the page's own locale. */
export const fmtDate = (iso, locale = 'en-GB') =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });

/** Ensure every internal path is absolute, lowercase and trailing-slashed. */
export const normalisePath = (path) => {
  if (!path.startsWith('/')) path = '/' + path;
  if (!path.endsWith('/') && !path.includes('.')) path += '/';
  return path.toLowerCase();
};
