const CRAWLER_UA =
  /whatsapp|linkedinbot|facebookexternalhit|facebot|twitterbot|slackbot|telegrambot|discordbot|pinterest|skypeuripreview/i;

const UUID_REGEX =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function extractJobId(pathname) {
  const cleaned = pathname.replace(/\/+$/, '');
  const parts = cleaned.split('/');
  const raw = decodeURIComponent(parts[parts.length - 1] || '');
  if (!raw || raw === 'jobs' || raw === 'vacantes') return null;

  const sep = raw.lastIndexOf('--');
  if (sep !== -1) {
    return raw.slice(sep + 2);
  }
  const match = raw.match(UUID_REGEX);
  return match ? match[0] : raw;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripTags(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default async function handler(request, context) {
  const ua = request.headers.get('user-agent') || '';
  if (!CRAWLER_UA.test(ua)) {
    return context.next();
  }

  const url = new URL(request.url);
  const jobId = extractJobId(url.pathname);
  if (!jobId) {
    return context.next();
  }

  try {
    const apiRes = await fetch(
      `https://api.careers-page.com/open/v1/job-posts/${encodeURIComponent(jobId)}`,
      { headers: { Accept: 'application/json' } }
    );
    if (!apiRes.ok) {
      return context.next();
    }
    const job = await apiRes.json();
    const title = job?.translation?.name || 'Oportunidad Laboral';
    const locParts = [job?.location?.city, job?.location?.country].filter(Boolean);
    const locationText = locParts.join(', ');
    const fullTitle = locationText
      ? `${title} — ${locationText} | APAZ Talent Search`
      : `${title} | APAZ Talent Search`;

    const rawDesc = stripTags(job?.translation?.description || '');
    const description =
      rawDesc.length > 180
        ? `${rawDesc.slice(0, 177).trimEnd()}...`
        : rawDesc || 'Postula a esta oportunidad en APAZ Talent Search.';

    const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="APAZ Talent Search" />
    <meta property="og:title" content="${escapeHtml(fullTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(url.toString())}" />
    <meta property="og:image" content="${escapeHtml(`${url.origin}/imagen-portada.png`)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(fullTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
  </head>
  <body>
    <h1>${escapeHtml(fullTitle)}</h1>
    <p>${escapeHtml(description)}</p>
  </body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=300',
      },
    });
  } catch {
    return context.next();
  }
}
