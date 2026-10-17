import { buildHeadTags, type PageHead } from './head';

/** Marks every tag this module manages so the client can swap them on navigation. */
export const SEO_ATTR = 'data-seo';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Server-side: the <title> plus every managed head tag, as an HTML string. */
export function renderHeadTags(head: PageHead): string {
  const out = [`<title>${escapeHtml(head.title)}</title>`];
  for (const { tag, attrs, text } of buildHeadTags(head)) {
    const attrString = Object.entries({ ...attrs, [SEO_ATTR]: '1' })
      .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
      .join(' ');
    out.push(
      tag === 'script'
        ? `<script ${attrString}>${text ?? ''}</script>`
        : `<${tag} ${attrString}>`,
    );
  }
  return out.join('\n    ');
}
