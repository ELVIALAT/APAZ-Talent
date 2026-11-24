import { Play } from 'lucide-react';
import { useRef, useState } from 'react';
import { Language } from '../lib/manatal';

interface OutplacementVideoPlayerProps {
  language: Language;
  videoUrl?: string;
}

const copy = {
  es: {
    barTitle: 'APAZ TS × ELVIA · RECORRIDO DE LA PLATAFORMA',
    durationLabel: '00:49 · HD',
    posterTag: 'OUTPLACEMENT AUTOGESTIONADO',
    posterTitle:
      'La transición de carrera deja de ser un laberinto: se vuelve un proyecto que tú gerencias.',
    play: 'REPRODUCIR VIDEO',
    posterSub: 'Video corporativo (49 seg)',
  },
  en: {
    barTitle: 'APAZ TS × ELVIA · PLATFORM WALKTHROUGH',
    durationLabel: '00:49 · HD',
    posterTag: 'SELF-MANAGED OUTPLACEMENT',
    posterTitle:
      'Career transition stops being a maze: it becomes a project you lead.',
    play: 'PLAY VIDEO',
    posterSub: 'Corporate walkthrough (49 sec)',
  },
} as const;

export function OutplacementVideoPlayer({
  language,
  videoUrl,
}: OutplacementVideoPlayerProps) {
  const t = copy[language];
  const resolvedUrl =
    videoUrl ||
    import.meta.env.VITE_OUTPLACEMENT_VIDEO_URL ||
    '/elvia-outplacement-v3.mp4';

  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(resolvedUrl);

  const handleStart = () => {
    setHasStarted(true);
    window.setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 50);
  };

  return (
    <div className="border-2 border-brand-black bg-brand-black text-white overflow-hidden">
      <div className="px-5 md:px-8 py-3 border-b border-white/15 bg-brand-black flex items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.22em]">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 bg-[#14b8a6]" />
          <span className="text-white/90">{t.barTitle}</span>
        </div>
        <span className="text-brand-gold font-mono shrink-0">
          {t.durationLabel}
        </span>
      </div>

      <div className="relative aspect-video w-full bg-brand-black">
        {!hasStarted ? (
          <div className="relative h-full w-full p-5 sm:p-8 bg-brand-black text-white grid md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-7 flex flex-col justify-between h-full">
              <div className="flex flex-wrap items-center gap-3">
                <img
                  src="/logo-fondo-negro.png"
                  alt="APAZ Talent Search"
                  className="h-11 sm:h-16 md:h-18 w-auto object-contain"
                />
                <span className="text-[8px] font-black uppercase tracking-[0.25em] text-[#2dd4bf] border-x border-white/20 px-2.5 py-1">
                  POWERED BY
                </span>
                <img
                  src="/elvia-logo.png"
                  alt="ELVIA"
                  className="h-6 sm:h-8 md:h-9 w-auto object-contain"
                />
              </div>

              <div className="my-auto space-y-3 py-2">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold block">
                  {t.posterTag}
                </span>
                <h3 className="text-base sm:text-2xl md:text-[26px] font-black uppercase tracking-tighter leading-[1.02]">
                  {t.posterTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={handleStart}
                    className="inline-flex items-center gap-2.5 bg-[#e8541a] text-white px-5 sm:px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#14b8a6] hover:text-[#0f172a] transition-colors cursor-pointer"
                  >
                    <Play className="size-3.5 fill-current" />
                    {t.play}
                  </button>
                  <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-white/65">
                    {t.posterSub}
                  </span>
                </div>
              </div>

              <div className="hidden md:block text-[9px] font-black uppercase tracking-[0.25em] text-white/45">
                APAZ TALENT SEARCH × ELVIA.LAT
              </div>
            </div>

            <div className="hidden md:flex md:col-span-5 h-full items-center justify-end">
              <button
                type="button"
                onClick={handleStart}
                aria-label={t.play}
                className="relative w-full max-w-[240px] aspect-square border-2 border-[#14b8a6] overflow-hidden cursor-pointer group text-left"
              >
                <img
                  src="/elvia-avatar.jpg"
                  alt="ELVIA"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <img
                    src="/elvia-logo.png"
                    alt="ELVIA"
                    className="h-5 w-auto object-contain"
                  />
                  <span className="w-10 h-10 bg-[#e8541a] flex items-center justify-center text-white group-hover:bg-[#14b8a6] group-hover:text-[#0f172a] transition-colors">
                    <Play className="size-4 fill-current" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        ) : isDirectVideo ? (
          <video
            ref={videoRef}
            src={resolvedUrl}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-contain bg-black"
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
