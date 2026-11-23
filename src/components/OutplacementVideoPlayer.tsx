import { AnimatePresence, motion } from 'motion/react';
import { Pause, Play, RotateCcw, Sparkles, Subtitles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Language } from '../lib/manatal';

interface OutplacementVideoPlayerProps {
  language: Language;
  videoUrl?: string;
}

interface Scene {
  id: number;
  startSec: number;
  endSec: number;
  tag: string;
  headline: string;
  highlight: string;
  caption: string;
  pills: string[];
}

const TOTAL_DURATION = 65;

const copy = {
  es: {
    barTitle: 'APAZ TS × ELVIA · PRESENTACIÓN EJECUTIVA',
    durationLabel: '01:05',
    play: 'REPRODUCIR PRESENTACIÓN',
    pause: 'PAUSAR',
    replay: 'REINICIAR',
    captionsOn: 'SUBTÍTULOS ON',
    captionsOff: 'SUBTÍTULOS OFF',
    posterTag: 'OUTPLACEMENT AUTOGESTIONADO PARA EMPRESAS',
    posterTitle: 'Cuidar la salida protege tu marca empleadora.',
    posterSub: 'Haz clic para reproducir el brief ejecutivo (65 seg)',
    scenes: [
      {
        id: 1,
        startSec: 0,
        endSec: 15,
        tag: '01 · EL MOMENTO CRÍTICO',
        headline: 'La forma en que despides',
        highlight: 'define tu cultura.',
        caption:
          'Las decisiones de reestructura nunca son fáciles. Pero la manera en que una empresa acompaña una salida dice tanto de su cultura como la forma en que contrata.',
        pills: ['Cultura Organizacional', 'Transiciones Dignas', 'Candidate Centricity'],
      },
      {
        id: 2,
        startSec: 15,
        endSec: 35,
        tag: '02 · MARCA EMPLEADORA & REGALO DE SALIDA',
        headline: 'Transforma una salida en',
        highlight: 'un regalo profesional.',
        caption:
          'Con APAZ TS powered by ELVIA entregas una plataforma de autogestión con herramientas de clase mundial para que cada persona redefina su oferta de valor y active su red.',
        pills: ['Marca Personal', 'Estrategia de Red', 'Autogestión 24/7 con IA'],
      },
      {
        id: 3,
        startSec: 35,
        endSec: 52,
        tag: '03 · RESPONSABILIDAD SOCIAL',
        headline: 'Impacto humano medible',
        highlight: 'en familias y carreras.',
        caption:
          'Protege tu reputación ante quienes permanecen en la empresa y materializa tu compromiso de responsabilidad social con apoyo real en empleabilidad para LATAM.',
        pills: ['Marca Empleadora', 'ESG / Responsabilidad Social', 'Clima Interno'],
      },
      {
        id: 4,
        startSec: 52,
        endSec: 65,
        tag: '04 · APAZ TS POWERED BY ELVIA',
        headline: 'Conecta tu presente con',
        highlight: 'el futuro que quieres.',
        caption:
          'Tecnología diseñada para escalar a toda tu organización, respaldada por más de 15 años conectando talento en Hispanoamérica y Europa.',
        pills: ['Escalable 1 a 500+', 'Activación en 48h', 'Mentoría Híbrida Opcional'],
      },
    ] as Scene[],
  },
  en: {
    barTitle: 'APAZ TS × ELVIA · EXECUTIVE BRIEF',
    durationLabel: '01:05',
    play: 'PLAY PRESENTATION',
    pause: 'PAUSE',
    replay: 'REPLAY',
    captionsOn: 'CAPTIONS ON',
    captionsOff: 'CAPTIONS OFF',
    posterTag: 'SELF-MANAGED CORPORATE OUTPLACEMENT',
    posterTitle: 'How you handle exits protects your employer brand.',
    posterSub: 'Click to play the 65-second executive brief',
    scenes: [
      {
        id: 1,
        startSec: 0,
        endSec: 15,
        tag: '01 · THE CRITICAL MOMENT',
        headline: 'How you say goodbye',
        highlight: 'defines your culture.',
        caption:
          'Restructuring decisions are never easy. Yet the way an organization supports departing talent speaks just as loudly about its culture as the way it hires.',
        pills: ['Organizational Culture', 'Dignified Transitions', 'Candidate Centricity'],
      },
      {
        id: 2,
        startSec: 15,
        endSec: 35,
        tag: '02 · EMPLOYER BRAND & PARTING GIFT',
        headline: 'Turn an exit into',
        highlight: 'a meaningful career gift.',
        caption:
          'With APAZ TS powered by ELVIA, you equip every departing team member with world-class self-managed tools to sharpen their value proposition and activate their network.',
        pills: ['Personal Branding', 'Network Strategy', '24/7 AI Self-Management'],
      },
      {
        id: 3,
        startSec: 35,
        endSec: 52,
        tag: '03 · SOCIAL RESPONSIBILITY',
        headline: 'Measurable human impact',
        highlight: 'for families and careers.',
        caption:
          'Protect trust among remaining teams and external talent while turning corporate social responsibility into tangible employability support across LATAM.',
        pills: ['Employer Brand', 'ESG / Social Impact', 'Internal Trust'],
      },
      {
        id: 4,
        startSec: 52,
        endSec: 65,
        tag: '04 · APAZ TS POWERED BY ELVIA',
        headline: 'Connect your present with',
        highlight: 'the future you want.',
        caption:
          'Technology built to scale across your organization, backed by 15+ years of human-centric talent advisory in Ibero-America and Europe.',
        pills: ['Scales 1 to 500+', '48h Activation', 'Optional Executive Coaching'],
      },
    ] as Scene[],
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

  const progressPct = Math.min(100, (elapsedSec / TOTAL_DURATION) * 100);

  const togglePlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
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

  // Support external MP4 / YouTube / Vimeo when VITE_OUTPLACEMENT_VIDEO_URL is provided
  if (resolvedUrl) {
    const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(resolvedUrl);
    return (
      <div className="border-2 border-brand-black bg-brand-black">
        <div className="px-6 py-3 border-b border-white/15 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.25em] text-white/70">
          <span>{t.barTitle}</span>
          <span className="text-brand-gold">HD</span>
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

  return (
    <div className="border-2 border-brand-black bg-brand-black text-white overflow-hidden">
      {/* Top technical header bar */}
      <div className="px-5 md:px-8 py-3.5 border-b border-white/15 flex flex-wrap items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.25em]">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-[#00b4b4]" />
          <span className="text-white/80">{t.barTitle}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setShowCaptions((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-brand-gold transition-colors cursor-pointer"
          >
            <Subtitles className="size-3.5" />
            <span className="hidden sm:inline">
              {showCaptions ? t.captionsOn : t.captionsOff}
            </span>
          </button>
          <span className="text-brand-gold font-mono">
            {formatClock(elapsedSec)} / {t.durationLabel}
          </span>
        </div>
      </div>

      {/* 16:9 Motion Stage */}
      <div className="relative aspect-video w-full bg-brand-black overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14">
        {/* Subtle editorial grid + ELVIA teal & APAZ gold ambient accents */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#00b4b4]/15 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none"
        />

        {!hasStarted ? (
          /* Poster / Initial Cover */
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-brand-gold border-l-2 border-brand-gold pl-3">
                {t.posterTag}
              </span>
              <img
                src="/elvia-logo.png"
                alt="ELVIA"
                className="h-7 sm:h-9 w-auto object-contain opacity-90"
              />
            </div>

            <div className="my-auto max-w-3xl space-y-6">
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95]">
                {t.posterTitle}
              </h3>
              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex items-center gap-4 bg-brand-gold text-brand-black px-7 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-colors cursor-pointer"
                >
                  <Play className="size-4 fill-current" />
                  {t.play}
                </button>
                <span className="text-[11px] uppercase tracking-widest text-white/55">
                  {t.posterSub}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
              <span>APAZ TALENT SEARCH</span>
              <span>POWERED BY ELVIA.LAT</span>
            </div>
          </div>
        ) : (
          /* Active Animated Motion Scene */
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00b4b4]">
                {activeScene.tag}
              </span>
              <div className="flex items-center gap-3">
                <Sparkles className="size-3.5 text-brand-gold" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
                  APAZ × ELVIA
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45 }}
                className="my-auto max-w-4xl space-y-5"
              >
                <h3 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.92]">
                  {activeScene.headline}{' '}
                  <span className="text-brand-gold italic font-light lowercase tracking-normal block sm:inline">
                    {activeScene.highlight}
                  </span>
                </h3>

                <div className="flex flex-wrap gap-2 pt-2">
                  {activeScene.pills.map((pill) => (
                    <span
                      key={pill}
                      className="border border-white/25 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/90"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {showCaptions ? (
              <div className="border-l-2 border-brand-gold bg-white/5 px-4 py-3 max-w-3xl">
                <p className="text-xs sm:text-sm leading-relaxed text-white/90 font-medium">
                  {activeScene.caption}
                </p>
              </div>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>

      {/* Progress Bar & Scene Chapters */}
      <div className="border-t border-white/15 bg-brand-black">
        <div className="h-1.5 w-full bg-white/10">
          <div
            className="h-full bg-brand-gold transition-all duration-200"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center gap-2 bg-white text-brand-black px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors cursor-pointer"
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
              className="p-2 border border-white/20 text-white/70 hover:text-brand-gold hover:border-brand-gold transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {t.scenes.map((scene) => {
              const isCurrent = hasStarted && activeScene.id === scene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => jumpToScene(scene)}
                  className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] border transition-colors cursor-pointer ${
                    isCurrent
                      ? 'border-brand-gold bg-brand-gold text-brand-black'
                      : 'border-white/15 text-white/60 hover:text-white hover:border-white/40'
                  }`}
                >
                  {scene.tag.split('·')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
