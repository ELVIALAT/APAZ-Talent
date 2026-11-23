import { AnimatePresence, motion } from 'motion/react';
import {
  Award,
  Briefcase,
  CheckCircle2,
  FileText,
  Gift,
  HeartHandshake,
  Linkedin,
  MessageSquare,
  Pause,
  Play,
  BookOpen,
  RotateCcw,
  Search,
  Sparkles,
  Subtitles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Language } from '../lib/manatal';

interface OutplacementVideoPlayerProps {
  language: Language;
  videoUrl?: string;
}

interface Scene {
  id: number;
  startSec: number;
  endSec: number;
  shortLabel: string;
  tag: string;
  headline: string;
  highlight: string;
  caption: string;
}

const TOTAL_DURATION = 82;

const copy = {
  es: {
    barTitle: 'APAZ TS × ELVIA · HISTORIA DE TRANSICIÓN',
    durationLabel: '01:22',
    play: 'VER HISTORIA',
    pause: 'PAUSAR',
    replay: 'REPETIR',
    captionsOn: 'SUBTÍTULOS',
    captionsOff: 'SIN SUBTÍTULOS',
    soundOn: 'MÚSICA ON',
    soundOff: 'SILENCIO',
    posterTag: 'VIDEO HISTORIA · POWERED BY ELVIA',
    posterTitle: 'De la incertidumbre de una salida, a un nuevo comienzo con propósito.',
    posterSub: 'Descubre el recorrido completo dentro de ELVIA (01:22)',
    scenes: [
      {
        id: 1,
        startSec: 0,
        endSec: 11,
        shortLabel: '01 Salida',
        tag: '01 · EL PUNTO DE PARTIDA',
        headline: 'Cerrar un ciclo laboral',
        highlight: 'nunca es fácil…',
        caption:
          'Salir de una empresa nunca es fácil. Detrás de cada desvinculación hay incertidumbre, dudas… y una trayectoria profesional que merece continuar con dignidad.',
      },
      {
        id: 2,
        startSec: 11,
        endSec: 22,
        shortLabel: '02 ELVIA',
        tag: '02 · LLEGA ELVIA — EL REGALO DE SALIDA',
        headline: 'Hola, soy ELVIA.',
        highlight: 'Tu nuevo comienzo.',
        caption:
          'Las empresas que cuidan a su gente convierten una salida en un regalo de transición. Soy ELVIA, y acompaño a cada colaborador en su siguiente paso profesional.',
      },
      {
        id: 3,
        startSec: 22,
        endSec: 34,
        shortLabel: '03 Autoconocimiento',
        tag: '03 · AUTOCONOCIMIENTO & OFERTA DE VALOR',
        headline: 'Reconecta con tu',
        highlight: 'oferta de valor.',
        caption:
          'Empezamos por el autoconocimiento: ejercicios guiados para identificar fortalezas, ordenar logros y construir una propuesta profesional clara y poderosa.',
      },
      {
        id: 4,
        startSec: 34,
        endSec: 46,
        shortLabel: '04 CV & LinkedIn',
        tag: '04 · CV DE ALTO IMPACTO & LINKEDIN',
        headline: 'Destaca ante los',
        highlight: 'tomadores de decisión.',
        caption:
          'Llevamos esa claridad a un CV ejecutivo optimizado y potenciamos tu perfil de LinkedIn y red estratégica para multiplicar tu visibilidad.',
      },
      {
        id: 5,
        startSec: 46,
        endSec: 58,
        shortLabel: '05 Entrevistas',
        tag: '05 · MICROLEARNING & ENTREVISTAS',
        headline: 'Llega seguro a',
        highlight: 'cada conversación.',
        caption:
          'Con cápsulas prácticas de microlearning y entrenamiento guiado para entrevistas, respondes con estructura, claridad y confianza.',
      },
      {
        id: 6,
        startSec: 58,
        endSec: 70,
        shortLabel: '06 Vacantes & Kanban',
        tag: '06 · BÚSQUEDA DE VACANTES & KANBAN',
        headline: 'Control total en',
        highlight: 'cada postulación.',
        caption:
          'Exploras vacantes alineadas a tu perfil y gestionas todo tu proceso en un tablero Kanban visual: desde por aplicar hasta la oferta final.',
      },
      {
        id: 7,
        startSec: 70,
        endSec: 82,
        shortLabel: '07 Empresa',
        tag: '07 · IMPACTO PARA TU EMPRESA',
        headline: 'Un cierre digno,',
        highlight: 'una marca más fuerte.',
        caption:
          'Para tu empresa, significa proteger su marca empleadora, dar un regalo de salida inolvidable y cumplir con una responsabilidad social real.',
      },
    ] as Scene[],
    ui: {
      elviaRole: 'Asistente de Transición de Carrera',
      elviaQuote: 'Conecta tu presente con el futuro que quieres.',
      selfItems: [
        'Fortalezas Clave',
        'Logros Cuantificables',
        'Propósito Profesional',
        'Oferta de Valor Única',
      ],
      cvBefore: 'CV Genérico',
      cvAfter: 'CV Ejecutivo ATS · 96% Match',
      linkedinHeadline: 'Líder Estratégico | Transformación & Negocio',
      linkedinScore: 'Perfil Estelar · +42 Conexiones Clave',
      microTitle: 'Microlearning · 5 min',
      microItems: [
        'Storytelling de Logros',
        'Personal Pitch 60s',
        'Negociación de Oferta',
      ],
      interviewTitle: 'Simulador de Entrevista',
      interviewPrompt: '“Cuéntame sobre un reto complejo que lideraste…”',
      interviewFeedback: 'Estructura STAR · Claridad 94%',
      searchTitle: 'Radar de Vacantes',
      searchJobs: [
        { role: 'Director Comercial', match: '95% Match' },
        { role: 'Gerente de Operaciones', match: '92% Match' },
      ],
      kanbanCols: ['Por aplicar', 'Postulado', 'Entrevista', 'Oferta ✓'],
      kanbanCard: 'Gerente Sr. LATAM',
      pillars: ['Marca Empleadora', 'Regalo de Salida', 'Responsabilidad Social'],
    },
  },
  en: {
    barTitle: 'APAZ TS × ELVIA · TRANSITION STORY',
    durationLabel: '01:22',
    play: 'WATCH STORY',
    pause: 'PAUSE',
    replay: 'REPLAY',
    captionsOn: 'CAPTIONS',
    captionsOff: 'CAPTIONS OFF',
    soundOn: 'MUSIC ON',
    soundOff: 'MUTED',
    posterTag: 'STORY FILM · POWERED BY ELVIA',
    posterTitle: 'From exit uncertainty to a purposeful new beginning.',
    posterSub: 'Explore the complete journey inside ELVIA (01:22)',
    scenes: [
      {
        id: 1,
        startSec: 0,
        endSec: 11,
        shortLabel: '01 Exit',
        tag: '01 · THE STARTING POINT',
        headline: 'Closing a career chapter',
        highlight: 'is never easy…',
        caption:
          'Leaving a company is never easy. Behind every offboarding there is uncertainty, doubt… and a career story that deserves to continue with dignity.',
      },
      {
        id: 2,
        startSec: 11,
        endSec: 22,
        shortLabel: '02 ELVIA',
        tag: '02 · ENTER ELVIA — THE PARTING GIFT',
        headline: 'Hi, I am ELVIA.',
        highlight: 'Your new beginning.',
        caption:
          'Companies that truly care turn an exit into a meaningful transition gift. I am ELVIA, guiding every team member into their next career step.',
      },
      {
        id: 3,
        startSec: 22,
        endSec: 34,
        shortLabel: '03 Self-Discovery',
        tag: '03 · SELF-DISCOVERY & VALUE OFFER',
        headline: 'Reconnect with your',
        highlight: 'value proposition.',
        caption:
          'We start with self-discovery: guided exercises to uncover strengths, structure key achievements, and define a compelling value proposition.',
      },
      {
        id: 4,
        startSec: 34,
        endSec: 46,
        shortLabel: '04 CV & LinkedIn',
        tag: '04 · EXECUTIVE CV & LINKEDIN',
        headline: 'Stand out to key',
        highlight: 'decision-makers.',
        caption:
          'We translate that clarity into a high-impact executive resume and optimize your LinkedIn profile and network for maximum visibility.',
      },
      {
        id: 5,
        startSec: 46,
        endSec: 58,
        shortLabel: '05 Interviews',
        tag: '05 · MICROLEARNING & INTERVIEW PREP',
        headline: 'Walk confident into',
        highlight: 'every interview.',
        caption:
          'With focused microlearning capsules and guided interview practice, you arrive prepared with clear, compelling answers.',
      },
      {
        id: 6,
        startSec: 58,
        endSec: 70,
        shortLabel: '06 Jobs & Kanban',
        tag: '06 · JOB SEARCH & KANBAN BOARD',
        headline: 'Full clarity across',
        highlight: 'every application.',
        caption:
          'Explore tailored job openings and track every opportunity on a visual Kanban board—from shortlist to final offer.',
      },
      {
        id: 7,
        startSec: 70,
        endSec: 82,
        shortLabel: '07 Impact',
        tag: '07 · IMPACT FOR YOUR COMPANY',
        headline: 'A dignified exit,',
        highlight: 'a stronger brand.',
        caption:
          'For your organization, it protects your employer brand, delivers a memorable parting gift, and demonstrates real social responsibility.',
      },
    ] as Scene[],
    ui: {
      elviaRole: 'Career Transition Guide',
      elviaQuote: 'Connect your present with the future you want.',
      selfItems: [
        'Core Strengths',
        'Measurable Wins',
        'Career Purpose',
        'Unique Value Offer',
      ],
      cvBefore: 'Generic Resume',
      cvAfter: 'Executive ATS CV · 96% Match',
      linkedinHeadline: 'Strategic Leader | Growth & Transformation',
      linkedinScore: 'All-Star Profile · +42 Key Connections',
      microTitle: 'Microlearning · 5 min',
      microItems: [
        'Achievement Storytelling',
        '60s Executive Pitch',
        'Offer Negotiation',
      ],
      interviewTitle: 'Interview Simulator',
      interviewPrompt: '“Tell me about a complex challenge you led…”',
      interviewFeedback: 'STAR Structure · 94% Clarity',
      searchTitle: 'Job Radar',
      searchJobs: [
        { role: 'Commercial Director', match: '95% Match' },
        { role: 'Operations Manager', match: '92% Match' },
      ],
      kanbanCols: ['To Apply', 'Applied', 'Interview', 'Offer ✓'],
      kanbanCard: 'Sr. Manager LATAM',
      pillars: ['Employer Brand', 'Parting Gift', 'Social Responsibility'],
    },
  },
} as const;

function formatClock(sec: number): string {
  const clamped = Math.max(0, Math.min(TOTAL_DURATION, Math.floor(sec)));
  const mins = Math.floor(clamped / 60);
  const rem = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

export function OutplacementVideoPlayer({
  language,
  videoUrl,
}: OutplacementVideoPlayerProps) {
  const t = copy[language];
  const resolvedUrl =
    videoUrl || import.meta.env.VITE_OUTPLACEMENT_VIDEO_URL || '';

  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [showCaptions, setShowCaptions] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const padTimerRef = useRef<number | null>(null);

  const stopAmbientAudio = useCallback(() => {
    if (padTimerRef.current !== null) {
      window.clearInterval(padTimerRef.current);
      padTimerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  }, []);

  const startAmbientAudio = useCallback(() => {
    if (typeof window === 'undefined') return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx || audioCtxRef.current) return;

    try {
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const playSoftChord = (freqs: number[]) => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const now = ctx.currentTime;
        const master = ctx.createGain();
        master.gain.setValueAtTime(0.0001, now);
        master.gain.exponentialRampToValueAtTime(0.035, now + 1.1);
        master.gain.exponentialRampToValueAtTime(0.0001, now + 4.4);
        master.connect(ctx.destination);

        freqs.forEach((f) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);
          osc.connect(master);
          osc.start(now);
          osc.stop(now + 4.5);
        });
      };

      const chords = [
        [220.0, 261.63, 329.63], // Am
        [174.61, 220.0, 261.63], // F
        [261.63, 329.63, 392.0], // C
        [196.0, 246.94, 293.66], // G
      ];
      let step = 0;
      playSoftChord(chords[step]);
      padTimerRef.current = window.setInterval(() => {
        step = (step + 1) % chords.length;
        playSoftChord(chords[step]);
      }, 4200);
    } catch {
      // Ignore if browser blocks audio
    }
  }, []);

  useEffect(() => {
    if (isPlaying && soundEnabled && !resolvedUrl) {
      startAmbientAudio();
    } else {
      stopAmbientAudio();
    }
    return () => stopAmbientAudio();
  }, [isPlaying, soundEnabled, resolvedUrl, startAmbientAudio, stopAmbientAudio]);

  useEffect(() => {
    if (!isPlaying || resolvedUrl) return;

    const timer = window.setInterval(() => {
      setElapsedSec((prev) => {
        if (prev + 0.25 >= TOTAL_DURATION) {
          setIsPlaying(false);
          return TOTAL_DURATION;
        }
        return prev + 0.25;
      });
    }, 250);

    return () => window.clearInterval(timer);
  }, [isPlaying, resolvedUrl]);

  const activeScene = useMemo(() => {
    return (
      t.scenes.find(
        (scene) => elapsedSec >= scene.startSec && elapsedSec < scene.endSec
      ) ?? t.scenes[t.scenes.length - 1]
    );
  }, [elapsedSec, t.scenes]);

  const sceneProgress = useMemo(() => {
    const span = Math.max(1, activeScene.endSec - activeScene.startSec);
    return Math.max(0, Math.min(1, (elapsedSec - activeScene.startSec) / span));
  }, [activeScene, elapsedSec]);

  const progressPct = Math.min(100, (elapsedSec / TOTAL_DURATION) * 100);

  const togglePlay = () => {
    if (!hasStarted) setHasStarted(true);
    if (elapsedSec >= TOTAL_DURATION) {
      setElapsedSec(0);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  const jumpToScene = (scene: Scene) => {
    setHasStarted(true);
    setElapsedSec(scene.startSec);
    setIsPlaying(true);
  };

  const restart = () => {
    setHasStarted(true);
    setElapsedSec(0);
    setIsPlaying(true);
  };

  if (resolvedUrl) {
    const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(resolvedUrl);
    return (
      <div className="border-2 border-brand-black bg-[#002650]">
        <div className="px-6 py-3 border-b border-white/15 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.25em] text-white/80">
          <span>{t.barTitle}</span>
          <span className="text-[#14b8a6]">HD</span>
        </div>
        <div className="aspect-video w-full bg-brand-black">
          {isDirectVideo ? (
            <video
              src={resolvedUrl}
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <iframe
              src={resolvedUrl}
              title={t.barTitle}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    );
  }

  const renderSceneVisual = () => {
    switch (activeScene.id) {
      case 1:
        return (
          <div className="relative h-full w-full flex flex-col justify-between">
            {/* Background cinematic exit photo with slow zoom */}
            <motion.img
              src="/video-exit.jpg"
              alt="Salida de empresa"
              initial={{ scale: 1 }}
              animate={{ scale: 1.07 }}
              transition={{ duration: 11, ease: 'linear' }}
              className="absolute inset-0 w-full h-full object-cover object-right opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/85 to-transparent" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2dd4bf]">
                {activeScene.tag}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 my-auto max-w-xl space-y-4"
            >
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.94] text-white">
                {activeScene.headline}{' '}
                <span className="block text-[#2dd4bf] italic font-light lowercase tracking-normal mt-1">
                  {activeScene.highlight}
                </span>
              </h3>
            </motion.div>

            <div className="relative z-10 h-1" />
          </div>
        );

      case 2:
        return (
          <div className="relative h-full w-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2dd4bf]">
                {activeScene.tag}
              </span>
              <img
                src="/elvia-logo.png"
                alt="ELVIA"
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </div>

            <div className="my-auto grid md:grid-cols-12 gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
                className="md:col-span-7 space-y-4"
              >
                <span className="inline-block bg-[#e8541a] text-white px-3 py-1 text-[9px] font-black uppercase tracking-[0.25em]">
                  {t.ui.elviaRole}
                </span>
                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-[0.95] text-white">
                  {activeScene.headline}{' '}
                  <span className="block text-[#2dd4bf] italic font-light lowercase tracking-normal mt-1">
                    {activeScene.highlight}
                  </span>
                </h3>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/75 border-l-2 border-[#14b8a6] pl-3">
                  {t.ui.elviaQuote}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="md:col-span-5 flex justify-center md:justify-end"
              >
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 border-2 border-[#2dd4bf] overflow-hidden shadow-2xl">
                  <img
                    src="/elvia-avatar.jpg"
                    alt="ELVIA Avatar"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-[#002650]/90 px-3 py-2 flex items-center justify-between border-t border-[#2dd4bf]/40">
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white">
                      ELVIA AI
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="h-1" />
          </div>
        );

      case 3:
        return (
          <div className="relative h-full w-full flex flex-col justify-between">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2dd4bf]">
                {activeScene.tag}
              </span>
              <div className="flex items-center gap-2 bg-white/10 px-2.5 py-1 border border-white/15">
                <img
                  src="/elvia-avatar.jpg"
                  alt="ELVIA"
                  className="w-6 h-6 rounded-full object-cover object-top"
                />
                <span className="text-[9px] font-black uppercase tracking-widest text-white">
                  ELVIA
                </span>
              </div>
            </div>

            <div className="my-auto grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter leading-[0.95]">
                  {activeScene.headline}{' '}
                  <span className="block text-[#2dd4bf] italic font-light lowercase tracking-normal">
                    {activeScene.highlight}
                  </span>
                </h3>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-3">
                {t.ui.selfItems.map((item, i) => {
                  const unlocked = sceneProgress >= i * 0.2;
                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{
                        opacity: unlocked ? 1 : 0.35,
                        y: unlocked ? 0 : 8,
                      }}
                      transition={{ duration: 0.35, delay: i * 0.12 }}
                      className={`p-4 border ${
                        unlocked
                          ? 'border-[#2dd4bf] bg-[#002650]/90'
                          : 'border-white/15 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-black text-[#e8541a] tracking-widest">
                          0{i + 1}
                        </span>
                        <CheckCircle2
                          className={`size-4 ${
                            unlocked ? 'text-[#2dd4bf]' : 'text-white/20'
                          }`}
                        />
                      </div>
                      <p className="text-xs sm:text-sm font-black uppercase tracking-tight text-white">
                        {item}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="h-1" />
          </div>
        );

      case 4:
        return (
          <div className="relative h-full w-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2dd4bf]">
                {activeScene.tag}
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/60">
                CV + LINKEDIN
              </span>
            </div>

            <div className="my-auto grid md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-5">
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter leading-[0.95]">
                  {activeScene.headline}{' '}
                  <span className="block text-[#2dd4bf] italic font-light lowercase tracking-normal">
                    {activeScene.highlight}
                  </span>
                </h3>
              </div>

              <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
                {/* Executive CV Card */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="bg-white text-[#0f172a] p-4 border-2 border-[#2dd4bf] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <FileText className="size-5 text-[#002650]" />
                    <span className="bg-[#e8541a] text-white px-2 py-0.5 text-[8px] font-black uppercase tracking-widest">
                      {t.ui.cvAfter}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-2/3 bg-[#002650]" />
                    <div className="h-2 w-full bg-[#0f172a]/15" />
                    <div className="h-2 w-5/6 bg-[#0f172a]/15" />
                    <div className="h-2 w-4/5 bg-[#14b8a6]/40" />
                  </div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#0f172a]/50 line-through">
                    {t.ui.cvBefore}
                  </p>
                </motion.div>

                {/* LinkedIn Card */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 }}
                  className="bg-[#0077B5] text-white p-4 border-2 border-white/30 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Linkedin className="size-5" />
                    <span className="text-[8px] font-black uppercase tracking-widest bg-white text-[#0077B5] px-2 py-0.5">
                      100%
                    </span>
                  </div>
                  <p className="text-xs font-black leading-snug">
                    {t.ui.linkedinHeadline}
                  </p>
                  <div className="w-full h-1.5 bg-white/25">
                    <motion.div
                      initial={{ width: '40%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-[#2dd4bf]"
                    />
                  </div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-white/90">
                    {t.ui.linkedinScore}
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="h-1" />
          </div>
        );

      case 5:
        return (
          <div className="relative h-full w-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2dd4bf]">
                {activeScene.tag}
              </span>
            </div>

            <div className="my-auto grid md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-5">
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter leading-[0.95]">
                  {activeScene.headline}{' '}
                  <span className="block text-[#2dd4bf] italic font-light lowercase tracking-normal">
                    {activeScene.highlight}
                  </span>
                </h3>
              </div>

              <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
                {/* Microlearning Card */}
                <div className="border border-[#2dd4bf]/50 bg-[#002650] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <BookOpen className="size-4 text-[#2dd4bf]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#e8541a]">
                      {t.ui.microTitle}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {t.ui.microItems.map((item, idx) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.25 }}
                        className="flex items-center gap-2 text-xs font-bold text-white"
                      >
                        <CheckCircle2 className="size-3.5 text-[#2dd4bf] shrink-0" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Interview Simulator Card */}
                <div className="border border-white/25 bg-[#1e293b] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <MessageSquare className="size-4 text-[#e8541a]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#2dd4bf]">
                      {t.ui.interviewTitle}
                    </span>
                  </div>
                  <p className="text-xs italic text-white/85 leading-snug">
                    {t.ui.interviewPrompt}
                  </p>
                  <div className="flex gap-1.5">
                    {['S', 'T', 'A', 'R'].map((letter) => (
                      <span
                        key={letter}
                        className="w-6 h-6 bg-[#002650] border border-[#2dd4bf] text-[10px] font-black flex items-center justify-center text-[#2dd4bf]"
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                  <span className="inline-block bg-[#10b981] text-[#0f172a] px-2 py-0.5 text-[9px] font-black uppercase tracking-widest">
                    {t.ui.interviewFeedback}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-1" />
          </div>
        );

      case 6: {
        // Animate Kanban card progressing across the 4 columns
        const activeCol = Math.min(3, Math.floor(sceneProgress * 4));
        return (
          <div className="relative h-full w-full flex flex-col justify-between">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2dd4bf]">
                {activeScene.tag}
              </span>
              <div className="hidden sm:flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/75">
                <Search className="size-3 text-[#e8541a]" />
                <span>{t.ui.searchTitle}</span>
              </div>
            </div>

            <div className="my-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter leading-[0.95]">
                  {activeScene.headline}{' '}
                  <span className="text-[#2dd4bf] italic font-light lowercase tracking-normal">
                    {activeScene.highlight}
                  </span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {t.ui.searchJobs.map((job) => (
                    <span
                      key={job.role}
                      className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-2.5 py-1 text-[9px] font-bold"
                    >
                      <Briefcase className="size-3 text-[#2dd4bf]" />
                      <span>{job.role}</span>
                      <span className="text-[#e8541a] font-black">
                        {job.match}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* 4-column animated Kanban */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {t.ui.kanbanCols.map((col, colIdx) => {
                  const hasCard = colIdx === activeCol;
                  const isFinal = colIdx === 3 && activeCol === 3;
                  return (
                    <div
                      key={col}
                      className={`p-3 border min-h-[96px] flex flex-col justify-between transition-colors ${
                        isFinal
                          ? 'border-[#10b981] bg-[#10b981]/15'
                          : 'border-white/20 bg-[#002650]/80'
                      }`}
                    >
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/70">
                        {col}
                      </span>

                      {hasCard ? (
                        <motion.div
                          layoutId="kanban-active-card"
                          className={`mt-2 p-2.5 border ${
                            isFinal
                              ? 'bg-[#10b981] text-[#0f172a] border-white'
                              : 'bg-[#e8541a] text-white border-white/30'
                          }`}
                        >
                          <p className="text-[10px] font-black uppercase leading-tight">
                            {t.ui.kanbanCard}
                          </p>
                          <p className="text-[8px] font-bold uppercase opacity-85 mt-1">
                            {col}
                          </p>
                        </motion.div>
                      ) : (
                        <div className="mt-2 h-8 border border-dashed border-white/15" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-1" />
          </div>
        );
      }

      default:
        return (
          <div className="relative h-full w-full flex flex-col justify-between">
            <motion.img
              src="/video-newstart.jpg"
              alt="Nuevo comienzo"
              initial={{ scale: 1 }}
              animate={{ scale: 1.07 }}
              transition={{ duration: 12, ease: 'linear' }}
              className="absolute inset-0 w-full h-full object-cover object-right opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#002650] via-[#002650]/90 to-[#002650]/35" />

            <div className="relative z-10 flex items-center justify-between gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2dd4bf]">
                {activeScene.tag}
              </span>
              <img
                src="/elvia-logo.png"
                alt="ELVIA"
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </div>

            <div className="relative z-10 my-auto max-w-2xl space-y-5">
              <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-[0.94] text-white">
                {activeScene.headline}{' '}
                <span className="block text-brand-gold italic font-light lowercase tracking-normal mt-1">
                  {activeScene.highlight}
                </span>
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {t.ui.pillars.map((pillar, idx) => (
                  <span
                    key={pillar}
                    className="inline-flex items-center gap-2 bg-[#002650]/90 border border-[#2dd4bf] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white"
                  >
                    {idx === 0 && <Award className="size-3.5 text-brand-gold" />}
                    {idx === 1 && <Gift className="size-3.5 text-[#2dd4bf]" />}
                    {idx === 2 && (
                      <HeartHandshake className="size-3.5 text-[#e8541a]" />
                    )}
                    {pillar}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-white/80">
              <span>APAZ TALENT SEARCH</span>
              <span className="text-[#2dd4bf]">× POWERED BY ELVIA</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="border-2 border-brand-black bg-[#002650] text-white overflow-hidden">
      {/* Top technical header bar */}
      <div className="px-5 md:px-8 py-3.5 border-b border-white/15 bg-[#0f172a] flex flex-wrap items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.22em]">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 bg-[#14b8a6]" />
          <span className="text-white/90">{t.barTitle}</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#2dd4bf] transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="size-3.5 text-[#2dd4bf]" />
            ) : (
              <VolumeX className="size-3.5" />
            )}
            <span className="hidden sm:inline">
              {soundEnabled ? t.soundOn : t.soundOff}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowCaptions((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-brand-gold transition-colors cursor-pointer"
          >
            <Subtitles className="size-3.5" />
            <span className="hidden sm:inline">
              {showCaptions ? t.captionsOn : t.captionsOff}
            </span>
          </button>

          <span className="text-[#2dd4bf] font-mono">
            {formatClock(elapsedSec)} / {t.durationLabel}
          </span>
        </div>
      </div>

      {/* 16:9 Cinema Stage */}
      <div className="relative aspect-video w-full bg-[#002650] overflow-hidden p-5 sm:p-8 md:p-12 flex flex-col justify-between">
        {/* Ambient ELVIA brand glow */}
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#14b8a6]/15 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-[#e8541a]/15 blur-3xl pointer-events-none"
        />

        {!hasStarted ? (
          /* Poster Cover featuring ELVIA Avatar & Story Preview */
          <div className="relative z-10 h-full grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 flex flex-col justify-between h-full">
              <div className="flex items-center gap-3">
                <img
                  src="/elvia-logo.png"
                  alt="ELVIA"
                  className="h-7 sm:h-9 w-auto object-contain"
                />
                <span className="text-[9px] font-black uppercase tracking-[0.28em] text-[#2dd4bf] border-l border-white/25 pl-3">
                  {t.posterTag}
                </span>
              </div>

              <div className="my-auto space-y-5 py-4">
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.94] text-white">
                  {t.posterTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="inline-flex items-center gap-3 bg-[#e8541a] text-white px-7 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#14b8a6] hover:text-[#0f172a] transition-colors cursor-pointer"
                  >
                    <Play className="size-4 fill-current" />
                    {t.play}
                  </button>
                  <span className="text-[11px] uppercase tracking-wider text-white/65">
                    {t.posterSub}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.25em] text-white/50">
                <Sparkles className="size-3 text-[#2dd4bf]" />
                <span>APAZ TALENT SEARCH × ELVIA.LAT</span>
              </div>
            </div>

            <div className="hidden md:flex md:col-span-5 h-full items-center justify-end">
              <div
                onClick={togglePlay}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePlay();
                  }
                }}
                className="relative w-full max-w-[300px] aspect-square border-2 border-[#2dd4bf] overflow-hidden cursor-pointer group"
              >
                <img
                  src="/elvia-avatar.jpg"
                  alt="ELVIA"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002650]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    {t.ui.elviaRole}
                  </span>
                  <span className="w-9 h-9 bg-[#e8541a] flex items-center justify-center text-white group-hover:bg-[#14b8a6] group-hover:text-[#0f172a] transition-colors">
                    <Play className="size-4 fill-current" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Active Scene + Synchronized Narrative Caption */
          <div className="relative z-10 h-full flex flex-col justify-between gap-3">
            <div className="flex-1 min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScene.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="h-full w-full"
                >
                  {renderSceneVisual()}
                </motion.div>
              </AnimatePresence>
            </div>

            {showCaptions && (
              <div className="relative z-20 border-l-4 border-[#e8541a] bg-[#0f172a]/90 backdrop-blur-sm px-4 py-2.5 max-w-4xl">
                <p className="text-xs sm:text-sm leading-relaxed text-white font-medium">
                  {activeScene.caption}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress Bar & 7 Scene Chapters */}
      <div className="border-t border-white/15 bg-[#0f172a]">
        <div className="h-1.5 w-full bg-white/10">
          <div
            className="h-full bg-[#14b8a6] transition-all duration-200"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center gap-2 bg-[#e8541a] text-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#14b8a6] hover:text-[#0f172a] transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="size-3.5 fill-current" />
                  {t.pause}
                </>
              ) : (
                <>
                  <Play className="size-3.5 fill-current" />
                  {elapsedSec >= TOTAL_DURATION ? t.replay : t.play}
                </>
              )}
            </button>

            <button
              type="button"
              onClick={restart}
              aria-label={t.replay}
              className="p-2 border border-white/20 text-white/70 hover:text-[#2dd4bf] hover:border-[#2dd4bf] transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {t.scenes.map((scene) => {
              const isCurrent = hasStarted && activeScene.id === scene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => jumpToScene(scene)}
                  className={`px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] border transition-colors cursor-pointer ${
                    isCurrent
                      ? 'border-[#14b8a6] bg-[#14b8a6] text-[#0f172a]'
                      : 'border-white/15 text-white/65 hover:text-white hover:border-white/40'
                  }`}
                >
                  {scene.shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
