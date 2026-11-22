const BLOCKED_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'IFRAME',
  'OBJECT',
  'EMBED',
  'FORM',
  'INPUT',
  'BUTTON',
  'TEXTAREA',
  'SELECT',
  'META',
  'LINK',
  'BASE',
  'SVG',
]);

const ALLOWED_TAGS = new Set([
  'P',
  'BR',
  'STRONG',
  'B',
  'EM',
  'I',
  'U',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'UL',
  'OL',
  'LI',
  'A',
  'BLOCKQUOTE',
  'HR',
  'SPAN',
  'DIV',
]);

function isSafeHref(href: string): boolean {
  const trimmed = href.trim().toLowerCase();
  return (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:')
  );
}

function isEmptySpacer(el: Element): boolean {
  if (el.tagName !== 'P' && el.tagName !== 'DIV') return false;
  const text = (el.textContent ?? '').replace(/\u00a0/g, '').trim();
  if (text.length > 0) return false;
  return el.querySelectorAll('img, a, li').length === 0;
}

export function sanitizeJobHtml(rawHtml: string): string {
  if (!rawHtml) return '';
  if (typeof DOMParser === 'undefined') return '';

  const doc = new DOMParser().parseFromString(rawHtml, 'text/html');

  const sanitizeNode = (node: Node) => {
    const children = Array.from(node.childNodes);
    for (const child of children) {
      if (child.nodeType !== Node.ELEMENT_NODE) continue;
      const el = child as Element;

      if (BLOCKED_TAGS.has(el.tagName)) {
        el.remove();
        continue;
      }

      if (!ALLOWED_TAGS.has(el.tagName)) {
        // Unwrap unknown tags while keeping sanitized children
        sanitizeNode(el);
        const fragment = doc.createDocumentFragment();
        while (el.firstChild) {
          fragment.appendChild(el.firstChild);
        }
        el.replaceWith(fragment);
        continue;
      }

      for (const attr of Array.from(el.attributes)) {
        const name = attr.name.toLowerCase();
        if (el.tagName === 'A' && name === 'href' && isSafeHref(attr.value)) {
          continue;
        }
        el.removeAttribute(attr.name);
      }

      if (el.tagName === 'A') {
        if (el.hasAttribute('href')) {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
      }

      sanitizeNode(el);

      if (isEmptySpacer(el)) {
        el.remove();
      }
    }
  };

  sanitizeNode(doc.body);
  return doc.body.innerHTML;
}
