"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { HanzakiSalamanderSvg } from "@/components/hanzaki/HanzakiSalamanderSvg";

export type SalamanderState = "idle" | "walk" | "turn" | "inspect" | "lick";
export type SalamanderDirection = "left" | "right";

gsap.registerPlugin(CustomEase);
CustomEase.create("hanzakiEase", "0.22,1,0.36,1");

type HanzakiSalamanderRigProps = {
  accentColor: string;
  direction: SalamanderDirection;
  state: SalamanderState;
};

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;

  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  if ([red, green, blue].some(Number.isNaN)) {
    return `rgba(220, 38, 38, ${alpha})`;
  }

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
}

export function HanzakiSalamanderRig({
  accentColor,
  direction,
  state,
}: HanzakiSalamanderRigProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const stateTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const blinkTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const glowTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;

    if (!root || !stage) {
      return undefined;
    }

    const query = gsap.utils.selector(root);
    const parts = {
      body: query<SVGGElement>("#body"),
      head: query<SVGGElement>("#head"),
      eye: query<SVGGElement>("#eye"),
      tongue: query<SVGGElement>("#tongue"),
      tailBase: query<SVGGElement>("#tail-base"),
      tailMid: query<SVGGElement>("#tail-mid"),
      tailTip: query<SVGGElement>("#tail-tip"),
      legFrontLeft: query<SVGGElement>("#leg-front-left"),
      legFrontRight: query<SVGGElement>("#leg-front-right"),
      legBackLeft: query<SVGGElement>("#leg-back-left"),
      legBackRight: query<SVGGElement>("#leg-back-right"),
      glow: query<HTMLElement>("[data-salamander-glow]"),
    };

    const allMotionParts = [
      ...parts.body,
      ...parts.head,
      ...parts.eye,
      ...parts.tongue,
      ...parts.tailBase,
      ...parts.tailMid,
      ...parts.tailTip,
      ...parts.legFrontLeft,
      ...parts.legFrontRight,
      ...parts.legBackLeft,
      ...parts.legBackRight,
    ];

    const ctx = gsap.context(() => {
      gsap.set(stage, { scaleX: 1, transformOrigin: "50% 50%" });
      gsap.set(allMotionParts, {
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        transformBox: "fill-box",
        x: 0,
        y: 0,
      });
      gsap.set(parts.head, { transformOrigin: "68% 54%" });
      gsap.set(parts.body, { transformOrigin: "50% 55%" });
      gsap.set(parts.eye, { transformOrigin: "50% 50%" });
      gsap.set(parts.tongue, {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "100% 50%",
      });
      gsap.set(parts.tailBase, { transformOrigin: "10% 55%" });
      gsap.set(parts.tailMid, { transformOrigin: "4% 52%" });
      gsap.set(parts.tailTip, { transformOrigin: "2% 52%" });
      gsap.set(
        [
          ...parts.legFrontLeft,
          ...parts.legFrontRight,
          ...parts.legBackLeft,
          ...parts.legBackRight,
        ],
        { transformOrigin: "62% 36%" },
      );
      gsap.set(parts.glow, { opacity: 0.1, scale: 1 });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const query = gsap.utils.selector(root);
    const eye = query<SVGGElement>("#eye");
    const glow = query<HTMLElement>("[data-salamander-glow]");

    blinkTimelineRef.current?.kill();
    glowTimelineRef.current?.kill();

    if (reducedMotion) {
      gsap.set(eye, { scaleY: 1 });
      gsap.set(glow, { opacity: 0.1, scale: 1 });
      return undefined;
    }

    blinkTimelineRef.current = gsap
      .timeline({ repeat: -1, repeatDelay: 5.6 })
      .to(eye, { duration: 0.055, scaleY: 0.14, transformOrigin: "50% 50%" })
      .to(eye, { duration: 0.11, scaleY: 1, ease: "power2.out" });

    glowTimelineRef.current = gsap
      .timeline({ repeat: -1, yoyo: true })
      .to(glow, { duration: 3.4, opacity: 0.17, scale: 1.055, ease: "sine.inOut" });

    return () => {
      blinkTimelineRef.current?.kill();
      glowTimelineRef.current?.kill();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;

    if (!root || !stage) {
      return undefined;
    }

    const query = gsap.utils.selector(root);
    const parts = {
      body: query<SVGGElement>("#body"),
      head: query<SVGGElement>("#head"),
      tongue: query<SVGGElement>("#tongue"),
      tailBase: query<SVGGElement>("#tail-base"),
      tailMid: query<SVGGElement>("#tail-mid"),
      tailTip: query<SVGGElement>("#tail-tip"),
      legFrontLeft: query<SVGGElement>("#leg-front-left"),
      legFrontRight: query<SVGGElement>("#leg-front-right"),
      legBackLeft: query<SVGGElement>("#leg-back-left"),
      legBackRight: query<SVGGElement>("#leg-back-right"),
    };

    const legs = [
      ...parts.legFrontLeft,
      ...parts.legFrontRight,
      ...parts.legBackLeft,
      ...parts.legBackRight,
    ];
    const tails = [...parts.tailBase, ...parts.tailMid, ...parts.tailTip];

    stateTimelineRef.current?.kill();
    gsap.killTweensOf([
      stage,
      ...parts.body,
      ...parts.head,
      ...parts.tongue,
      ...legs,
      ...tails,
    ]);

    const directionScale = direction === "right" ? -1 : 1;

    if (reducedMotion) {
      gsap.set(stage, { scaleX: directionScale });
      gsap.set([...parts.body, ...parts.head, ...legs, ...tails], {
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: 0,
      });
      gsap.set(parts.tongue, { autoAlpha: 0, scaleX: 0 });
      return undefined;
    }

    gsap.to(stage, {
      duration: state === "turn" ? 0.42 : 0.24,
      ease: "hanzakiEase",
      scaleX: directionScale,
    });

    const timeline = gsap.timeline();

    if (state === "walk") {
      timeline
        .to(parts.head, { duration: 0.22, rotate: direction === "right" ? -2.4 : 2.4, x: -0.8, ease: "hanzakiEase" }, 0)
        .to(parts.body, { duration: 0.42, y: -2.6, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0)
        .to(parts.legFrontLeft, { duration: 0.34, rotate: -9, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0)
        .to(parts.legBackRight, { duration: 0.34, rotate: -8, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0)
        .to(parts.legFrontRight, { duration: 0.34, rotate: 8.5, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.17)
        .to(parts.legBackLeft, { duration: 0.34, rotate: 7.5, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.17)
        .to(parts.tailBase, { duration: 0.48, rotate: -2.8, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.08)
        .to(parts.tailMid, { duration: 0.54, rotate: 5.4, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.16)
        .to(parts.tailTip, { duration: 0.62, rotate: -7.4, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.26);
    } else if (state === "turn") {
      timeline
        .to(parts.head, { duration: 0.22, rotate: direction === "right" ? -6.5 : 6.5, x: -1.4, ease: "hanzakiEase" }, 0)
        .to(parts.body, { duration: 0.3, rotate: direction === "right" ? -2 : 2, y: -1.2, ease: "sine.inOut" }, 0.08)
        .to(parts.tailBase, { duration: 0.34, rotate: direction === "right" ? 3.6 : -3.6, ease: "hanzakiEase" }, 0.16)
        .to(parts.tailMid, { duration: 0.4, rotate: direction === "right" ? 6 : -6, ease: "hanzakiEase" }, 0.22)
        .to(parts.tailTip, { duration: 0.48, rotate: direction === "right" ? 9 : -9, ease: "hanzakiEase" }, 0.3)
        .to([...parts.head, ...parts.body, ...tails], { duration: 0.46, rotate: 0, x: 0, y: 0, ease: "hanzakiEase" }, 0.52);
    } else if (state === "inspect") {
      timeline
        .to([...legs, ...parts.body], { duration: 0.42, rotate: 0, x: 0, y: 0, ease: "hanzakiEase" }, 0)
        .to(parts.head, { duration: 0.56, rotate: direction === "right" ? 3.5 : -3.5, y: 1, ease: "hanzakiEase" }, 0)
        .to(parts.tailBase, { duration: 2.6, rotate: -1.2, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.08)
        .to(parts.tailMid, { duration: 2.8, rotate: 2, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.2)
        .to(parts.tailTip, { duration: 3, rotate: -2.8, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.34);
    } else if (state === "lick") {
      timeline
        .to([...legs, ...parts.body], { duration: 0.22, rotate: 0, x: 0, y: 0, ease: "hanzakiEase" }, 0)
        .to(parts.head, { duration: 0.14, rotate: direction === "right" ? 3 : -3, x: -1, ease: "sine.out" }, 0)
        .to(parts.tongue, { duration: 0.12, autoAlpha: 0.86, scaleX: 0.88, ease: "hanzakiEase" }, 0.09)
        .to(parts.tongue, { duration: 0.16, scaleX: 0.44, ease: "sine.inOut" }, 0.22)
        .to(parts.tongue, { duration: 0.09, autoAlpha: 0, scaleX: 0, ease: "power2.in" }, 0.34)
        .to(parts.head, { duration: 0.3, rotate: 0, x: 0, ease: "hanzakiEase" }, 0.36)
        .to(parts.tailBase, { duration: 2, rotate: -1.1, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0)
        .to(parts.tailMid, { duration: 2.2, rotate: 1.9, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.12)
        .to(parts.tailTip, { duration: 2.4, rotate: -2.6, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.24);
    } else {
      timeline
        .to(parts.body, { duration: 2.7, y: -1.8, scaleY: 1.012, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0)
        .to(parts.head, { duration: 3.1, y: -1.1, rotate: -1.2, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.15)
        .to(parts.tailBase, { duration: 2.6, rotate: -1.8, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.06)
        .to(parts.tailMid, { duration: 2.8, rotate: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.16)
        .to(parts.tailTip, { duration: 3, rotate: -4.2, repeat: -1, yoyo: true, ease: "sine.inOut" }, 0.26);
    }

    stateTimelineRef.current = timeline;

    return () => {
      timeline.kill();
    };
  }, [direction, reducedMotion, state]);

  const style = {
    "--salamander-fill": "#ffffff",
    "--salamander-accent": accentColor,
    "--salamander-glow": hexToRgba(accentColor, 0.35),
  } as CSSProperties;

  return (
    <div ref={rootRef} className="hanzaki-page-salamander-rig" style={style}>
      <div
        className="hanzaki-page-salamander-aura"
        data-salamander-glow
        style={{ animation: "none" }}
      />
      <div ref={stageRef} className="hanzaki-page-salamander-rig-stage">
        <HanzakiSalamanderSvg className="hanzaki-page-salamander-svg" />
      </div>
    </div>
  );
}
