import { ArrowRight, ArrowUpRight, Briefcase, MapPin, RefreshCw } from 'lucide-react';
import {
  Language,
  MANATAL_CAREER_PAGE_URL,
  NormalizedJob,
  extractTextExcerpt,
  formatJobLocation,
  getContractTypeLabel,
  getLocalizedJobContent,
  getWorkTypeLabel,
} from '../lib/manatal';

interface FeaturedJobsSectionProps {
  language: Language;
  jobs: NormalizedJob[];
  total: number;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onNavigateJobs: (jobId?: string) => void;
  onNavigateContact: () => void;
}

const copy = {
  es: {
    tag: 'OPORTUNIDADES ACTIVAS',
    title: 'Oportunidades Laborales',
    subtitle:
      'Cada posición refleja un análisis exhaustivo del rol, gestionada bajo nuestra metodología de Candidate Centricity en México y LATAM.',
    viewAll: 'VER TODAS LAS VACANTES',
    viewRole: 'VER POSICIÓN',
    openCount: (n: number) =>
      n === 1 ? '1 POSICIÓN ABIERTA' : `${n} POSICIONES ABIERTAS`,
    loading: 'SINCRONIZANDO POSICIONES...',
    errorTitle: 'No pudimos cargar las vacantes en este momento',
    errorDesc:
      'Puedes reintentar o consultar directamente nuestro portal oficial de oportunidades.',
    retry: 'REINTENTAR',
    externalPortal: 'IR AL PORTAL OFICIAL',
    emptyTitle: 'Sin posiciones públicas en este momento',
    emptyDesc:
      'Nuestras búsquedas confidenciales continúan activas. Comparte tu perfil con nuestro equipo de consultores.',
    emptyCta: 'CONECTAR CON UN CONSULTOR',
  },
  en: {
    tag: 'ACTIVE OPPORTUNITIES',
    title: 'Career Opportunities',
    subtitle:
      'Every position reflects an exhaustive analysis of the role, led under our Candidate Centricity methodology across Mexico and LATAM.',
    viewAll: 'VIEW ALL OPEN ROLES',
    viewRole: 'VIEW ROLE',
    openCount: (n: number) => (n === 1 ? '1 OPEN ROLE' : `${n} OPEN ROLES`),
    loading: 'SYNCHRONIZING ROLES...',
    errorTitle: 'Unable to load open positions right now',
    errorDesc:
      'Please try again or visit our official career portal directly.',
    retry: 'RETRY',
    externalPortal: 'OPEN CAREER PORTAL',
    emptyTitle: 'No public openings at this moment',
    emptyDesc:
      'Our confidential executive searches remain active. Share your profile with our advisory team.',
    emptyCta: 'CONNECT WITH A CONSULTANT',
  },
} as const;

export function FeaturedJobsSection({
  language,
  jobs,
  total,
  loading,
  error,
  onRetry,
  onNavigateJobs,
  onNavigateContact,
}: FeaturedJobsSectionProps) {
  const t = copy[language];
  const featured = jobs.slice(0, 4);

  return (
    <section
      id="vacantes"
      className="py-24 md:py-32 border-b-2 border-brand-black bg-brand-white"
    >
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 block border-l-4 border-brand-gold pl-4">
              {t.tag}
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter">
              {t.title}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:text-right">
            <div className="max-w-sm">
              <p className="text-xs font-medium uppercase tracking-wider opacity-60 leading-relaxed mb-3">
                {t.subtitle}
              </p>
              {!loading && !error && total > 0 && (
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-brand-gold">
                  {t.openCount(total)}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigateJobs()}
              className="inline-flex items-center justify-center gap-4 bg-brand-black text-white px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-black transition-all duration-300 shrink-0 cursor-pointer"
            >
              {t.viewAll}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div
            aria-label={t.loading}
            className="border-2 border-brand-black divide-y-2 divide-brand-black"
          >
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-pulse"
              >
                <div className="space-y-3 flex-1">
                  <div className="h-3 w-32 bg-brand-black/10" />
                  <div className="h-7 w-72 max-w-full bg-brand-black/15" />
                  <div className="h-3 w-56 bg-brand-black/10" />
                </div>
                <div className="h-10 w-36 bg-brand-black/10" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="border-2 border-brand-black bg-brand-gray p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                {t.errorTitle}
              </h3>
              <p className="text-xs font-medium uppercase tracking-wider opacity-60 leading-relaxed">
                {t.errorDesc}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-3 border-2 border-brand-black px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-black hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="size-3.5" />
                {t.retry}
              </button>
              <a
                href={MANATAL_CAREER_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-brand-black text-white px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-black transition-colors"
              >
                {t.externalPortal}
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        ) : featured.length === 0 ? (
          <div className="border-2 border-brand-black bg-brand-gray p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                {t.emptyTitle}
              </h3>
              <p className="text-xs font-medium uppercase tracking-wider opacity-60 leading-relaxed">
                {t.emptyDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateContact}
              className="inline-flex items-center gap-3 bg-brand-black text-white px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-black transition-colors shrink-0 cursor-pointer"
            >
              {t.emptyCta}
              <ArrowRight className="size-4" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-brand-black divide-y-2 divide-brand-black">
            {featured.map((job, idx) => {
              const { title, descriptionHtml } = getLocalizedJobContent(
                job,
                language
              );
              const location = formatJobLocation(job.location);
              const workType = getWorkTypeLabel(job.workType, language);
              const contractType = getContractTypeLabel(
                job.contractDetails,
                language
              );
              const excerpt = extractTextExcerpt(descriptionHtml, 145);

              return (
                <button
                  key={job.id}
                  type="button"
                  onClick={() => onNavigateJobs(job.id)}
                  className="w-full text-left p-8 md:p-10 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-brand-white hover:bg-brand-black hover:text-white transition-colors duration-300 group cursor-pointer"
                >
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]">
                      <span className="text-brand-gold">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {location && (
                        <span className="inline-flex items-center gap-1.5 opacity-60 group-hover:opacity-80">
                          <MapPin className="size-3" />
                          {location}
                        </span>
                      )}
                      {workType && (
                        <span className="border border-current/25 px-2.5 py-0.5 opacity-80">
                          {workType}
                        </span>
                      )}
                      {contractType && (
                        <span className="inline-flex items-center gap-1.5 opacity-55">
                          <Briefcase className="size-3" />
                          {contractType}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
                      {title}
                    </h3>

                    {excerpt && (
                      <p className="text-xs leading-relaxed opacity-60 group-hover:opacity-75 max-w-3xl line-clamp-2">
                        {excerpt}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 shrink-0 pt-2 lg:pt-0">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] border-b-2 border-brand-black group-hover:border-brand-gold pb-1 transition-colors">
                      {t.viewRole}
                    </span>
                    <ArrowUpRight className="size-5 text-brand-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
