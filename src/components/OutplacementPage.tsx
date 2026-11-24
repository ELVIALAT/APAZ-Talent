import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Gift,
  HeartHandshake,
  Layers,
  Network,
  Sparkles,
  Users,
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Language } from '../lib/manatal';
import { supabase } from '../lib/supabase';
import { OutplacementVideoPlayer } from './OutplacementVideoPlayer';

interface OutplacementPageProps {
  language: Language;
  onBackHome: () => void;
}

const copy = {
  es: {
    backHome: 'VOLVER AL INICIO',
    eyebrow: 'SOLUCIONES CORPORATIVAS · OUTPLACEMENT AUTOGESTIONADO',
    poweredBy: 'POWERED BY',
    heroTitleMain: 'Cuidar la salida',
    heroTitleAccent: 'protege tu marca.',
    heroDesc:
      'Transformamos las desvinculaciones empresariales en experiencias dignas, humanas y estructuradas. Combinamos la consultoría estratégica de APAZ Talent Search con la plataforma de transición de carrera autogestionada ELVIA.',
    ctaVideo: 'VER VIDEO EJECUTIVO',
    ctaDemo: 'SOLICITAR DEMO EMPRESARIAL',
    videoEyebrow: 'PLATAFORMA & PROPÓSITO',
    videoTitle: 'Por qué las empresas líderes eligen ELVIA',
    videoBullets: [
      {
        label: 'ACTIVACIÓN EN 48 HORAS',
        text: 'Implementación ágil desde 1 colaborador hasta reestructuras completas sin fricción operativa.',
      },
      {
        label: 'AUTOGESTIÓN CON IA + CRITERIO HUMANO',
        text: 'Herramientas de clase mundial disponibles 24/7 con opción de mentoría ejecutiva por consultores APAZ.',
      },
      {
        label: 'IMPACTO MEDIBLE EN REPUTACIÓN',
        text: 'Resguarda la confianza del talento que permanece en tu empresa y tu imagen en el mercado.',
      },
    ],
    pillarsEyebrow: 'BENEFICIOS PARA TU ORGANIZACIÓN',
    pillarsTitle: 'Tres razones estratégicas para acompañar la transición',
    pillars: [
      {
        num: '01',
        title: 'Marca Empleadora',
        headline:
          'La forma en que alguien sale define cómo hablan de ti quienes se quedan y el mercado.',
        desc: 'Protege tu reputación en LinkedIn, Glassdoor y redes ejecutivas al cerrar ciclos laborales con respeto, estructura y acompañamiento tangible.',
        icon: 'award',
      },
      {
        num: '02',
        title: 'Un Regalo de Salida Digno',
        headline:
          'Más allá del finiquito legal: entrega herramientas concretas para su siguiente paso.',
        desc: 'Cada colaborador recibe acceso inmediato a ELVIA para redescubrir su oferta de valor, fortalecer su marca personal y activar oportunidades reales.',
        icon: 'gift',
      },
      {
        num: '03',
        title: 'Responsabilidad Social',
        headline:
          'Compromiso medible con las personas, sus familias y la empleabilidad en LATAM.',
        desc: 'Convierte una decisión organizacional difícil en una acción visible de sostenibilidad humana (ESG / RSE) con impacto positivo en tu comunidad.',
        icon: 'heart',
      },
    ],
    platformEyebrow: 'ECOSISTEMA DE 12+ HERRAMIENTAS CONECTADAS',
    platformTitle: '¿Qué recibe tu equipo dentro de ELVIA?',
    platformQuote:
      'LA TRANSICIÓN DE CARRERA DEJA DE SER UN LABERINTO: SE VUELVE UN PROYECTO QUE TÚ GERENCIAS',
    platformLink: 'EXPLORAR ELVIA.LAT',
    modules: [
      {
        num: '01',
        title: 'Autoconocimiento (PMI + IKIGAI)',
        desc: 'Primero acompañamos el duelo laboral con Bienestar (check-in diario y respiración); luego 6 pilares PMI/IKIGAI para definir perfil, competencias 6+6 y oferta de valor.',
      },
      {
        num: '02',
        title: 'CV Harvard ATS & LinkedIn® Pro',
        desc: 'Genera un CV ejecutivo en formato Harvard ATS-friendly, sintoniza su perfil de LinkedIn® (hasta 3× más contactos) y mide el % match CV vs. Vacante.',
      },
      {
        num: '03',
        title: 'Buscador, Pipeline Kanban & Simulador',
        desc: 'Buscador conectado con 5 empresas objetivo y Google Jobs, tablero Kanban con métricas en tiempo real y simulador de entrevistas (HR, Hiring Manager, Headhunter).',
      },
      {
        num: '04',
        title: 'Mentora 24×7 + Mentor Experto 1:1',
        desc: 'Asistencia constante 24×7 dentro de la plataforma, Biblioteca de recursos y opción de sesiones 1:1 de 50 min con mentores expertos en transición.',
      },
    ],
    compareEyebrow: 'MODELO ESCALABLE',
    compareTitle: 'Outplacement Tradicional vs. APAZ TS powered by ELVIA',
    compareRows: [
      {
        axis: 'Cobertura en la empresa',
        traditional: 'Limitado a alta dirección por su alto costo por persona',
        elvia: 'Escalable a todos los niveles: desde 1 persona hasta 500+',
      },
      {
        axis: 'Tiempo de arranque',
        traditional: 'Semanas de coordinación y agendas presenciales',
        elvia: 'Activación inmediata en 48 h desde el día de la transición',
      },
      {
        axis: 'Disponibilidad',
        traditional: 'Sesiones puntuales sujetas a horarios de consultor',
        elvia: 'Plataforma autogestionada 24/7 + mentoría opcional APAZ',
      },
      {
        axis: 'Impacto en Marca Empleadora',
        traditional: 'Percepción reservada solo para la cúpula ejecutiva',
        elvia: 'Cuidado consistente y humano para toda tu organización',
      },
    ],
    formEyebrow: 'SOLICITAR DEMO CORPORATIVA',
    formTitle: 'Diseñemos una transición digna para tu empresa',
    formDesc:
      'Cuéntanos el tamaño o perfil de tu equipo y preparamos una demo personalizada de APAZ TS powered by ELVIA en menos de 24 horas.',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'TU NOMBRE',
    companyLabel: 'Empresa / Organización',
    companyPlaceholder: 'NOMBRE DE TU EMPRESA',
    emailLabel: 'Correo corporativo',
    emailPlaceholder: 'NOMBRE@EMPRESA.COM',
    teamSizeLabel: 'Alcance estimado',
    teamSizes: [
      '1 – 5 personas (Individual / Ejecutivo)',
      '6 – 25 personas (Equipo)',
      '26 – 100 personas (Reestructura)',
      '100+ personas (Corporativo)',
    ],
    messageLabel: 'Contexto o necesidades',
    messagePlaceholder: 'CUÉNTANOS SOBRE TU PROYECTO DE TRANSICIÓN',
    submit: 'SOLICITAR DEMO',
    submitting: 'ENVIANDO...',
    successTitle: '¡SOLICITUD RECIBIDA!',
    successDesc:
      'Nuestro equipo revisará tu solicitud de demo corporativa de APAZ TS powered by ELVIA y te contactará a la brevedad.',
    whatsappBtn: 'HABLAR POR WHATSAPP AHORA',
    resetBtn: 'ENVIAR OTRA CONSULTA',
  },
  en: {
    backHome: 'BACK TO HOME',
    eyebrow: 'CORPORATE SOLUTIONS · SELF-MANAGED OUTPLACEMENT',
    poweredBy: 'POWERED BY',
    heroTitleMain: 'Caring for exits',
    heroTitleAccent: 'protects your brand.',
    heroDesc:
      'We turn organizational offboarding into dignified, human, structured transitions. Combining APAZ Talent Search strategic advisory with ELVIA’s self-managed career transition platform.',
    ctaVideo: 'WATCH EXECUTIVE BRIEF',
    ctaDemo: 'REQUEST CORPORATE DEMO',
    videoEyebrow: 'PLATFORM & PURPOSE',
    videoTitle: 'Why leading companies choose ELVIA',
    videoBullets: [
      {
        label: '48-HOUR ACTIVATION',
        text: 'Agile rollout from a single executive to full organizational restructurings with zero friction.',
      },
      {
        label: 'AI SELF-MANAGEMENT + HUMAN TOUCH',
        text: 'World-class tools available 24/7 with optional executive coaching by APAZ consultants.',
      },
      {
        label: 'MEASURABLE REPUTATION IMPACT',
        text: 'Safeguards trust among remaining employees and strengthens external market perception.',
      },
    ],
    pillarsEyebrow: 'BENEFITS FOR YOUR ORGANIZATION',
    pillarsTitle: 'Three strategic reasons to support every transition',
    pillars: [
      {
        num: '01',
        title: 'Employer Brand',
        headline:
          'The way someone leaves shapes how both the market and your remaining team speak about you.',
        desc: 'Protect your reputation on LinkedIn, Glassdoor, and executive circles by closing chapters with respect, structure, and real support.',
        icon: 'award',
      },
      {
        num: '02',
        title: 'A Meaningful Parting Gift',
        headline:
          'Beyond statutory severance: give departing talent tangible tools for their next chapter.',
        desc: 'Every team member gets immediate access to ELVIA to redefine their value offer, elevate their personal brand, and unlock real opportunities.',
        icon: 'gift',
      },
      {
        num: '03',
        title: 'Social Responsibility',
        headline:
          'Measurable commitment to people, families, and sustainable employability across LATAM.',
        desc: 'Turn a tough business decision into visible human sustainability (ESG / CSR) with lasting community impact.',
        icon: 'heart',
      },
    ],
    platformEyebrow: 'ECOSYSTEM OF 12+ CONNECTED TOOLS',
    platformTitle: 'What does your team receive inside ELVIA?',
    platformQuote:
      'CAREER TRANSITION STOPS BEING A MAZE: IT BECOMES A PROJECT YOU LEAD',
    platformLink: 'EXPLORE ELVIA.LAT',
    modules: [
      {
        num: '01',
        title: 'Self-Discovery (PMI + IKIGAI)',
        desc: 'We first support emotional transition via Well-being (daily check-in & breathing), followed by 6 PMI/IKIGAI pillars covering 6+6 skills and unique value offer.',
      },
      {
        num: '02',
        title: 'Harvard ATS CV & LinkedIn® Pro',
        desc: 'Builds an executive Harvard ATS-friendly resume, optimizes LinkedIn® profiles (up to 3× more recruiter reach), and scores CV-to-Job compatibility.',
      },
      {
        num: '03',
        title: 'Job Radar, Kanban Pipeline & Simulator',
        desc: 'Target-company job search (Google Jobs), Kanban board with live funnel metrics, and AI interview simulator (HR, Hiring Manager, Headhunter modes).',
      },
      {
        num: '04',
        title: '24/7 AI Guide + Optional 1:1 Mentor',
        desc: 'Always-on 24/7 chat mentorship, curated Library & My Documents hub, plus optional 50-minute 1:1 sessions with senior career transition mentors.',
      },
    ],
    compareEyebrow: 'SCALABLE MODEL',
    compareTitle: 'Traditional Outplacement vs. APAZ TS powered by ELVIA',
    compareRows: [
      {
        axis: 'Organizational reach',
        traditional: 'Restricted to C-Level due to high per-person fees',
        elvia: 'Scalable across all levels: from 1 individual to 500+',
      },
      {
        axis: 'Time to launch',
        traditional: 'Weeks of scheduling and manual onboarding',
        elvia: 'Immediate 48-hour activation from transition day',
      },
      {
        axis: 'Availability',
        traditional: 'Limited sessions bound to consultant calendars',
        elvia: '24/7 self-managed platform + optional APAZ coaching',
      },
      {
        axis: 'Employer Brand impact',
        traditional: 'Perceived as a perk reserved only for top executives',
        elvia: 'Consistent, human care across your entire workforce',
      },
    ],
    formEyebrow: 'REQUEST CORPORATE DEMO',
    formTitle: 'Let’s design a dignified transition for your company',
    formDesc:
      'Share your team size and context, and we will prepare a tailored APAZ TS powered by ELVIA walkthrough within 24 hours.',
    nameLabel: 'Full name',
    namePlaceholder: 'YOUR NAME',
    companyLabel: 'Company / Organization',
    companyPlaceholder: 'YOUR COMPANY NAME',
    emailLabel: 'Corporate email',
    emailPlaceholder: 'NAME@COMPANY.COM',
    teamSizeLabel: 'Estimated scope',
    teamSizes: [
      '1 – 5 people (Individual / Executive)',
      '6 – 25 people (Team)',
      '26 – 100 people (Restructuring)',
      '100+ people (Enterprise)',
    ],
    messageLabel: 'Context or needs',
    messagePlaceholder: 'TELL US ABOUT YOUR TRANSITION PROJECT',
    submit: 'REQUEST DEMO',
    submitting: 'SENDING...',
    successTitle: 'REQUEST RECEIVED!',
    successDesc:
      'Our team will review your APAZ TS powered by ELVIA demo request and reach out shortly.',
    whatsappBtn: 'CHAT ON WHATSAPP NOW',
    resetBtn: 'SEND ANOTHER INQUIRY',
  },
} as const;

export function OutplacementPage({
  language,
  onBackHome,
}: OutplacementPageProps) {
  const t = copy[language];
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    scopeIdx: 0,
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );

  const renderPillarIcon = (icon: string) => {
    if (icon === 'award') return <Award className="size-6 text-brand-gold" />;
    if (icon === 'gift') return <Gift className="size-6 text-brand-gold" />;
    return <HeartHandshake className="size-6 text-brand-gold" />;
  };

  const renderModuleIcon = (idx: number) => {
    if (idx === 0) return <Sparkles className="size-5 text-[#00b4b4]" />;
    if (idx === 1) return <Layers className="size-5 text-[#00b4b4]" />;
    if (idx === 2) return <Network className="size-5 text-[#00b4b4]" />;
    return <Users className="size-5 text-[#00b4b4]" />;
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const selectedScope = t.teamSizes[formData.scopeIdx] ?? t.teamSizes[0];
    const enrichedMessage = `[OUTPLACEMENT B2B - ${formData.company}] (${selectedScope}) ${formData.message}`;
    let submitted = false;

    try {
      const { error } = await supabase.from('contacts').insert([
        {
          name: `${formData.name} (${formData.company})`,
          email: formData.email,
          phone: selectedScope,
          message: enrichedMessage,
        },
      ]);
      if (!error) submitted = true;
    } catch (err) {
      console.warn('Supabase outplacement submit warning:', err);
    }

    try {
      const formBody = new URLSearchParams({
        'form-name': 'contact',
        name: `${formData.name} — ${formData.company}`,
        email: formData.email,
        phone: selectedScope,
        message: enrichedMessage,
      }).toString();

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody,
      });
      submitted = true;
    } catch (err) {
      console.warn('Netlify outplacement submit warning:', err);
    }

    if (submitted) {
      setStatus('success');
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hola Alejandro, solicité una demo de APAZ TS powered by ELVIA para ${
        formData.company || 'mi empresa'
      }. Mi nombre es ${formData.name}.`
    );
    window.open(`https://wa.me/525525164576?text=${text}`, '_blank');
  };

  return (
    <main className="bg-brand-white">
      {/* 1. Co-branded Executive Hero */}
      <section className="bg-brand-black text-white border-b-2 border-brand-black relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -right-40 top-10 w-[520px] h-[520px] rounded-full bg-[#00b4b4]/10 blur-3xl pointer-events-none"
        />
        <div className="max-w-[1600px] mx-auto px-6 py-16 md:py-24 relative z-10">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-white/60 hover:text-brand-gold transition-colors mb-12 cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            {t.backHome}
          </button>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-brand-gold block mb-8 border-l-4 border-brand-gold pl-4">
                {t.eyebrow}
              </span>

              {/* Co-branding lockup using official APAZ + ELVIA logos */}
              <div className="inline-flex flex-wrap items-center gap-6 border border-white/20 bg-brand-black px-6 py-4 mb-10">
                <img
                  src="/logo-fondo-negro.png"
                  alt="APAZ Talent Search"
                  className="h-20 sm:h-24 w-auto object-contain"
                />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2dd4bf] border-x border-white/20 px-4 py-1.5">
                  {t.poweredBy}
                </span>
                <img
                  src="/elvia-logo.png"
                  alt="ELVIA"
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.88] tracking-tighter mb-8">
                {t.heroTitleMain} <br />
                <span className="text-brand-gold italic font-light lowercase tracking-normal">
                  {t.heroTitleAccent}
                </span>
              </h1>

              <p className="text-sm md:text-base text-white/75 max-w-2xl leading-relaxed mb-10">
                {t.heroDesc}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => scrollTo('outplacement-video')}
                  className="inline-flex items-center gap-3 bg-brand-gold text-brand-black px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-colors cursor-pointer"
                >
                  {t.ctaVideo}
                  <ArrowDown className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('outplacement-demo')}
                  className="inline-flex items-center gap-3 border-2 border-white/30 text-white px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:border-brand-gold hover:text-brand-gold transition-colors cursor-pointer"
                >
                  {t.ctaDemo}
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 border-2 border-white/15 p-8 bg-white/[0.02]">
              <img
                src="/elvia-logo.png"
                alt="ELVIA"
                className="h-12 w-auto object-contain mb-6"
              />
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold mb-3">
                {t.platformQuote}
              </p>
              <p className="text-xs text-white/60 leading-relaxed mb-6">
                elvia.lat
              </p>
              <a
                href="https://www.elvia.lat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors"
              >
                {t.platformLink}
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Video Showcase */}
      <section
        id="outplacement-video"
        className="py-12 md:py-16 border-b-2 border-brand-black bg-brand-white scroll-mt-32"
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="max-w-[860px] mx-auto">
            <div className="mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-3 block border-l-4 border-brand-gold pl-4">
                {t.videoEyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                {t.videoTitle}
              </h2>
            </div>

            <OutplacementVideoPlayer language={language} />

            <div className="grid md:grid-cols-3 border-x-2 border-b-2 border-brand-black divide-y-2 md:divide-y-0 md:divide-x-2 divide-brand-black">
              {t.videoBullets.map((item) => (
                <div key={item.label} className="p-6 bg-brand-white">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-gold block mb-2">
                    {item.label}
                  </span>
                  <p className="text-xs leading-relaxed opacity-75">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Corporate Pillars */}
      <section className="py-20 md:py-28 border-b-2 border-brand-black bg-brand-gray">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-5 block border-l-4 border-brand-gold pl-4">
              {t.pillarsEyebrow}
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.92]">
              {t.pillarsTitle}
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 border-2 border-brand-black divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-brand-black bg-brand-white">
            {t.pillars.map((pillar) => (
              <div
                key={pillar.num}
                className="p-10 md:p-12 flex flex-col justify-between gap-8 hover:bg-brand-black hover:text-white transition-colors duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-10">
                    <span className="text-xs font-black tracking-[0.25em] text-brand-gold">
                      {pillar.num}
                    </span>
                    {renderPillarIcon(pillar.icon)}
                  </div>

                  <h3 className="text-3xl font-black uppercase tracking-tight mb-5">
                    {pillar.title}
                  </h3>

                  <p className="text-sm font-bold leading-snug mb-5">
                    {pillar.headline}
                  </p>

                  <p className="text-xs leading-relaxed opacity-65 group-hover:opacity-80">
                    {pillar.desc}
                  </p>
                </div>

                <div className="w-12 h-1 bg-brand-gold" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What Collaborators Receive Inside ELVIA */}
      <section className="py-20 md:py-28 border-b-2 border-brand-black bg-brand-black text-white">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00b4b4] mb-5 block border-l-4 border-[#00b4b4] pl-4">
                {t.platformEyebrow}
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.92]">
                {t.platformTitle}
              </h2>
            </div>

            <a
              href="https://www.elvia.lat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-white/25 px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:border-[#00b4b4] hover:text-[#00b4b4] transition-colors shrink-0"
            >
              {t.platformLink}
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-white/15 divide-y md:divide-y-0 md:divide-x divide-white/15">
            {t.modules.map((mod, idx) => (
              <div key={mod.num} className="p-8 md:p-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black tracking-[0.25em] text-brand-gold">
                    {mod.num}
                  </span>
                  {renderModuleIcon(idx)}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight leading-snug">
                  {mod.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/65">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Comparison Table */}
      <section className="py-20 md:py-28 border-b-2 border-brand-black bg-brand-white">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-5 block border-l-4 border-brand-gold pl-4">
              {t.compareEyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              {t.compareTitle}
            </h2>
          </div>

          {/* Mobile stacked comparison cards */}
          <div className="md:hidden border-2 border-brand-black divide-y-2 divide-brand-black">
            {t.compareRows.map((row) => (
              <div key={row.axis} className="bg-brand-white">
                <div className="p-4 bg-brand-gray border-b border-brand-black/15 text-[10px] font-black uppercase tracking-[0.2em]">
                  {row.axis}
                </div>
                <div className="p-4 space-y-3 text-xs">
                  <div>
                    <span className="block text-[9px] font-black uppercase tracking-widest opacity-45 mb-1">
                      {language === 'es'
                        ? 'OUTPLACEMENT TRADICIONAL'
                        : 'TRADITIONAL OUTPLACEMENT'}
                    </span>
                    <p className="opacity-65 leading-relaxed">{row.traditional}</p>
                  </div>
                  <div className="p-3 bg-brand-gold/15 border-l-4 border-brand-gold">
                    <span className="block text-[9px] font-black uppercase tracking-widest text-brand-black mb-1">
                      APAZ TS POWERED BY ELVIA
                    </span>
                    <p className="font-bold leading-relaxed">{row.elvia}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop comparison table */}
          <div className="hidden md:block border-2 border-brand-black overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b-2 border-brand-black bg-brand-gray text-[10px] font-black uppercase tracking-[0.25em]">
                  <th className="p-6 w-1/4">
                    {language === 'es' ? 'DIMENSIÓN' : 'DIMENSION'}
                  </th>
                  <th className="p-6 w-[37.5%] border-l-2 border-brand-black opacity-60">
                    {language === 'es'
                      ? 'OUTPLACEMENT TRADICIONAL'
                      : 'TRADITIONAL OUTPLACEMENT'}
                  </th>
                  <th className="p-6 w-[37.5%] border-l-2 border-brand-black bg-brand-black text-brand-gold">
                    APAZ TS POWERED BY ELVIA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-brand-black text-xs">
                {t.compareRows.map((row) => (
                  <tr key={row.axis}>
                    <td className="p-6 font-black uppercase tracking-wider">
                      {row.axis}
                    </td>
                    <td className="p-6 border-l-2 border-brand-black opacity-60 leading-relaxed">
                      {row.traditional}
                    </td>
                    <td className="p-6 border-l-2 border-brand-black font-bold leading-relaxed bg-brand-gold/10">
                      {row.elvia}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. B2B Demo Inquiry Form */}
      <section
        id="outplacement-demo"
        className="bg-brand-white border-b-2 border-brand-black scroll-mt-32"
      >
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12">
          <div className="lg:col-span-5 p-10 md:p-20 border-b-2 lg:border-b-0 lg:border-r-2 border-brand-black flex flex-col justify-between bg-brand-black text-white">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold block mb-8">
                {t.formEyebrow}
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.94] mb-6">
                {t.formTitle}
              </h2>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                {t.formDesc}
              </p>
            </div>

            <div className="pt-12 mt-12 border-t border-white/15 flex items-center justify-between gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">
                MÉXICO · COLOMBIA · LATAM
              </span>
              <img
                src="/elvia-logo.png"
                alt="ELVIA"
                className="h-6 w-auto object-contain opacity-85"
              />
            </div>
          </div>

          <div className="lg:col-span-7 p-10 md:p-20 flex flex-col justify-center">
            {status === 'success' ? (
              <div className="text-center space-y-8 py-8">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-brand-gold flex items-center justify-center rounded-full">
                    <CheckCircle2 className="size-10 text-brand-black" />
                  </div>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter">
                  {t.successTitle}
                </h3>
                <p className="text-xs uppercase tracking-[0.18em] opacity-65 max-w-md mx-auto leading-relaxed">
                  {t.successDesc}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="bg-[#25D366] text-white px-8 py-5 text-xs font-black uppercase tracking-widest hover:bg-[#128C7E] transition-colors cursor-pointer"
                  >
                    {t.whatsappBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        scopeIdx: 0,
                        message: '',
                      });
                    }}
                    className="border-2 border-brand-black px-8 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-brand-black hover:text-white transition-colors cursor-pointer"
                  >
                    {t.resetBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-45">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={t.namePlaceholder}
                      className="w-full bg-brand-gray p-5 text-sm font-black uppercase tracking-tight focus:bg-brand-black focus:text-white transition-colors outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-45">
                      {t.companyLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder={t.companyPlaceholder}
                      className="w-full bg-brand-gray p-5 text-sm font-black uppercase tracking-tight focus:bg-brand-black focus:text-white transition-colors outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-45">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder={t.emailPlaceholder}
                      className="w-full bg-brand-gray p-5 text-sm font-black uppercase tracking-tight focus:bg-brand-black focus:text-white transition-colors outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-45">
                      {t.teamSizeLabel}
                    </label>
                    <select
                      value={formData.scopeIdx}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          scopeIdx: Number(e.target.value),
                        })
                      }
                      className="w-full bg-brand-gray p-5 text-xs font-black uppercase tracking-wider focus:bg-brand-black focus:text-white transition-colors outline-none cursor-pointer"
                    >
                      {t.teamSizes.map((size, idx) => (
                        <option key={size} value={idx}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-45">
                    {t.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t.messagePlaceholder}
                    className="w-full bg-brand-gray p-5 text-sm font-black uppercase tracking-tight focus:bg-brand-black focus:text-white transition-colors outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full h-16 bg-brand-black text-white text-sm font-black uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-black transition-all duration-300 cursor-pointer"
                >
                  {status === 'loading' ? t.submitting : `${t.submit} →`}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
