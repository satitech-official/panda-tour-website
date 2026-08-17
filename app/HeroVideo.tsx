"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const DESKTOP_VIDEO = "https://upload.wikimedia.org/wikipedia/commons/b/be/Jammu_and_Kashmir_-_India.webm";
const MOBILE_VIDEO = "https://upload.wikimedia.org/wikipedia/commons/4/45/Dal_Lake_Srinagar.webm";
const HERO_POSTER = "https://images.pexels.com/photos/33466692/pexels-photo-33466692.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000";

export default function HeroVideo() {
  const [hero, setHero] = useState<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setHero(document.querySelector<HTMLElement>(".hero"));

    const media = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsMobile(media.matches);
    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  const videoSrc = isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setReady(false);
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.load();

    const start = () => {
      if (document.visibilityState !== "visible") return;
      video.play().catch(() => {
        // Keep the existing hero poster visible if the browser blocks autoplay.
      });
    };

    start();
    document.addEventListener("visibilitychange", start);
    return () => document.removeEventListener("visibilitychange", start);
  }, [videoSrc, hero]);

  if (!hero) return null;

  return createPortal(
    <video
      key={videoSrc}
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
        transition: "opacity 650ms ease",
        pointerEvents: "none",
        zIndex: -3,
        animation: "none",
        objectFit: "cover",
        objectPosition: isMobile ? "50% 50%" : "50% 52%",
        transform: isMobile ? "scale(1.015)" : "none",
      }}
    >
      <source src={videoSrc} type="video/webm" />
    </video>,
    hero,
  );
}
