"use client";

import type { CSSProperties, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
  HanzakiSalamanderRig,
  type SalamanderDirection,
  type SalamanderState,
} from "@/components/hanzaki/HanzakiSalamanderRig";

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

gsap.registerPlugin(CustomEase, MotionPathPlugin);
CustomEase.create("hanzakiEase", "0.22,1,0.36,1");

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
  const [salamanderState, setSalamanderState] = useState<SalamanderState>("idle");
  const [direction, setDirection] = useState<SalamanderDirection>("left");
  const [reducedMotion, setReducedMotion] = useState(false);
  const walkerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const inspectTimerRef = useRef<number | null>(null);
  const turnTimerRef = useRef<number | null>(null);
  const previousXRef = useRef<number | null>(null);
  const previousYRef = useRef<number | null>(null);
  const directionRef = useRef<SalamanderDirection>("left");

  const clearStateTimers = useCallback(() => {
    if (inspectTimerRef.current) {
      window.clearTimeout(inspectTimerRef.current);
    }
    if (turnTimerRef.current) {
      window.clearTimeout(turnTimerRef.current);
    }
  }, []);

  const settleState = useCallback(
    (index: number) => {
      setIsWalking(false);

      if (index === 2) {
        directionRef.current = "right";
        setDirection("right");
        setSalamanderState("lick");
        inspectTimerRef.current = window.setTimeout(() => setSalamanderState("inspect"), 520);
        return;
      }

      setSalamanderState("inspect");
    },
    [],
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    const card = cardRefs.current[activeIndex];
    const walker = walkerRef.current;

    if (!container || !card || !walker) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    const isCompact = window.innerWidth <= 900;
    const walkerWidth = isMobile ? 66 : isCompact ? 86 : 112;
    const walkerOffset = isMobile ? 48 : isCompact ? 52 : 60;
    const rawX = cardRect.left - containerRect.left + cardRect.width / 2 - walkerWidth / 2;
    const maxX = Math.max(containerRect.width - walkerWidth, 0);
    const nextX = Math.min(Math.max(rawX, 0), maxX);
    const nextY = Math.max(cardRect.top - containerRect.top - walkerOffset, 0);
    const previousX = previousXRef.current;
    const previousY = previousYRef.current;
    const movement = previousX === null ? 0 : Math.abs(nextX - previousX);
    const nextDirection: SalamanderDirection =
      previousX !== null && nextX > previousX ? "right" : "left";

    previousXRef.current = nextX;
    previousYRef.current = nextY;

    if (previousX === null || previousY === null || reducedMotion) {
      gsap.killTweensOf(walker);
      gsap.set(walker, { x: nextX, y: nextY });
      setPosition({ x: nextX, y: nextY, ready: true });
      setIsWalking(false);
      setSalamanderState("idle");
      return;
    }

    setPosition({ x: nextX, y: nextY, ready: true });
    clearStateTimers();
    gsap.killTweensOf(walker);

    if (movement > 4) {
      const directionChanged = nextDirection !== directionRef.current;
      const movementDuration = isMobile ? 0.76 : isCompact ? 0.84 : 0.96;
      const curveLift = Math.min(
        Math.max(movement * 0.28, isMobile ? 16 : isCompact ? 24 : 34),
        isMobile ? 30 : isCompact ? 44 : 62,
      );
      const midX = previousX + (nextX - previousX) * 0.5;
      const midY = Math.min(previousY, nextY) - curveLift;

      directionRef.current = nextDirection;
      setDirection(nextDirection);
      setIsWalking(true);
      setSalamanderState(directionChanged ? "turn" : "walk");

      gsap.to(walker, {
        duration: movementDuration,
        ease: "hanzakiEase",
        motionPath: {
          path: [
            { x: previousX, y: previousY },
            { x: midX, y: midY },
            { x: nextX, y: nextY },
          ],
          curviness: 1.25,
        },
        onComplete: () => settleState(activeIndex),
      });

      if (directionChanged) {
        turnTimerRef.current = window.setTimeout(() => setSalamanderState("walk"), 260);
      }

      return;
    }

    gsap.to(walker, {
      duration: isMobile ? 0.4 : isCompact ? 0.46 : 0.52,
      ease: "hanzakiEase",
      x: nextX,
      y: nextY,
      onComplete: () => settleState(activeIndex),
    });
  }, [
    activeIndex,
    cardRefs,
    clearStateTimers,
    containerRef,
    reducedMotion,
    settleState,
  ]);

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
      clearStateTimers();
      if (walkerRef.current) {
        gsap.killTweensOf(walkerRef.current);
      }
    };
  }, [cardRefs, clearStateTimers, containerRef, scheduleMeasure]);

  const style = {
    "--salamander-fill": "#ffffff",
    "--salamander-accent": activeColor,
    "--salamander-glow": `color-mix(in srgb, ${activeColor} 35%, transparent)`,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      ref={walkerRef}
      className={[
        "hanzaki-page-salamander",
        position.ready ? "is-ready" : "",
        isWalking ? "is-walking" : "",
      ].join(" ")}
      style={style}
    >
      <HanzakiSalamanderRig
        accentColor={activeColor}
        direction={direction}
        state={reducedMotion ? "idle" : salamanderState}
      />
    </div>
  );
}
