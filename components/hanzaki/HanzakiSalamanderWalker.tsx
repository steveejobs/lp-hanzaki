"use client";

import type { CSSProperties, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type WalkerPosition = {
  x: number;
  y: number;
  ready: boolean;
};

type HanzakiSalamanderWalkerProps = {
  activeColor: string;
  activeIndex: number;
  cardRefs: RefObject<(HTMLButtonElement | null)[]>;
  containerRef: RefObject<HTMLDivElement | null>;
};

export function HanzakiSalamanderWalker({
  activeColor,
  activeIndex,
  cardRefs,
  containerRef,
}: HanzakiSalamanderWalkerProps) {
  const [position, setPosition] = useState<WalkerPosition>({
    x: 0,
    y: 0,
    ready: false,
  });
  const [isWalking, setIsWalking] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const frameRef = useRef<number | null>(null);
  const walkTimerRef = useRef<number | null>(null);
  const previousXRef = useRef(0);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const card = cardRefs.current[activeIndex];

    if (!container || !card) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    const walkerWidth = isMobile ? 118 : 154;
    const walkerOffset = isMobile ? 70 : 88;
    const rawX = cardRect.left - containerRect.left + cardRect.width / 2 - walkerWidth / 2;
    const maxX = Math.max(containerRect.width - walkerWidth, 0);
    const nextX = Math.min(Math.max(rawX, 0), maxX);
    const nextY = Math.max(cardRect.top - containerRect.top - walkerOffset, 0);
    const movement = Math.abs(nextX - previousXRef.current);

    previousXRef.current = nextX;
    setPosition({ x: nextX, y: nextY, ready: true });

    if (!reducedMotion && movement > 4) {
      setIsWalking(true);
      if (walkTimerRef.current) {
        window.clearTimeout(walkTimerRef.current);
      }
      walkTimerRef.current = window.setTimeout(() => setIsWalking(false), isMobile ? 720 : 900);
    }
  }, [activeIndex, cardRefs, containerRef, reducedMotion]);

  const scheduleMeasure = useCallback(() => {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      measure();
    });
  }, [measure]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => setReducedMotion(mediaQuery.matches);

    handleMotionChange();
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    scheduleMeasure();
  }, [activeIndex, scheduleMeasure]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(container);

    for (const card of cardRefs.current) {
      if (card) {
        observer.observe(card);
      }
    }

    window.addEventListener("resize", scheduleMeasure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      if (walkTimerRef.current) {
        window.clearTimeout(walkTimerRef.current);
      }
    };
  }, [cardRefs, containerRef, scheduleMeasure]);

  const style = {
    "--salamander-fill": "#ffffff",
    "--salamander-accent": activeColor,
    "--salamander-glow": activeColor,
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={[
        "hanzaki-page-salamander",
        position.ready ? "is-ready" : "",
        isWalking ? "is-walking" : "",
      ].join(" ")}
      style={style}
    >
      <div className="hanzaki-page-salamander-aura" />
      <svg
        className="hanzaki-page-salamander-svg"
        focusable="false"
        viewBox="0 0 220 96"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="tail" className="hanzaki-page-salamander-tail">
          <path
            d="M135.8 49.2C158.6 46 178.8 35 197.5 20.2c5-4 10.8 1.6 7 6.8-12.3 17-28.1 30.8-49.9 36.7-7.2 1.9-15.6-.5-20.5-5.8-2.8-3-2.3-8 1.7-8.7Z"
            fill="var(--salamander-fill)"
          />
          <path
            d="M151 54.2c17.2-4.3 31.4-13.9 43.1-26"
            className="hanzaki-page-salamander-line"
          />
        </g>

        <g id="leg-back-left" className="hanzaki-page-salamander-leg hanzaki-page-leg-back-left">
          <path d="M120 59.5c-8.9 8.2-13.8 13.7-17 22.3" className="hanzaki-page-salamander-limb" />
          <path d="M103.2 81.3l-10.5 1.8" className="hanzaki-page-salamander-toes" />
        </g>

        <g id="leg-back-right" className="hanzaki-page-salamander-leg hanzaki-page-leg-back-right">
          <path d="M116.8 38.2c-8.2-7.5-13-12.5-16.1-20.2" className="hanzaki-page-salamander-limb" />
          <path d="M100.9 18.5l-9.6-1.5" className="hanzaki-page-salamander-toes" />
        </g>

        <g id="body" className="hanzaki-page-salamander-body">
          <path
            d="M60.2 50.7c0-19.9 18.1-34.1 43.5-34.1 25.7 0 45.1 13.2 45.1 32.2 0 17.8-18.2 30.7-43.3 30.7-27.1 0-45.3-11.5-45.3-28.8Z"
            fill="var(--salamander-fill)"
          />
          <path
            d="M81.8 37.1c15.9-9 36-7.8 50.7 2.7"
            className="hanzaki-page-salamander-highlight"
          />
          <path
            d="M84 50.1c18.6-6.8 38.8-5.2 53.4 4.1"
            className="hanzaki-page-salamander-accent"
          />
        </g>

        <g id="head" className="hanzaki-page-salamander-head">
          <path
            d="M27.6 49.6c0-16.1 13.1-27.6 30.7-27.6 16.1 0 27.9 10.8 27.9 25.4 0 15.3-13 26.7-30.3 26.7-16.4 0-28.3-10.3-28.3-24.5Z"
            fill="var(--salamander-fill)"
          />
          <path
            d="M35 55.3c-7.7 1-15.1 2.5-22.2 4.8"
            className="hanzaki-page-salamander-whisker"
          />
          <path
            d="M35.5 43.1c-7.4-1.4-14.7-3.6-21.8-6.4"
            className="hanzaki-page-salamander-whisker"
          />
          <circle cx="53" cy="40.2" r="2.6" fill="#211a17" opacity="0.74" />
          <circle cx="53.8" cy="39.3" r="0.75" fill="#fff" opacity="0.86" />
        </g>

        <g id="leg-front-left" className="hanzaki-page-salamander-leg hanzaki-page-leg-front-left">
          <path d="M68.2 63.1c-9.7 7.2-15.3 12.7-19.7 21.2" className="hanzaki-page-salamander-limb" />
          <path d="M49.1 83.6l-10.6.8" className="hanzaki-page-salamander-toes" />
        </g>

        <g id="leg-front-right" className="hanzaki-page-salamander-leg hanzaki-page-leg-front-right">
          <path d="M69.1 36.3C59.4 30.6 53.4 25.8 48 18" className="hanzaki-page-salamander-limb" />
          <path d="M48.5 18.4l-10.2-2.2" className="hanzaki-page-salamander-toes" />
        </g>
      </svg>
    </div>
  );
}
