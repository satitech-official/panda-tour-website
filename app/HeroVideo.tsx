"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const HERO_VIDEO = "https://upload.wikimedia.org/wikipedia/commons/b/be/Jammu_and_Kashmir_-_India.webm";
const HERO_POSTER = "https://images.pexels.com/photos/33466692/pexels-photo-33466692.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000";

export default function HeroVideo() {
  const [hero, setHero] = useState<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setHero(document.querySelector<HTMLElement>(".hero"));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const start = () => {
      video.play().catch(() => {
        // Existing hero image remains as a fallback if autoplay is blocked.
      });
    };

    start();
    document.addEventListener("visibilitychange", start);
    return () => document.removeEventListener("visibilitychange", start);
  }, [hero]);

  if (!hero) return null;

  return createPortal(
    <video
      ref={videoRef}
      className="hero-image hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={HERO_POSTER}
      aria-hidden="true"
      tabIndex={-1}
      onLoadedMetadata={() => videoRef.current?.play().catch(() => undefined)}
      onLoadedData={() => setReady(true)}
      onCanPlay={() => setReady(true)}
      onPlaying={() => setReady(true)}
      onError={() => setReady(false)}
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 700ms ease",
        pointerEvents: "none",
        zIndex: -3,
      }}
    >
      <source src={HERO_VIDEO} type="video/webm" />
    </video>,
    hero,
  );
}
