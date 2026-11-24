export type Language = 'es' | 'en';

export interface ManatalLocation {
  country?: string | null;
  city?: string | null;
  state?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface ManatalTranslation {
  language_code: string;
  name: string;
  description: string;
}

interface ManatalJobListItem {
  id: string;
  status: string;
  visibility: string;
  is_pinned: boolean;
  is_hide_salary: boolean;
  payment_frequency: string | null;
  currency: string | null;
  minimum_salary: number | null;
  maximum_salary: number | null;
  location: ManatalLocation | null;
  translations?: ManatalTranslation[];
  translation?: ManatalTranslation | null;
  client?: unknown;
}

interface ManatalJobListResponse {
  items: ManatalJobListItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ManatalJobDetailResponse {
  id: string;
  status: string;
  visibility: string;
  work_type?: string | null;
  headcount?: number | null;
  contract_details?: string | null;
  minimum_salary: number | null;
  maximum_salary: number | null;
  currency: string | null;
  is_hide_salary: boolean;
  payment_frequency: string | null;
  is_pinned: boolean;
  header_key?: string | null;
  location: ManatalLocation | null;
  translation?: ManatalTranslation | null;
  translations?: ManatalTranslation[];
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface NormalizedJob {
  id: string;
  isPinned: boolean;
  workType: string | null;
  contractDetails: string | null;
  headcount: number | null;
  publishedAt: string | null;
  isHideSalary: boolean;
  minimumSalary: number | null;
  maximumSalary: number | null;
  currency: string | null;
  paymentFrequency: string | null;
  location: ManatalLocation;
  translations: ManatalTranslation[];
}

export const MANATAL_CLIENT_SLUG =
  import.meta.env.VITE_MANATAL_SLUG || 'apaztalentsearch';

export const MANATAL_CAREER_PAGE_URL = `https://${MANATAL_CLIENT_SLUG}.careers-page.com`;
const MANATAL_API_BASE = 'https://api.careers-page.com/open/v1';

const WORK_TYPE_LABELS: Record<string, Record<Language, string>> = {
  on_site: { es: 'Presencial', en: 'On-site' },
  onsite: { es: 'Presencial', en: 'On-site' },
  hybrid: { es: 'Híbrido', en: 'Hybrid' },
  remote: { es: 'Remoto', en: 'Remote' },
};

const CONTRACT_TYPE_LABELS: Record<string, Record<Language, string>> = {
  full_time: { es: 'Tiempo completo', en: 'Full-time' },
  part_time: { es: 'Medio tiempo', en: 'Part-time' },
  temporary: { es: 'Temporal', en: 'Temporary' },
  freelance: { es: 'Freelance', en: 'Freelance' },
  internship: { es: 'Prácticas', en: 'Internship' },
  apprenticeship: { es: 'Aprendizaje', en: 'Apprenticeship' },
  contractor: { es: 'Contratista', en: 'Contractor' },
  consultancy: { es: 'Consultoría', en: 'Consultancy' },
};

const PAYMENT_FREQUENCY_LABELS: Record<string, Record<Language, string>> = {
  hour: { es: 'hora', en: 'hour' },
  day: { es: 'día', en: 'day' },
  week: { es: 'semana', en: 'week' },
  month: { es: 'mes', en: 'month' },
  year: { es: 'año', en: 'year' },
};

function collectTranslations(
  item: Pick<ManatalJobListItem, 'translations' | 'translation'>
): ManatalTranslation[] {
  const list: ManatalTranslation[] = [];
  if (Array.isArray(item.translations)) {
    list.push(...item.translations);
  }
  if (item.translation) {
    const exists = list.some(
      (t) => t.language_code === item.translation?.language_code
    );
    if (!exists) {
      list.push(item.translation);
    }
  }
  return list;
}

function normalizeJob(
  base: ManatalJobListItem,
  detail?: ManatalJobDetailResponse | null
): NormalizedJob {
  const source = detail ?? base;
  const translations = [
    ...collectTranslations(detail ?? {}),
    ...collectTranslations(base),
  ].filter(
    (t, index, arr) =>
      arr.findIndex((other) => other.language_code === t.language_code) ===
      index
  );

  return {
    id: source.id,
    isPinned: Boolean(source.is_pinned),
    workType: detail?.work_type ?? null,
    contractDetails: detail?.contract_details ?? null,
    headcount: detail?.headcount ?? null,
    publishedAt: detail?.published_at ?? detail?.created_at ?? null,
    isHideSalary: Boolean(source.is_hide_salary),
    minimumSalary: source.minimum_salary ?? null,
    maximumSalary: source.maximum_salary ?? null,
    currency: source.currency ?? null,
    paymentFrequency: source.payment_frequency ?? null,
    location: {
      country: source.location?.country ?? null,
      city: source.location?.city ?? null,
      state: source.location?.state ?? null,
      latitude: source.location?.latitude ?? null,
      longitude: source.location?.longitude ?? null,
    },
    translations,
  };
}

export function getLocalizedJobContent(
  job: NormalizedJob,
  language: Language
): { title: string; descriptionHtml: string } {
  const exact = job.translations.find((t) =>
    t.language_code?.toLowerCase().startsWith(language)
  );
  const chosen = exact ?? job.translations[0];
  return {
    title: chosen?.name?.trim() || (language === 'es' ? 'Posición abierta' : 'Open Position'),
    descriptionHtml: chosen?.description || '',
  };
}

export function formatJobLocation(location: ManatalLocation): string {
  const parts: string[] = [];
  const pushUnique = (val?: string | null) => {
    const cleaned = val?.trim();
    if (!cleaned) return;
    const normalized = cleaned.toLowerCase();
    if (!parts.some((p) => p.toLowerCase() === normalized)) {
      parts.push(cleaned);
    }
  };

  pushUnique(location.city);
  pushUnique(location.state);
  pushUnique(location.country);
  return parts.join(', ');
}

export function getWorkTypeLabel(
  workType: string | null | undefined,
  language: Language
): string | null {
  if (!workType) return null;
  const entry = WORK_TYPE_LABELS[workType.toLowerCase()];
  if (entry) return entry[language];
  return workType.replace(/_/g, ' ');
}

export function getContractTypeLabel(
  contractDetails: string | null | undefined,
  language: Language
): string | null {
  if (!contractDetails) return null;
  const entry = CONTRACT_TYPE_LABELS[contractDetails.toLowerCase()];
  if (entry) return entry[language];
  return contractDetails.replace(/_/g, ' ');
}

export function formatSalaryRange(
  job: NormalizedJob,
  language: Language
): string | null {
  if (job.isHideSalary) return null;
  if (job.minimumSalary === null && job.maximumSalary === null) return null;

  const formatter = new Intl.NumberFormat(language === 'es' ? 'es-MX' : 'en-US', {
    maximumFractionDigits: 0,
  });
  const currency = job.currency ? `${job.currency} ` : '';
  const freqEntry = job.paymentFrequency
    ? PAYMENT_FREQUENCY_LABELS[job.paymentFrequency.toLowerCase()]
    : null;
  const freqSuffix = freqEntry
    ? ` / ${freqEntry[language]}`
    : job.paymentFrequency
      ? ` / ${job.paymentFrequency}`
      : '';

  if (job.minimumSalary !== null && job.maximumSalary !== null) {
    return `${currency}${formatter.format(job.minimumSalary)} – ${formatter.format(job.maximumSalary)}${freqSuffix}`;
  }
  const single = job.minimumSalary ?? job.maximumSalary;
  return single !== null
    ? `${currency}${formatter.format(single)}${freqSuffix}`
    : null;
}

export function formatPublishedDate(
  isoDate: string | null | undefined,
  language: Language
): string | null {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(language === 'es' ? 'es-MX' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function extractTextExcerpt(html: string, maxLength = 190): string {
  if (!html) return '';
  let text = '';
  if (typeof DOMParser !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    text = doc.body.textContent ?? '';
  } else {
    text = html.replace(/<[^>]+>/g, ' ');
  }
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trimEnd()}…`;
}

export function getJobApplyUrl(jobId: string): string {
  return `${MANATAL_CAREER_PAGE_URL}/jobs/${encodeURIComponent(jobId)}/apply`;
}

export function getJobReferUrl(jobId: string): string {
  return `${MANATAL_CAREER_PAGE_URL}/jobs/${encodeURIComponent(jobId)}/refer`;
}

export function getJobExternalUrl(jobId: string): string {
  return `${MANATAL_CAREER_PAGE_URL}/jobs/${encodeURIComponent(jobId)}`;
}

const UUID_REGEX =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function slugifyJobTitle(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

export function buildJobPath(jobId: string, title?: string): string {
  const cleanId = encodeURIComponent(jobId);
  if (!title) return `/jobs/${cleanId}`;
  const slug = slugifyJobTitle(title);
  return slug ? `/jobs/${slug}--${cleanId}` : `/jobs/${cleanId}`;
}

export function extractJobIdFromParam(rawParam: string): string {
  const decoded = decodeURIComponent(rawParam).trim();
  const sepIndex = decoded.lastIndexOf('--');
  if (sepIndex !== -1) {
    const candidate = decoded.slice(sepIndex + 2);
    if (candidate) return candidate;
  }
  const uuidMatch = decoded.match(UUID_REGEX);
  return uuidMatch ? uuidMatch[0] : decoded;
}

async function fetchJobDetailRaw(
  jobId: string,
  signal?: AbortSignal
): Promise<ManatalJobDetailResponse> {
  const response = await fetch(
    `${MANATAL_API_BASE}/job-posts/${encodeURIComponent(jobId)}`,
    {
      signal,
      headers: { Accept: 'application/json' },
    }
  );
  if (!response.ok) {
    throw new Error(`Manatal job detail request failed (${response.status})`);
  }
  return (await response.json()) as ManatalJobDetailResponse;
}

export async function fetchManatalJobById(
  jobId: string,
  signal?: AbortSignal
): Promise<NormalizedJob> {
  const detail = await fetchJobDetailRaw(jobId, signal);
  return normalizeJob(detail, detail);
}

async function fetchJobsPage(
  page: number,
  pageSize: number,
  signal?: AbortSignal
): Promise<ManatalJobListResponse> {
  const url = `${MANATAL_API_BASE}/career-pages/${encodeURIComponent(
    MANATAL_CLIENT_SLUG
  )}/job-posts?page=${page}&size=${pageSize}&page_size=${pageSize}`;
  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Manatal jobs request failed (${response.status})`);
  }
  return (await response.json()) as ManatalJobListResponse;
}

export async function fetchManatalJobs(options?: {
  pageSize?: number;
  signal?: AbortSignal;
}): Promise<{ jobs: NormalizedJob[]; total: number }> {
  const pageSize = options?.pageSize ?? 50;
  const signal = options?.signal;

  const firstPage = await fetchJobsPage(1, pageSize, signal);
  const allItems: ManatalJobListItem[] = [...(firstPage.items ?? [])];
  const totalPages = Math.min(firstPage.pages ?? 1, 10);

  if (totalPages > 1) {
    const remainingPages = Array.from(
      { length: totalPages - 1 },
      (_, idx) => idx + 2
    );
    const pageResponses = await Promise.allSettled(
      remainingPages.map((pageNum) => fetchJobsPage(pageNum, pageSize, signal))
    );
    for (const res of pageResponses) {
      if (res.status === 'fulfilled' && Array.isArray(res.value.items)) {
        allItems.push(...res.value.items);
      }
    }
  }

  // Deduplicate by ID and filter to public published jobs
  const seenIds = new Set<string>();
  const publishedItems = allItems.filter((item) => {
    if (item.status !== 'published' || item.visibility !== 'public') {
      return false;
    }
    if (seenIds.has(item.id)) return false;
    seenIds.add(item.id);
    return true;
  });

  // Enrich first 48 jobs in batches so catalog cards show modality/date quickly
  const enrichTargets = publishedItems.slice(0, 48);
  const detailMap = new Map<string, ManatalJobDetailResponse>();
  for (let i = 0; i < enrichTargets.length; i += 12) {
    const batch = enrichTargets.slice(i, i + 12);
    const results = await Promise.allSettled(
      batch.map((item) => fetchJobDetailRaw(item.id, signal))
    );
    results.forEach((result, idx) => {
      if (result.status === 'fulfilled') {
        detailMap.set(batch[idx].id, result.value);
      }
    });
  }

  const enriched = publishedItems.map((item) =>
    normalizeJob(item, detailMap.get(item.id) ?? null)
  );

  enriched.sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  return {
    jobs: enriched,
    total: firstPage.total ?? enriched.length,
  };
}
