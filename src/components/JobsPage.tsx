import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Check,
  Copy,
  MapPin,
  RefreshCw,
  Search,
  Share2,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  Language,
  MANATAL_CAREER_PAGE_URL,
  NormalizedJob,
  extractTextExcerpt,
  fetchManatalJobById,
  formatJobLocation,
  formatPublishedDate,
  formatSalaryRange,
  getContractTypeLabel,
  getJobApplyUrl,
  getJobReferUrl,
  getLocalizedJobContent,
  getWorkTypeLabel,
} from '../lib/manatal';
import { sanitizeJobHtml } from '../lib/sanitizeHtml';

interface JobsPageProps {
  language: Language;
  jobs: NormalizedJob[];
  loading: boolean;
  error: string | null;
  selectedJobId: string | null;
  onSelectJob: (jobId: string | null) => void;
  onRetry: () => void;
  onBackHome: () => void;
  onNavigateContact: () => void;
}

const copy = {
  es: {
    backHome: 'VOLVER AL INICIO',
    backList: 'VOLVER A VACANTES',
    portalTag: 'APAZ TALENT SEARCH · PORTAL DE POSICIONES',
    headingMain: 'Oportunidades',
    headingAccent: 'laborales.',
    intro:
      'Cada posición refleja un análisis exhaustivo del rol con acompañamiento cercano, transparente y centrado en la persona.',
    kpiLabel: 'POSICIONES ACTIVAS',
    kpiRegion: 'MÉXICO · COLOMBIA · LATAM',
    searchPlaceholder: 'BUSCAR POR ROL, HABILIDAD O CIUDAD...',
    allCountries: 'Todos los países',
    allModalities: 'Todas las modalidades',
    clearFilters: 'LIMPIAR FILTROS',
    showingCount: (visible: number, total: number) =>
      `Mostrando ${visible} de ${total} posiciones`,
    applyNow: 'POSTULARME AHORA',
    referCandidate: 'REFERIR TALENTO',
    copyLink: 'COPIAR ENLACE',
    copied: 'ENLACE COPIADO',
    published: 'PUBLICADA',
    salaryLabel: 'COMPENSACIÓN',
    featuredBadge: 'DESTACADA',
    noSelection: 'Selecciona una posición para ver el perfil completo.',
    noFilterResultsTitle: 'No encontramos posiciones con esos filtros',
    noFilterResultsDesc:
      'Prueba limpiando los criterios de búsqueda para explorar todas las vacantes abiertas.',
    emptyTitle: 'No hay vacantes públicas activas en este momento',
    emptyDesc:
      'Si deseas integrarte a nuestra red de talento ejecutivo, déjanos tus datos en la sección de contacto.',
    contactCta: 'IR A CONTACTO',
    errorTitle: 'Error al sincronizar con el portal de vacantes',
    errorDesc:
      'Puedes reintentar la carga o abrir directamente nuestra página de vacantes en Manatal.',
    retry: 'REINTENTAR',
    openManatal: 'ABRIR PORTAL EN MANATAL',
    commitmentNote:
      'Al hacer clic en “Postularme ahora” o “Referir talento” completarás tu envío de forma segura en la plataforma oficial de APAZ Talent Search en Manatal.',
  },
  en: {
    backHome: 'BACK TO HOME',
    backList: 'BACK TO ROLES',
    portalTag: 'APAZ TALENT SEARCH · CAREER PORTAL',
    headingMain: 'Career',
    headingAccent: 'opportunities.',
    intro:
      'Every position reflects an exhaustive analysis of the role with close, transparent, candidate-centric guidance.',
    kpiLabel: 'ACTIVE POSITIONS',
    kpiRegion: 'MEXICO · COLOMBIA · LATAM',
    searchPlaceholder: 'SEARCH BY ROLE, SKILL OR CITY...',
    allCountries: 'All countries',
    allModalities: 'All modalities',
    clearFilters: 'CLEAR FILTERS',
    showingCount: (visible: number, total: number) =>
      `Showing ${visible} of ${total} positions`,
    applyNow: 'APPLY NOW',
    referCandidate: 'REFER TALENT',
    copyLink: 'COPY LINK',
    copied: 'LINK COPIED',
    published: 'PUBLISHED',
    salaryLabel: 'COMPENSATION',
    featuredBadge: 'FEATURED',
    noSelection: 'Select a role to view the complete executive brief.',
    noFilterResultsTitle: 'No positions match these filters',
    noFilterResultsDesc:
      'Reset your search criteria to explore all currently open roles.',
    emptyTitle: 'No public openings at this time',
    emptyDesc:
      'To join our executive talent network, share your profile through our contact section.',
    contactCta: 'GO TO CONTACT',
    errorTitle: 'Unable to synchronize with the career portal',
    errorDesc:
      'You can retry loading or visit our official Manatal career page directly.',
    retry: 'RETRY',
    openManatal: 'OPEN MANATAL PORTAL',
    commitmentNote:
      'Clicking “Apply now” or “Refer talent” will take you directly to our secure official application form hosted on Manatal.',
  },
} as const;

export function JobsPage({
  language,
  jobs,
  loading,
  error,
  selectedJobId,
  onSelectJob,
  onRetry,
  onBackHome,
  onNavigateContact,
}: JobsPageProps) {
  const t = copy[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [modalityFilter, setModalityFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [directJob, setDirectJob] = useState<NormalizedJob | null>(null);
  const [directJobLoading, setDirectJobLoading] = useState(false);

  // Unique country options derived from live jobs
  const countryOptions = useMemo(() => {
    const set = new Set<string>();
    for (const job of jobs) {
      const country = job.location.country?.trim();
      if (country) set.add(country);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  const modalityOptions = useMemo(() => {
    const set = new Set<string>();
    for (const job of jobs) {
      if (job.workType) set.add(job.workType.toLowerCase());
    }
    return Array.from(set);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return jobs.filter((job) => {
      if (
        countryFilter !== 'all' &&
        (job.location.country?.trim() || '').toLowerCase() !==
          countryFilter.toLowerCase()
      ) {
        return false;
      }

      if (
        modalityFilter !== 'all' &&
        (job.workType || '').toLowerCase() !== modalityFilter.toLowerCase()
      ) {
        return false;
      }

      if (!query) return true;

      const { title, descriptionHtml } = getLocalizedJobContent(job, language);
      const location = formatJobLocation(job.location);
      const haystack = `${title} ${location} ${extractTextExcerpt(
        descriptionHtml,
        800
      )}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [jobs, searchTerm, countryFilter, modalityFilter, language]);

  // Resolve active job: explicit selection -> direct deep-link fetch -> first filtered item on desktop
  const activeJobFromList = useMemo(() => {
    if (selectedJobId) {
      return jobs.find((j) => j.id === selectedJobId) ?? null;
    }
    return filteredJobs[0] ?? null;
  }, [jobs, filteredJobs, selectedJobId]);

  useEffect(() => {
    if (!selectedJobId || activeJobFromList || loading) {
      setDirectJob(null);
      return;
    }

    const controller = new AbortController();
    setDirectJobLoading(true);
    fetchManatalJobById(selectedJobId, controller.signal)
      .then((job) => {
        setDirectJob(job);
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') {
          setDirectJob(null);
        }
      })
      .finally(() => {
        setDirectJobLoading(false);
      });

    return () => controller.abort();
  }, [selectedJobId, activeJobFromList, loading]);

  const activeJob = activeJobFromList ?? directJob;
  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    countryFilter !== 'all' ||
    modalityFilter !== 'all';

  const resetFilters = () => {
    setSearchTerm('');
    setCountryFilter('all');
    setModalityFilter('all');
  };

  const handleCopyLink = async (jobId: string) => {
    const shareUrl = `${window.location.origin}/jobs/${jobId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(jobId);
      setTimeout(() => setCopiedId((prev) => (prev === jobId ? null : prev)), 2500);
    } catch {
      window.prompt('URL:', shareUrl);
    }
  };

  const renderJobDetail = (job: NormalizedJob) => {
    const { title, descriptionHtml } = getLocalizedJobContent(job, language);
    const cleanHtml = sanitizeJobHtml(descriptionHtml);
    const location = formatJobLocation(job.location);
    const workType = getWorkTypeLabel(job.workType, language);
    const contractType = getContractTypeLabel(job.contractDetails, language);
    const salary = formatSalaryRange(job, language);
    const published = formatPublishedDate(job.publishedAt, language);
    const applyUrl = getJobApplyUrl(job.id);
    const referUrl = getJobReferUrl(job.id);

    return (
      <article className="bg-brand-white">
        <div className="p-8 md:p-12 border-b-2 border-brand-black">
          <div className="flex flex-wrap items-center gap-3 mb-6 text-[10px] font-black uppercase tracking-[0.2em]">
            {job.isPinned && (
              <span className="bg-brand-gold text-brand-black px-3 py-1">
                {t.featuredBadge}
              </span>
            )}
            {workType && (
              <span className="bg-brand-black text-white px-3 py-1">
                {workType}
              </span>
            )}
            {contractType && (
              <span className="border border-brand-black/30 px-3 py-1">
                {contractType}
              </span>
            )}
            {published && (
              <span className="inline-flex items-center gap-1.5 opacity-55 ml-auto">
                <Calendar className="size-3.5" />
                {t.published}: {published}
              </span>
            )}
          </div>

          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
            {title}
          </h2>

          <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-wider opacity-75 mb-8">
            {location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-brand-gold" />
                {location}
              </span>
            )}
            {contractType && (
              <span className="inline-flex items-center gap-2">
                <Briefcase className="size-4 text-brand-gold" />
                {contractType}
              </span>
            )}
            {salary && (
              <span className="inline-flex items-center gap-2 text-brand-black">
                <span className="text-brand-gold">{t.salaryLabel}:</span>
                {salary}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-brand-black text-white px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
            >
              {t.applyNow}
              <ArrowUpRight className="size-4" />
            </a>

            <a
              href={referUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border-2 border-brand-black px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-black hover:text-white transition-all duration-300"
            >
              <Share2 className="size-3.5" />
              {t.referCandidate}
            </a>

            <button
              type="button"
              onClick={() => handleCopyLink(job.id)}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] opacity-60 hover:opacity-100 hover:text-brand-gold transition-all cursor-pointer"
            >
              {copiedId === job.id ? (
                <>
                  <Check className="size-3.5 text-brand-gold" />
                  {t.copied}
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  {t.copyLink}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div
            className="job-prose"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />

          <div className="mt-14 pt-10 border-t-2 border-brand-black bg-brand-gray p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-xs leading-relaxed opacity-70 max-w-md">
              {t.commitmentNote}
            </p>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-brand-black text-white px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-black transition-colors"
              >
                {t.applyNow}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <main className="bg-brand-white min-h-screen">
      {/* Executive Header */}
      <section className="bg-brand-black text-white border-b-2 border-brand-black">
        <div className="max-w-[1600px] mx-auto px-6 py-16 md:py-24">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-white/60 hover:text-brand-gold transition-colors mb-10 cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            {t.backHome}
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold block mb-6 border-l-4 border-brand-gold pl-4">
                {t.portalTag}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.88] tracking-tighter mb-6">
                {t.headingMain}{' '}
                <span className="text-brand-gold italic font-light lowercase tracking-normal">
                  {t.headingAccent}
                </span>
              </h1>
              <p className="text-xs md:text-sm uppercase tracking-wider text-white/65 max-w-xl leading-relaxed">
                {t.intro}
              </p>
            </div>

            <div className="border-2 border-white/20 p-6 md:p-8 min-w-[240px]">
              <div className="text-4xl md:text-5xl font-black text-brand-gold leading-none mb-2">
                {loading ? '—' : String(jobs.length).padStart(2, '0')}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/90">
                {t.kpiLabel}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 mt-3 pt-3 border-t border-white/10">
                {t.kpiRegion}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="border-b-2 border-brand-black bg-brand-gray">
        <div className="max-w-[1600px] mx-auto px-6 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-brand-white border-2 border-brand-black pl-11 pr-10 py-3.5 text-xs font-bold uppercase tracking-wider focus:bg-brand-black focus:text-white transition-colors outline-none placeholder:opacity-40"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 opacity-50 hover:opacity-100 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {countryOptions.length > 1 && (
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                aria-label={t.allCountries}
                className="bg-brand-white border-2 border-brand-black px-4 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] outline-none cursor-pointer"
              >
                <option value="all">{t.allCountries}</option>
                {countryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            )}

            {modalityOptions.length > 1 && (
              <select
                value={modalityFilter}
                onChange={(e) => setModalityFilter(e.target.value)}
                aria-label={t.allModalities}
                className="bg-brand-white border-2 border-brand-black px-4 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] outline-none cursor-pointer"
              >
                <option value="all">{t.allModalities}</option>
                {modalityOptions.map((m) => (
                  <option key={m} value={m}>
                    {getWorkTypeLabel(m, language)}
                  </option>
                ))}
              </select>
            )}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-brand-black bg-brand-gold text-brand-black hover:bg-brand-black hover:text-white transition-colors cursor-pointer"
              >
                {t.clearFilters}
              </button>
            )}

            {!loading && !error && (
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 lg:ml-2">
                {t.showingCount(filteredJobs.length, jobs.length)}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1600px] mx-auto px-6 py-12 md:py-16">
        {loading && !directJob ? (
          <div className="grid lg:grid-cols-12 border-2 border-brand-black">
            <div className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-brand-black divide-y-2 divide-brand-black">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="p-8 space-y-3 animate-pulse">
                  <div className="h-3 w-28 bg-brand-black/10" />
                  <div className="h-6 w-3/4 bg-brand-black/15" />
                  <div className="h-3 w-1/2 bg-brand-black/10" />
                </div>
              ))}
            </div>
            <div className="lg:col-span-7 p-10 space-y-6 animate-pulse">
              <div className="h-4 w-40 bg-brand-black/10" />
              <div className="h-10 w-2/3 bg-brand-black/15" />
              <div className="h-32 w-full bg-brand-black/5" />
            </div>
          </div>
        ) : error && !directJob ? (
          <div className="border-2 border-brand-black bg-brand-gray p-12 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                {t.errorTitle}
              </h2>
              <p className="text-xs font-medium uppercase tracking-wider opacity-65 leading-relaxed">
                {t.errorDesc}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-3 border-2 border-brand-black px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-black hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="size-4" />
                {t.retry}
              </button>
              <a
                href={MANATAL_CAREER_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-brand-black text-white px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-black transition-colors"
              >
                {t.openManatal}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        ) : jobs.length === 0 && !directJob ? (
          <div className="border-2 border-brand-black bg-brand-gray p-12 md:p-20 text-center space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight">
              {t.emptyTitle}
            </h2>
            <p className="text-xs uppercase tracking-wider opacity-60 max-w-lg mx-auto leading-relaxed">
              {t.emptyDesc}
            </p>
            <button
              type="button"
              onClick={onNavigateContact}
              className="inline-flex items-center gap-3 bg-brand-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-black transition-colors cursor-pointer"
            >
              {t.contactCta}
            </button>
          </div>
        ) : filteredJobs.length === 0 && !directJob ? (
          <div className="border-2 border-brand-black bg-brand-gray p-12 md:p-16 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              {t.noFilterResultsTitle}
            </h2>
            <p className="text-xs uppercase tracking-wider opacity-60 max-w-md mx-auto leading-relaxed">
              {t.noFilterResultsDesc}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-3 bg-brand-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-black transition-colors cursor-pointer"
            >
              {t.clearFilters}
            </button>
          </div>
        ) : (
          <div className="border-2 border-brand-black grid lg:grid-cols-12 items-start">
            {/* Left Master List: hidden on mobile when a specific jobId is open */}
            <div
              className={`lg:col-span-5 divide-y-2 divide-brand-black border-b-2 lg:border-b-0 lg:border-r-2 border-brand-black ${
                selectedJobId ? 'hidden lg:block' : 'block'
              }`}
            >
              {filteredJobs.map((job, idx) => {
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
                const isSelected = activeJob?.id === job.id;

                return (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => onSelectJob(job.id)}
                    className={`w-full text-left p-7 md:p-8 transition-colors duration-200 cursor-pointer block ${
                      isSelected
                        ? 'bg-brand-black text-white'
                        : 'bg-brand-white hover:bg-brand-gray'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-3 text-[10px] font-black uppercase tracking-[0.2em]">
                      <span className="text-brand-gold">
                        {String(idx + 1).padStart(2, '0')}
                        {job.isPinned ? ` · ${t.featuredBadge}` : ''}
                      </span>
                      {workType && (
                        <span
                          className={`px-2.5 py-0.5 border ${
                            isSelected
                              ? 'border-brand-gold text-brand-gold'
                              : 'border-brand-black/20 opacity-75'
                          }`}
                        >
                          {workType}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-snug mb-3">
                      {title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-65 mb-3">
                      {location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-3" />
                          {location}
                        </span>
                      )}
                      {contractType && <span>· {contractType}</span>}
                    </div>

                    <p className="text-xs opacity-60 line-clamp-2 leading-relaxed">
                      {extractTextExcerpt(descriptionHtml, 120)}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Detail View */}
            <div
              className={`lg:col-span-7 ${
                selectedJobId ? 'block' : 'hidden lg:block'
              }`}
            >
              {selectedJobId && (
                <div className="lg:hidden border-b-2 border-brand-black p-4 bg-brand-gray">
                  <button
                    type="button"
                    onClick={() => onSelectJob(null)}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer"
                  >
                    <ArrowLeft className="size-3.5" />
                    {t.backList}
                  </button>
                </div>
              )}

              {directJobLoading ? (
                <div className="p-12 space-y-6 animate-pulse">
                  <div className="h-4 w-36 bg-brand-black/10" />
                  <div className="h-10 w-3/4 bg-brand-black/15" />
                  <div className="h-48 w-full bg-brand-black/5" />
                </div>
              ) : activeJob ? (
                renderJobDetail(activeJob)
              ) : (
                <div className="p-12 text-xs uppercase tracking-widest opacity-50">
                  {t.noSelection}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
