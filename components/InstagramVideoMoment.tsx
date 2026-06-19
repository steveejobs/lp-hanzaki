"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function InstagramVideoMoment({ videoSrc, posterSrc }: { videoSrc: string; posterSrc: string }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .35 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (visible && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) void video.play().catch(() => undefined);
    else video.pause();
  }, [visible]);
  return <section ref={sectionRef} className={`ig-video-reveal mt-6 rounded-[26px] border border-black/10 bg-white p-3 ${visible ? "is-visible" : ""}`}>
    <div className="grid grid-cols-[.82fr_1.18fr] items-center gap-3">
      <div className="px-1"><p className="text-[.65rem] font-black uppercase tracking-wide text-[var(--hanzaki-red)]">HANZAKI À NOITE</p><h2 className="mt-2 text-xl font-black leading-tight">Uma noite feita para aproveitar.</h2><div className="mt-4 h-px w-14 bg-[var(--hanzaki-red)]" /></div>
      <div className="relative ml-auto aspect-[9/16] w-full max-w-[192px] overflow-hidden rounded-[24px] bg-neutral-950"><Image src={posterSrc} alt="" fill sizes="192px" className="object-cover" /><video ref={videoRef} muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover"><source src={videoSrc} type="video/mp4" /></video></div>
    </div>
  </section>;
}
