"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const HERO_VIDEO = "https://www.pexels.com/download/video/33560296/";
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
    video.play().catch(() => {
      // The poster/background image remains visible if autoplay is blocked.
    });
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
      onLoadedData={() => setReady(true)}
      onCanPlay={() => setReady(true)}
      onError={() => setReady(false)}
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 900ms ease",
        pointerEvents: "none",
      }}
    >
      <source src={HERO_VIDEO} type="video/mp4" />
    </video>,
    hero,
  );
}
