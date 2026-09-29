import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Instagram, Mail, Phone, Pause, Play, Volume2, VolumeX, Maximize2, Minimize2, MoreVertical, Menu, X } from "lucide-react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import tatamataLogo from "@/assets/tatamata-logo.png";
import zoneLogo from "@/assets/zone logo.jpg";
import gateLogo from "@/assets/gate club logo.jpg";
import outsorcyLogo from "@/assets/outsorcy logo.jpg";
import premiereProLogo from "@/assets/premiere-pro-logo.webp";
import afterEffectsLogo from "@/assets/after-effects-logo.webp";
import photoshopLogo from "@/assets/ps-logo.webp";

/* Use native video fullscreen on iOS, with element fullscreen as a fallback. */
type FullscreenTarget = HTMLElement & {
  webkitEnterFullscreen?: () => void;
  webkitRequestFullscreen?: () => Promise<void> | void;
};

const requestFullscreen = (
  el: FullscreenTarget | null,
  video: HTMLVideoElement | null = null,
  fallback: FullscreenTarget | null = null,
) => {
  if (!el && !video) return;
  const anyEl = (el ?? video) as FullscreenTarget;
  if (video && typeof video.webkitEnterFullscreen === "function") {
    video.webkitEnterFullscreen();
    return;
  }
  const request = anyEl.requestFullscreen ?? anyEl.webkitRequestFullscreen;
  if (typeof request === "function") {
    void Promise.resolve(request.call(anyEl)).catch(() => {
      if (fallback && fallback !== el) requestFullscreen(fallback);
    });
    return;
  }
  if (fallback && fallback !== el) requestFullscreen(fallback);
};

/*
  The browser-specific methods are intentionally accessed through the helper
  above so iOS Safari can use its native video player.
*/
/* const legacyFullscreenTarget = (el: HTMLVideoElement | null) => {
  if (!el) return;
  const anyEl = el as HTMLVideoElement & {
    webkitEnterFullscreen?: () => void;
    webkitRequestFullscreen?: () => Promise<void>;
  };
  const resumeIfNeeded = () => undefined;
  // iOS Safari — only the video element supports native fullscreen and
  // preserves the video's own aspect ratio (reels stay vertical).
  if (typeof anyEl.webkitEnterFullscreen === "function") {
    anyEl.webkitEnterFullscreen();
    resumeIfNeeded();
    return;
  }
  if (typeof anyEl.requestFullscreen === "function") {
    void anyEl.requestFullscreen().then(resumeIfNeeded).catch(() => undefined);
  } else if (typeof anyEl.webkitRequestFullscreen === "function") {
    void anyEl.webkitRequestFullscreen().then(resumeIfNeeded).catch(() => undefined);
  }
}; */

export const Route = createFileRoute("/")({
  component: Index,
});

const clients = [
  { name: "TataMata TV", logo: tatamataLogo },
  { name: "Zone Club", logo: zoneLogo },
  { name: "Gate Club", logo: gateLogo },
  { name: "Outsorcy", logo: outsorcyLogo },
];

const reels = [
  {
    id: "R1",
    title: "About Last Night · Moss × Kida",
    src: "/videos/About last night w- @moss.della x @kida.mp4", thumbnail: "/thumbnails/moss-kida.jpg",
  },
  {
    id: "R2",
    title: "Credins Unum Giveaway",
    src: "/videos/Credins_Unum_Giveaway_V1.mp4", thumbnail: "/thumbnails/credins.jpg",
  },
  {
    id: "R3",
    title: "Mercedes Video",
    src: "/videos/joni mercedes video.mp4", thumbnail: "/thumbnails/mercedes.jpg",
  },
  {
    id: "R4",
    title: "Last Night · Noizy",
    src: "/videos/Last night with @noizy, madness 🔥.mp4", thumbnail: "/thumbnails/noizy.jpg",
  },
  {
    id: "R5",
    title: "Monday Went Down Like This",
    src: "/videos/Monday went down like this 🔥.mp4", thumbnail: "/thumbnails/monday.jpg",
  },
  {
    id: "R6",
    title: "OutSorcy in 60 Seconds",
    src: "/videos/OutSorcy in 60 seconds_V3.mp4", thumbnail: "/thumbnails/outsorcy-60.jpg",
  },
  {
    id: "R7",
    title: "Outsorcy Video 04",
    src: "/videos/Outsorcy_Video 4_V4.mp4", thumbnail: "/thumbnails/outsorcy-04.jpg",
  },
  {
    id: "R8",
    title: "Zone · 19.09.25",
    src: "/videos/Zone_19.09.25_V2.mp4", thumbnail: "/thumbnails/zone-19.jpg",
  },
  {
    id: "R9",
    title: "Zone · Buta",
    src: "/videos/ZONE_BUTA_22.10.2025.mp4", thumbnail: "/thumbnails/zone-buta.jpg",
  },
];

const montages = [
  {
    id: "M1",
    kind: "Montage",
    title: "KFC",
    thumbnail: "https://vumbnail.com/1091737415.jpg",
    embedUrl: "https://player.vimeo.com/video/1091737415?h=ffc0b3357d&title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&pip=1&playsinline=1&dnt=1&api=1",
  },
  {
    id: "M2",
    kind: "Montage",
    title: "Sherreti",
    thumbnail: "https://vumbnail.com/1131285994.jpg",
    embedUrl: "https://player.vimeo.com/video/1131285994?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&pip=1&playsinline=1&dnt=1&api=1",
  },
  {
    id: "M3",
    kind: "Montage",
    title: "Credinsbank",
    thumbnail: "https://vumbnail.com/1037389172.jpg",
    embedUrl: "https://player.vimeo.com/video/1037389172?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&pip=1&playsinline=1&dnt=1&api=1",
  },
  {
    id: "M4",
    kind: "Montage",
    title: "KFC",
    thumbnail: "https://vumbnail.com/1036725682.jpg",
    embedUrl: "https://player.vimeo.com/video/1036725682?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&pip=1&playsinline=1&dnt=1&api=1",
  },
  {
    id: "M5",
    kind: "Montage",
    title: "Fortesa",
    thumbnail: "https://vumbnail.com/1106385885.jpg",
    embedUrl: "https://player.vimeo.com/video/1106385885?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&pip=1&playsinline=1&dnt=1&api=1",
  },
];

const timelines = [
  {
    id: "T1",
    kind: "Timeline",
    title: "Gate Club",
    src: "/videos/GATE TIMELINE JONKEY.mp4", thumbnail: "/thumbnails/gate-jonkey.jpg",
  },
  {
    id: "T2",
    kind: "Timeline",
    title: "Nora Cimili",
    src: "/videos/NoraCimili_Timeline.mp4", thumbnail: "/thumbnails/nora-cimili.jpg",
  },
];

const services = [
  { n: "01", t: "Social Media Reels", d: "Fast, hooky short-form edits for social. Rhythm-first, platform-ready and built to hold attention." },
  { n: "02", t: "Commercial Editing", d: "Brand-grade edits with pacing, structure and polish that make the product stand out." },
  { n: "03", t: "Music Videos", d: "Concept-driven cuts for artists — performance, story, atmosphere and attitude." },
  { n: "04", t: "Event / Nightlife Recaps", d: "High-energy edits that capture the crowd, the atmosphere and the moments people remember." },
  { n: "05", t: "Motion Graphics", d: "Titles, transitions and animated visuals that give your edit more personality and impact." },
  { n: "06", t: "Color Grading & Sound Design", d: "Final-pass polish through intentional color, clean audio and sound that makes every cut hit harder." },
];

function Marquee() {
  const line = "Reels  ·  Montages  ·  Sound Design  ·  Color Grading  ·  ";
  return (
    <div className="overflow-hidden border-y border-border bg-primary text-primary-foreground">
      <div className="marquee-track flex w-max whitespace-nowrap animate-[marquee_28s_linear_infinite] will-change-transform py-4 font-display text-3xl md:text-5xl tracking-wider">
        {Array.from({ length: 2 }).map((_, groupIndex) => (
          <div key={groupIndex} className="flex shrink-0">
            {Array.from({ length: 3 }).map((__, lineIndex) => (
              <span key={lineIndex} className="shrink-0 px-0">{line}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Filmstrip() {
  const stripOne = [...reels, ...reels];
  const stripTwo = [...montages, ...montages];
  const row = (label: string, items: { id: string; thumbnail?: string; src?: string }[], className: string, size: string, frame: "phone" | "cinema", gap = "gap-1.5") => (
    <div className="relative overflow-hidden rounded bg-transparent py-1.5">
      <span className="absolute inset-x-0 top-0.5 z-30 text-center font-mono text-xs font-semibold uppercase tracking-[0.25em] text-foreground">{label}</span>
      <div className="absolute left-0 right-0 top-1 flex justify-around px-1">{Array.from({ length: 10 }).map((_, i) => <span key={i} className="h-1 w-2 rounded-sm bg-background/80" />)}</div>
      <div className={`filmstrip-track filmstrip-fade mb-0.5 mt-7 flex w-max ${gap} will-change-transform ${className}`}>
        {items.map((item, i) => <div key={`${item.id}-${i}`} className={`relative shrink-0 overflow-hidden border-2 border-foreground/80 bg-black ${frame === "phone" ? "rounded-[0.8rem]" : "rounded-[0.55rem]"} ${size}`}><img src={item.thumbnail} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-90" />{frame === "phone" && <span className="absolute left-1/2 top-0.5 h-1 w-5 -translate-x-1/2 rounded-full bg-black" />}</div>)}
      </div>
      <div className="absolute bottom-1 left-0 right-0 flex justify-around px-1">{Array.from({ length: 10 }).map((_, i) => <span key={i} className="h-1 w-2 rounded-sm bg-background/80" />)}</div>
    </div>
  );
  return <div className="relative mt-8 flex w-full max-w-md items-center lg:mt-0 lg:h-full lg:max-w-[43.56rem]"><div className="w-full"><div className="space-y-3">{row("Reels", stripOne, "hero-filmstrip-left", "h-52 w-32 sm:h-52 sm:w-32", "phone")}{row("Montages", stripTwo, "hero-filmstrip-right", "h-36 w-64 sm:h-36 sm:w-64 md:h-[7.29rem] md:w-[12.96rem]", "cinema", "gap-2")}</div></div></div>;
}

function LandscapeVideoCard({
  item,
}: {
  item: { id: string; kind: string; title: string; src?: string; thumbnail?: string; embedUrl?: string };
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerFrameRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showCenterPlay, setShowCenterPlay] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (!playing) {
      setShowCenterPlay(true);
      return;
    }
    setShowCenterPlay(true);
    const timer = window.setTimeout(() => setShowCenterPlay(false), 2500);
    return () => window.clearTimeout(timer);
  }, [playing]);
  const sendVimeo = (method: string, value?: unknown) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ method, value }), "https://player.vimeo.com");
  };
  const toggleLocalVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };
  useEffect(() => {
    const onFullscreenChange = () => setFullScreen(document.fullscreenElement === playerFrameRef.current);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);
  const toggleFullscreen = () => {
    if (item.embedUrl) {
      const nextFullScreen = !fullScreen;
      sendVimeo(nextFullScreen ? "requestFullscreen" : "exitFullscreen");
      setFullScreen(nextFullScreen);
      return;
    }
    if (document.fullscreenElement) void document.exitFullscreen();
    else requestFullscreen(playerFrameRef.current, videoRef.current);
  };
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setIsMobile(media.matches);
    updateMobile();
    media.addEventListener("change", updateMobile);
    return () => media.removeEventListener("change", updateMobile);
  }, []);
  useEffect(() => {
    if (!item.embedUrl) return;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://player.vimeo.com") return;
      let data: { event?: string; method?: string; data?: { seconds?: number; duration?: number }; value?: number };
      try { data = typeof event.data === "string" ? JSON.parse(event.data) : event.data; } catch { return; }
      if (data.event === "play") setPlaying(true);
      if (data.event === "pause" || data.event === "finish") setPlaying(false);
      if (data.event === "fullscreenchange") {
        setFullScreen((data.data as unknown) === true);
        return;
      }
      if (data.method === "getDuration" && typeof data.value === "number") {
        setDuration(data.value);
      }
      if (data.method === "getCurrentTime" && typeof data.value === "number" && duration && !isScrubbing) {
        setProgress(Math.min(1, Math.max(0, data.value / duration)));
      }
      if (data.event === "timeupdate" && data.data) {
        const nextDuration = data.data.duration ?? duration;
        const nextSeconds = data.data.seconds;
        if (nextDuration) setDuration(nextDuration);
        if (!isScrubbing && nextDuration && typeof nextSeconds === "number") {
          setProgress(Math.min(1, Math.max(0, nextSeconds / nextDuration)));
        }
      }
    };
    window.addEventListener("message", onMessage);
    const pollCurrentTime = window.setInterval(() => {
      sendVimeo("getCurrentTime");
      if (!duration) sendVimeo("getDuration");
    }, 250);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearInterval(pollCurrentTime);
    };
  }, [item.embedUrl, isScrubbing, duration]);
  const formatTime = (value: number) => `${Math.floor(value / 60)}:${Math.floor(value % 60).toString().padStart(2, "0")}`;
  return (
    <div className="flex flex-col gap-4">
      <div ref={playerFrameRef} className="video-player-frame group relative aspect-video overflow-hidden rounded-[1.25rem] border-[5px] border-foreground/80 bg-black p-0 shadow-[0_0_0_1px_var(--color-border),0_18px_45px_rgba(0,0,0,0.45)]">
        <button type="button" aria-label="Fullscreen video" onClick={toggleFullscreen} className="absolute right-3 top-3 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded bg-black/60 text-white opacity-100 shadow-lg transition-opacity duration-200 hover:bg-black/75 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </button>
        {item.embedUrl ? (
          <iframe
            title={item.title}
            ref={iframeRef}
            src={`${item.embedUrl}&controls=0`}
            onLoad={() => {
              ["play", "pause", "finish", "timeupdate", "fullscreenchange"].forEach((event) => sendVimeo("addEventListener", event));
              window.setTimeout(() => sendVimeo("getDuration"), 300);
            }}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            webkitallowfullscreen="true"
            className="pointer-events-none absolute inset-0 z-10 block h-full w-full scale-[1.05] border-0 touch-auto md:pointer-events-auto"
          />
        ) : (
          <video
            ref={videoRef}
            src={item.src}
            poster={item.thumbnail}
            controls={false}
            preload="metadata"
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onTimeUpdate={(event) => setProgress(event.currentTarget.duration ? event.currentTarget.currentTime / event.currentTarget.duration : 0)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <button
            type="button"
            aria-label={playing ? "Pause video" : "Play video"}
            onClick={() => {
              if (item.embedUrl) {
                const nextPlaying = !playing;
                sendVimeo(nextPlaying ? "play" : "pause");
                setPlaying(nextPlaying);
              } else {
                const nextPlaying = videoRef.current?.paused ?? true;
                toggleLocalVideo();
                setPlaying(nextPlaying);
              }
            }}
            className={`pointer-events-auto flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-background/75 text-foreground shadow-lg backdrop-blur transition hover:scale-105 hover:bg-background/90 ${playing && !showCenterPlay ? "opacity-0 hover:opacity-100" : "opacity-100"}`}
          >
            {playing ? <Pause className="h-6 w-6" fill="currentColor" /> : <Play className="ml-0.5 h-6 w-6" fill="currentColor" />}
          </button>
        </div>
        <div className={`${fullScreen ? "flex" : "hidden"} video-controls absolute inset-x-0 bottom-0 z-30 flex-col gap-1 px-3 pb-2 pt-8 text-white sm:px-5 sm:pb-3`}>
          <input aria-label="Video progress" type="range" min="0" max="1" step="0.001" value={progress} style={{ "--progress": `${progress * 100}%` } as CSSProperties} onPointerDown={() => setIsScrubbing(true)} onPointerUp={() => setIsScrubbing(false)} onTouchEnd={() => setIsScrubbing(false)} onChange={(event) => { const next = Number(event.target.value); setProgress(next); if (item.embedUrl) { if (duration) sendVimeo("setCurrentTime", next * duration); } else if (videoRef.current && duration) videoRef.current.currentTime = next * duration; }} className="video-progress order-first w-full cursor-pointer touch-none" />
          <div className="flex w-full items-center gap-3 sm:gap-5">
          <button type="button" aria-label={playing ? "Pause video" : "Play video"} onClick={() => item.embedUrl ? (sendVimeo(playing ? "pause" : "play"), setPlaying(!playing)) : toggleLocalVideo()} className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center bg-transparent text-white transition hover:text-primary">
            {playing ? <Pause className="h-6 w-6" fill="currentColor" /> : <Play className="ml-0.5 h-6 w-6" fill="currentColor" />}
          </button>
          <span className="shrink-0 font-mono text-[11px] tabular-nums">{duration ? `${formatTime(progress * duration)} / ${formatTime(duration)}` : "0:00 / 0:00"}</span>
          <div className="flex-1" />
          <button type="button" aria-label={muted ? "Unmute video" : "Mute video"} onClick={() => { const next = !muted; setMuted(next); if (item.embedUrl) sendVimeo("setVolume", next ? 0 : 1); else if (videoRef.current) videoRef.current.muted = next; }} className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center bg-transparent transition hover:text-primary">
            {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </button>
          <button type="button" aria-label={fullScreen ? "Exit fullscreen" : "Fullscreen"} onClick={toggleFullscreen} className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center bg-transparent transition hover:text-white/70">{fullScreen ? <Minimize2 className="h-6 w-6" /> : <Maximize2 className="h-6 w-6" />}</button>
          <button type="button" aria-label="More video options" className="flex h-8 w-6 shrink-0 cursor-pointer items-center justify-center bg-transparent text-xl leading-none transition hover:text-primary">⋮</button>
          </div>
        </div>
      </div>
        <div className="text-center">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {item.kind}
        </div>
        <div className="mt-1 font-display text-2xl md:text-3xl">{item.title}</div>
      </div>
    </div>
  );
}

function LandscapeCarousel({
  items,
}: {
  items: { id: string; kind: string; title: string; src?: string; thumbnail?: string; embedUrl?: string }[];
}) {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full">
      <CarouselContent className="-ml-4 touch-pan-y">
        {items.map((it) => (
          <CarouselItem key={it.id} className="pl-4 md:basis-2/3 lg:basis-1/2">
            <LandscapeVideoCard item={it} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-4" />
      <CarouselNext className="hidden md:flex -right-4" />
    </Carousel>
  );
}

/* function GradientVideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const gradients = ["#182b54", "#5b202e", "#173e4a", "#43235a", "#6a341f", "#143d35", "#263868", "#552d47", "#1f4350"];
  const visibleRadius = 3;

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + reels.length) % reels.length);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-md border border-border px-4 py-10 sm:px-8 md:py-14"
      style={{ background: `radial-gradient(circle at 50% 45%, ${gradients[activeIndex]} 0%, transparent 62%), var(--color-background)` }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
      tabIndex={0}
      aria-label="Reels video carousel"
    >
      <div className="pointer-events-none absolute inset-0 bg-background/45 backdrop-blur-3xl" />
      <div className="relative mx-auto h-[24rem] max-w-5xl sm:h-[28rem] md:h-[34rem]">
        {reels.map((reel, index) => {
          let position = index - activeIndex;
          if (position > reels.length / 2) position -= reels.length;
          if (position < -reels.length / 2) position += reels.length;
          const visible = Math.abs(position) <= visibleRadius;
          const scale = position === 0 ? 1 : Math.max(0.72, 1 - Math.abs(position) * 0.09);
          const opacity = visible ? Math.max(0.25, 1 - Math.abs(position) * 0.2) : 0;

          return (
            <button
              type="button"
              key={reel.id}
              onClick={() => setActiveIndex(index)}
              className="absolute left-1/2 top-1/2 w-36 -translate-y-1/2 overflow-hidden rounded-md border border-white/20 bg-black shadow-2xl transition-[transform,opacity,filter] duration-700 ease-out sm:w-44 md:w-56"
              style={{
                transform: `translateX(calc(-50% + ${position * 145}px)) translateY(-50%) perspective(900px) rotateY(${position * -10}deg) rotateZ(${position * 4}deg) scale(${scale}) translateZ(${position === 0 ? 80 : -Math.abs(position) * 30}px)`,
                opacity,
                zIndex: 10 - Math.abs(position),
                filter: position === 0 ? "none" : "brightness(0.72) saturate(0.8)",
                pointerEvents: visible ? "auto" : "none",
              }}
            >
              <video src={reel.src} poster={reel.thumbnail} muted loop playsInline autoPlay={position === 0} className="aspect-[9/16] w-full object-cover" />
              <span className="absolute inset-x-2 bottom-2 truncate bg-black/55 px-2 py-1 text-left font-mono text-[9px] uppercase tracking-widest text-white">
                {reel.id} · {reel.title}
              </span>
            </button>
          );
        })}
      </div>
      <button type="button" aria-label="Previous reel" onClick={() => move(-1)} className="absolute left-3 top-1/2 z-20 -translate-y-1/2 border border-foreground/40 bg-background/70 px-3 py-2 font-mono text-xs transition hover:bg-foreground hover:text-background">←</button>
      <button type="button" aria-label="Next reel" onClick={() => move(1)} className="absolute right-3 top-1/2 z-20 -translate-y-1/2 border border-foreground/40 bg-background/70 px-3 py-2 font-mono text-xs transition hover:bg-foreground hover:text-background">→</button>
      <div className="relative z-20 mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Reels · drag with arrows or click a card</div>
    </div>
  );
}

} */

function ReelCard({ reel }: { reel: (typeof reels)[number] }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerFrameRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showCenterPlay, setShowCenterPlay] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  useEffect(() => {
    if (!playing) {
      setShowCenterPlay(true);
      return;
    }
    setShowCenterPlay(true);
    const timer = window.setTimeout(() => setShowCenterPlay(false), 2500);
    return () => window.clearTimeout(timer);
  }, [playing]);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setIsMobile(media.matches);
    updateMobile();
    media.addEventListener("change", updateMobile);
    return () => media.removeEventListener("change", updateMobile);
  }, []);
  useEffect(() => {
    const onFullscreenChange = () => setFullScreen(document.fullscreenElement === playerFrameRef.current);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);
  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else requestFullscreen(playerFrameRef.current, videoRef.current);
  };
  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-mono text-[10px] uppercase tracking-widest text-primary">{reel.id}</div>
      <div ref={playerFrameRef} className="video-player-frame group relative aspect-[3/5] overflow-hidden rounded-[2rem] border-[5px] border-foreground/80 bg-black p-0 shadow-[0_0_0_1px_var(--color-border),0_18px_35px_rgba(0,0,0,0.35)]">
      <button type="button" aria-label="Fullscreen reel" onClick={toggleFullscreen} className="absolute right-3 top-3 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded bg-black/60 text-white opacity-100 shadow-lg transition-opacity duration-200 hover:bg-black/75 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100">
        <Maximize2 className="h-4 w-4" />
      </button>
      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.thumbnail}
        loop
        controls={false}
        preload="metadata"
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => { if (!isScrubbing) setProgress(event.currentTarget.duration ? event.currentTarget.currentTime / event.currentTarget.duration : 0); }}
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <button
          type="button"
          aria-label={playing ? "Pause reel" : "Play reel"}
          onClick={() => {
            const nextPlaying = videoRef.current?.paused ?? true;
            toggle();
            setPlaying(nextPlaying);
          }}
          className={`pointer-events-auto flex h-14 w-14 cursor-pointer items-center justify-center bg-transparent text-white shadow-none transition hover:scale-105 hover:text-white/80 ${playing && !showCenterPlay ? "opacity-0 hover:opacity-100" : "opacity-100"}`}
        >
          {playing ? <Pause className="h-6 w-6" fill="currentColor" /> : <Play className="ml-0.5 h-6 w-6" fill="currentColor" />}
        </button>
      </div>
      <div className={`${fullScreen ? "flex" : "hidden"} video-controls absolute inset-x-0 bottom-0 z-20 flex-col gap-1 px-3 pb-2 pt-8 text-white sm:px-5 sm:pb-3`}>
        <input aria-label="Reel progress" type="range" min="0" max="1" step="0.001" value={progress} style={{ "--progress": `${progress * 100}%` } as CSSProperties} onPointerDown={() => setIsScrubbing(true)} onPointerUp={() => setIsScrubbing(false)} onTouchEnd={() => setIsScrubbing(false)} onChange={(event) => { const next = Number(event.target.value); setProgress(next); if (videoRef.current && duration) videoRef.current.currentTime = next * duration; }} className="video-progress order-first w-full cursor-pointer touch-none" />
        <div className="flex w-full items-center gap-3 sm:gap-5">
        <button type="button" aria-label={playing ? "Pause reel" : "Play reel"} onClick={toggle} className="flex h-10 w-10 shrink-0 items-center justify-center bg-transparent text-white transition hover:text-white/70">
          {playing ? <Pause className="h-6 w-6" fill="currentColor" /> : <Play className="ml-0.5 h-6 w-6" fill="currentColor" />}
        </button>
        <span className="font-mono text-[11px] tabular-nums text-white">{duration ? `${Math.floor(progress * duration / 60)}:${Math.floor(progress * duration % 60).toString().padStart(2, "0")} / ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")}` : "0:00 / 0:00"}</span>
        <div className="flex-1" />
        <button type="button" aria-label={muted ? "Unmute reel" : "Mute reel"} onClick={() => { const next = !muted; setMuted(next); if (videoRef.current) videoRef.current.muted = next; }} className="flex h-10 w-10 shrink-0 items-center justify-center bg-transparent text-white transition hover:text-white/70">
          {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </button>
        <button type="button" aria-label={fullScreen ? "Exit fullscreen" : "Fullscreen"} onClick={toggleFullscreen} className="flex h-10 w-10 shrink-0 items-center justify-center bg-transparent text-white transition hover:text-white/70">{fullScreen ? <Minimize2 className="h-6 w-6" /> : <Maximize2 className="h-6 w-6" />}</button>
        <button type="button" aria-label="More video options" className="flex h-8 w-6 shrink-0 items-center justify-center bg-transparent text-white transition hover:text-white/70"><MoreVertical className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-20 h-1 w-16 -translate-x-1/2 rounded-full bg-foreground/75" />
      </div>
      <div className="text-center">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Reel</div>
        <div className="mt-2 font-display text-2xl leading-none">{reel.title}</div>
      </div>
    </div>
  );
}

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const copy = async (value: string, label: string) => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      if (!copied) {
        toast.error(`Couldn't copy ${label.toLowerCase()}`);
        return;
      }
    }
    toast.success(`${label} copied to clipboard`, { description: value });
  };
  const submitProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitting(true);
    const form = event.currentTarget;
    try {
      const response = await fetch("https://formspree.io/f/xaewzabr", { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      if (!response.ok) throw new Error();
      form.reset();
      setProjectFormOpen(false);
      toast.success("Message sent", { description: "Thanks — I’ll get back to you soon." });
    } catch {
      toast.error("Message could not be sent", { description: "Please try again or email me directly." });
    } finally {
      setFormSubmitting(false);
    }
  };
  return (
    <div className="site-shell min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground">
      <style>{`
        @keyframes marquee { to { transform: translateX(-50%); } }
        @keyframes editor-cursor { 0%, 100% { transform: translate(-90px, 18px); } 25% { transform: translate(70px, -12px); } 50% { transform: translate(120px, 22px); } 75% { transform: translate(-20px, -8px); } }
        @keyframes motion-blink { 0%, 45%, 100% { opacity: 1; } 50%, 90% { opacity: .35; } }
        .video-controls { background: linear-gradient(to top, rgba(0,0,0,.92), rgba(0,0,0,.5) 58%, transparent); }
        .video-progress { appearance: none; height: 5px; border-radius: 999px; outline: none; background: linear-gradient(to right, #fff 0%, #fff var(--progress, 0%), rgba(255,255,255,.45) var(--progress, 0%), rgba(255,255,255,.45) 100%); }
        .video-progress::-webkit-slider-thumb { appearance: none; width: 13px; height: 13px; border-radius: 50%; background: #fff; }
        .video-progress::-moz-range-thumb { width: 13px; height: 13px; border: 0; border-radius: 50%; background: #fff; }
        .video-progress::-moz-range-track { height: 5px; border-radius: 999px; background: rgba(255,255,255,.45); }
        video:fullscreen { object-fit: contain !important; background: #000; width: 100%; height: 100%; }
        video:-webkit-full-screen { object-fit: contain !important; background: #000; width: 100%; height: 100%; }
        video:-moz-full-screen { object-fit: contain !important; background: #000; }
        .video-player-frame:fullscreen { width: 100vw; height: 100vh; aspect-ratio: auto; background: #000; border: 0; border-radius: 0; }
        .video-player-frame:-webkit-full-screen { width: 100vw; height: 100vh; aspect-ratio: auto; background: #000; border: 0; border-radius: 0; }
        .video-player-frame:fullscreen iframe { height: 100%; width: 100%; }
        .video-player-frame:-webkit-full-screen iframe { height: 100%; width: 100%; }
        .video-player-frame:fullscreen video { height: 100%; width: 100%; object-fit: contain; background: #000; }
        .video-player-frame:-webkit-full-screen video { height: 100%; width: 100%; object-fit: contain; background: #000; }
      `}</style>

      {/* NAV */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-5 sm:px-6 md:px-10 py-4 md:py-5">
        <a href="#top" aria-label="Jon Nitaj home" className="flex h-10 w-10 items-center justify-center overflow-hidden sm:h-12 sm:w-12">
          <img src="/joni-logo.png" alt="Jon Nitaj logo" className="h-full w-full object-contain" />
        </a>
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          <a href="#reels" className="hover:text-primary transition">Reels</a>
          <a href="#montages" className="hover:text-primary transition">Montages</a>
          <a href="#timeline" className="hover:text-primary transition">Timeline</a>
          <a href="#services" className="hover:text-primary transition">Services</a>
          <a href="#about" className="hover:text-primary transition">About</a>
          <a href="#contact" className="hover:text-primary transition">Contact</a>
        </nav>
        <a
          href="#contact"
          className="font-mono text-xs uppercase tracking-widest bg-primary text-white px-4 py-2 hover:bg-foreground hover:text-background transition"
        >
          Hire me
        </a>
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="md:hidden flex h-10 w-10 items-center justify-center border border-border hover:border-foreground transition"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </div>
        <nav
          aria-hidden={!mobileMenuOpen}
          className={`mobile-menu-panel ${!mobileMenuOpen ? "is-closing" : ""} md:hidden overflow-hidden px-6 font-mono text-xs uppercase tracking-widest transition-[max-height,opacity,transform,padding] duration-700 ease-in-out ${mobileMenuOpen ? "max-h-96 border-t border-border py-4 translate-y-0 opacity-100" : "pointer-events-none max-h-0 border-t-0 py-0 -translate-y-2 opacity-0"}`}
        >
            {[
              ["Reels", "#reels"],
              ["Services", "#services"],
              ["About", "#about"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block border-b border-border py-4 last:border-b-0 hover:text-primary transition"
              >
                {label}
              </a>
            ))}
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative flex min-h-[calc(100svh-5rem)] flex-col px-5 sm:px-6 md:min-h-0 md:px-14 lg:px-16 pt-10 sm:pt-16 md:pt-28 pb-16 md:pb-20">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          Available for freelance · Prishtina / Remote
        </div>
        <div className="mt-8 md:mt-10 grid min-w-0 grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-center">
          <h1 className="md:col-span-6 font-display text-[20vw] sm:text-[18vw] md:text-[12vw] leading-[0.82] tracking-tight">
            VIDEO
            <br />
            <span className="italic font-serif text-primary">in</span> MOTION.
          </h1>
          <div className="min-w-0 md:col-span-6 flex justify-center md:justify-start md:pl-4">
            <Filmstrip />
          </div>
        </div>
        <div className="mt-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 md:col-start-7 max-w-xl space-y-6">
            <div className="flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:items-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Editing stack</span>
              <span className="inline-flex w-full items-center gap-2 rounded bg-[#9999FF]/15 px-2.5 py-1 font-mono text-xs font-bold text-[#9999FF] ring-1 ring-inset ring-[#9999FF]/30 md:w-auto md:py-1.5">
                <img src={premiereProLogo} alt="Premiere Pro logo" className="h-8 w-8 shrink-0 scale-125 rounded-[7px] object-cover" />
                Premiere Pro
              </span>
              <span className="inline-flex w-full items-center gap-2 rounded bg-[#C08CF8]/15 px-2.5 py-1 font-mono text-xs font-bold text-[#C08CF8] ring-1 ring-inset ring-[#C08CF8]/30 md:w-auto md:py-1.5">
                <img src={afterEffectsLogo} alt="After Effects logo" className="h-8 w-8 shrink-0 scale-125 rounded-[7px] object-cover" />
                After Effects
              </span>
              <span className="inline-flex w-full items-center gap-2 rounded bg-[#31A8FF]/15 px-2.5 py-1 font-mono text-xs font-bold text-[#31A8FF] ring-1 ring-inset ring-[#31A8FF]/30 md:w-auto md:py-1.5">
                <img src={photoshopLogo} alt="Photoshop logo" className="h-8 w-8 shrink-0 scale-125 rounded-[7px] object-cover" />
                Photoshop
              </span>
            </div>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
              I&apos;m <span className="text-foreground">Jon Nitaj</span> — a video editor cutting reels, commercials and music videos for brands, clubs and artists. I turn hours of footage into seconds that hit.
            </p>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest">
          <a
            href="#reels"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("reels")?.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.replaceState(null, "", "#reels");
            }}
            className="border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition"
          >
            See the reels ↓
          </a>
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.replaceState(null, "", "#contact");
            }}
            className="px-5 py-3 text-muted-foreground hover:text-foreground transition"
          >
            Start a project →
          </a>
        </div>
      </section>

      <Marquee />

      {/* CLIENTS */}
      <section className="px-5 sm:px-6 md:px-10 py-8 md:py-12">
        <div className="flex items-baseline justify-between border-b border-border pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Trusted by</span>
          <span className="font-mono text-xs text-muted-foreground">/ 04</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border border-b border-border">
          {clients.map((c) => (
            <div
              key={c.name}
              className="py-12 px-6 flex flex-col items-center justify-center gap-4 hover:bg-secondary transition"
            >
              <img
                src={c.logo}
                alt={`${c.name} logo`}
                loading="lazy"
                className="h-16 md:h-20 w-auto object-contain opacity-90"
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* REELS */}
      <section id="reels" className="scroll-mt-20 px-5 sm:px-6 md:px-14 lg:px-16 py-8 md:py-12 border-t border-border">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">/ Reels</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-7xl">Vertical Cuts</h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground hidden md:block">↳ tap to play with sound</span>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {reels.map((r) => (
              <CarouselItem
                key={r.id}
                className="pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="mx-auto w-full lg:max-w-[22rem]">
                  <ReelCard reel={r} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </section>

      {/* MONTAGES */}
      <section id="montages" className="px-5 sm:px-6 md:px-14 lg:px-16 py-8 md:py-12 border-t border-border">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">/ Montage</span>
            <h2 className="mt-3 max-w-[12ch] font-display text-4xl sm:text-5xl md:max-w-none md:text-7xl leading-[0.95]">Montages & Sound Design</h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground hidden md:block">↳ press play</span>
        </div>
        <LandscapeCarousel items={montages} />
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="px-5 sm:px-6 md:px-14 lg:px-16 py-8 md:py-12 border-t border-border">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">/ Timeline</span>
            <h2 className="mt-3 max-w-[11ch] font-display text-4xl sm:text-5xl md:max-w-none md:text-7xl leading-[0.95]">Timeline Breakdowns</h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground hidden md:block">↳ swipe through</span>
        </div>
        <LandscapeCarousel items={timelines} />
      </section>

      {/* SERVICES */}
      <section id="services" className="px-5 sm:px-6 md:px-10 py-8 md:py-12 bg-secondary">
        <div className="flex items-baseline justify-between border-b border-border pb-4">
          <h2 className="font-display text-5xl md:text-7xl">Services</h2>
          <span className="font-mono text-xs text-muted-foreground">/ 06</span>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border mt-px">
          {services.map((s) => (
            <div key={s.n} className="min-h-[170px] bg-secondary p-6 md:min-h-[280px] md:p-10 flex flex-col justify-between hover:bg-background transition">
              <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
              <div className="min-w-0">
                <h3 className="break-words font-display text-3xl sm:text-4xl md:text-5xl leading-[0.95]">{s.t}</h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-5 sm:px-6 md:px-10 py-12 md:py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">About</span>
            <h2 className="mt-4 text-center font-display text-8xl leading-[0.8] md:text-[10rem]">4+</h2>
            <p className="mt-4 text-center font-display text-4xl leading-none md:text-6xl">
              <span className="text-foreground">years</span>{" "}
              <span className="italic font-serif text-primary">of</span>{" "}
              <span className="ml-2 text-foreground">experience</span>
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-6 text-lg text-muted-foreground">
            <p>
              Based between the studio and the club floor, I&apos;ve edited work for
              <span className="text-foreground"> TatamataTV</span>,
              <span className="text-foreground"> Zone Club</span>,
              <span className="text-foreground"> Gate Club</span> and
              <span className="text-foreground"> Outsorcy</span>,
              plus independent artists and agencies.
            </p>
            <p>
              My edits are built on timing — where the frame lands, where the beat
              drops, where the eye rests. From 15-second reels to full-length
              commercials and music videos, the goal is the same: make it feel inevitable.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div><div className="font-display text-4xl text-foreground">100+</div><div className="font-mono text-[10px] uppercase tracking-widest">videos shipped</div></div>
              <div><div className="font-display text-4xl text-foreground">4</div><div className="font-mono text-[10px] uppercase tracking-widest">recurring clients</div></div>
              <div><div className="font-display text-4xl text-foreground">24h</div><div className="font-mono text-[10px] uppercase tracking-widest">reel turnaround</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-20 px-6 sm:px-8 md:px-16 lg:px-20 py-12 md:py-16 border-t border-border">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Contact</span>
        <div className="mt-4 grid items-end gap-6 md:grid-cols-12">
          <h2 className="font-display text-[14vw] leading-[0.9] md:col-span-6 md:text-[8vw]">
            Let&apos;s <span className="italic font-serif text-primary">edit</span>
            <br />something.
          </h2>
          <div className={`relative overflow-hidden rounded-md border border-border p-6 transition-[height] duration-700 ease-in-out md:col-span-5 md:col-start-7 md:h-[280px] md:p-6 ${projectFormOpen ? "h-[420px] sm:h-[380px]" : "h-[280px]"}`}>
            <div
              style={{
                transform: projectFormOpen ? "translateX(-100%)" : "translateX(0)",
                opacity: projectFormOpen ? 0 : 1,
                transition: "transform 700ms ease-in-out, opacity 700ms ease-in-out",
              }}
              className={`contact-card-panel absolute inset-0 overflow-hidden p-6 md:p-6 ${projectFormOpen ? "pointer-events-none" : ""}`}
            >
              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Start a project</span>
                  <p className="mt-5 max-w-sm text-lg text-muted-foreground">Have something in mind? Tell me what you&apos;re working on and let&apos;s make it move.</p>
                </div>
                <button type="button" onClick={() => setProjectFormOpen(true)} className="self-start cursor-pointer border border-foreground px-5 py-3 font-mono text-xs uppercase tracking-widest transition hover:bg-foreground hover:text-background">Start a project →</button>
              </div>
            </div>
            <div
              style={{
                transform: projectFormOpen ? "translateX(0)" : "translateX(100%)",
                opacity: projectFormOpen ? 1 : 0,
                transition: "transform 700ms ease-in-out, opacity 700ms ease-in-out",
              }}
              className={`contact-card-panel absolute inset-0 overflow-hidden p-6 md:p-6 ${projectFormOpen ? "" : "pointer-events-none"}`}
            >
              <div className="pt-1">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Project details</span>
                  <button type="button" onClick={() => setProjectFormOpen(false)} className="relative z-10 min-h-10 shrink-0 cursor-pointer border border-border px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:border-foreground hover:text-foreground md:min-h-0 md:border-0 md:px-0 md:py-0">Close ×</button>
                </div>
                <form onSubmit={submitProject} className="mt-3 grid grid-cols-1 gap-2 md:mt-2 md:grid-cols-2 md:gap-1.5">
                  <input required name="name" placeholder="Name" aria-label="Name" className="min-w-0 rounded-sm border border-border bg-secondary px-3 py-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-primary md:px-2.5 md:py-1.5 md:text-sm" />
                  <input required type="email" name="email" placeholder="Email" aria-label="Email" className="min-w-0 rounded-sm border border-border bg-secondary px-3 py-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-primary md:px-2.5 md:py-1.5 md:text-sm" />
                  <select required name="project_type" defaultValue="" aria-label="Project type" className="min-w-0 cursor-pointer rounded-sm border border-border bg-secondary px-3 py-3 text-base text-foreground outline-none transition hover:border-primary focus:border-primary md:col-span-2 md:px-2.5 md:py-1.5 md:text-sm"><option value="" disabled>Project type</option><option>Social media reels</option><option>Commercial editing</option><option>Music video</option><option>Event / nightlife recap</option><option>Motion graphics</option><option>Color grading & sound design</option><option>Other project</option></select>
                  <textarea required name="message" rows={3} placeholder="Tell me about the project" aria-label="Message" className="min-w-0 resize-none rounded-sm border border-border bg-secondary px-3 py-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-primary md:col-span-2 md:px-2.5 md:py-1.5 md:text-sm" />
                  <input type="hidden" name="_subject" value="New project inquiry — Jon Nitaj" />
                  <button disabled={formSubmitting} type="submit" className="min-h-12 cursor-pointer rounded-sm bg-primary px-5 py-3 font-mono text-sm uppercase leading-none tracking-widest text-white transition hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2 md:min-h-9 md:py-2 md:text-xs">{formSubmitting ? "Sending…" : "Send inquiry →"}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-10 border-t border-border pt-10">
          <button
            type="button"
            onClick={() => copy("nitajjon@gmail.com", "Email")}
            className="group block cursor-pointer text-left transition hover:text-primary"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Mail className="h-3 w-3" /> Email · click to copy
            </div>
            <div className="mt-2 font-display text-3xl md:text-5xl group-hover:text-primary transition break-all">
              nitajjon@gmail.com
            </div>
          </button>
          <button
            type="button"
            onClick={() => copy("+383 44 106 655", "Phone")}
            className="group block cursor-pointer text-left transition hover:text-primary"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Phone className="h-3 w-3" /> Phone · click to copy
            </div>
            <div className="mt-2 font-display text-3xl md:text-5xl group-hover:text-primary transition">
              +383 44 106 655
            </div>
          </button>
          <a
            href="https://www.instagram.com/jonnitaj_/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="group block cursor-pointer"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Instagram className="h-3 w-3" /> Instagram
            </div>
            <div className="mt-2 font-display text-3xl md:text-5xl group-hover:text-primary transition">
              @jonnitaj_
            </div>
          </a>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>© {new Date().getFullYear()} Jon Nitaj · Video Editor</span>
        <span>Prishtina — Kosovo</span>
      </footer>
    </div>
  );
}
