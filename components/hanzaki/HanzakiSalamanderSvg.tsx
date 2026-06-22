import type { CSSProperties } from "react";

type HanzakiSalamanderSvgProps = {
  className?: string;
};

const animatedPartStyle = { animation: "none" } satisfies CSSProperties;

export function HanzakiSalamanderSvg({ className }: HanzakiSalamanderSvgProps) {
  return (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 248 112"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="hanzaki-salamander-soft-glow" x="-18%" y="-28%" width="136%" height="156%">
          <feDropShadow dx="0" dy="9" stdDeviation="8" floodColor="#000000" floodOpacity="0.3" />
          <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="var(--salamander-accent)" floodOpacity="0.18" />
        </filter>
        <linearGradient id="hanzaki-salamander-pearl" x1="44" x2="158" y1="30" y2="77">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.58" stopColor="var(--salamander-fill)" />
          <stop offset="1" stopColor="#ece7df" />
        </linearGradient>
      </defs>

      <g filter="url(#hanzaki-salamander-soft-glow)">
        <g
          id="tail-tip"
          className="hanzaki-page-salamander-tail hanzaki-page-salamander-tail-tip"
          style={animatedPartStyle}
        >
          <path
            d="M201.4 56.9c13.7-3.2 24.9-10.4 33.6-20.9 2-2.4 5.4-1 5 2.1-1.3 10.8-10 22.2-24.4 29.1-5.4 2.6-12 2.2-16.3-1-3.4-2.5-2.5-7.8 2.1-9.3Z"
            fill="var(--salamander-fill)"
          />
          <path
            className="hanzaki-page-salamander-line"
            d="M210 61.4c9.8-4.5 17.7-11.8 23.2-21"
          />
        </g>

        <g
          id="tail-mid"
          className="hanzaki-page-salamander-tail hanzaki-page-salamander-tail-mid"
          style={animatedPartStyle}
        >
          <path
            d="M155.8 53.6c18.2-.8 35.6 1.4 52.2 6.7 4.9 1.6 4.7 7.8-.1 9.8-17.3 7.1-38.8 4.4-58-5.9-4.1-2.2-3.3-8.9 5.9-10.6Z"
            fill="var(--salamander-fill)"
          />
          <path
            className="hanzaki-page-salamander-accent"
            d="M164.8 61.5c14.1.5 27.3 2.2 39.4 5.7"
          />
        </g>

        <g
          id="tail-base"
          className="hanzaki-page-salamander-tail hanzaki-page-salamander-tail-base"
          style={animatedPartStyle}
        >
          <path
            d="M126.2 43.4c16.3 1.1 30.4 5.9 42.1 14.1 4.9 3.4 3.5 10.8-2.5 12.5-14.3 4.1-31.6.1-45.7-9.4-8.3-5.6-4.9-18 6.1-17.2Z"
            fill="var(--salamander-fill)"
          />
        </g>

        <g
          id="leg-back-right"
          className="hanzaki-page-salamander-leg hanzaki-page-leg-back-right"
          style={animatedPartStyle}
        >
          <path className="hanzaki-page-salamander-limb" d="M127.4 42.2c-8.8-7.8-13.5-14.3-16.4-24.4" />
          <path className="hanzaki-page-salamander-toes" d="M111.4 18.4l-8.9-1.9" />
        </g>

        <g
          id="leg-back-left"
          className="hanzaki-page-salamander-leg hanzaki-page-leg-back-left"
          style={animatedPartStyle}
        >
          <path className="hanzaki-page-salamander-limb" d="M126.8 68c-9.8 7.1-16.6 14.8-21.4 24.2" />
          <path className="hanzaki-page-salamander-toes" d="M106.1 91.5l-9.5 1.9" />
        </g>

        <g id="body" className="hanzaki-page-salamander-body" style={animatedPartStyle}>
          <path
            d="M63.7 55.6c0-20.4 22.4-34.8 54-34.1 22.3.5 39.4 11.5 40.6 27.6 1.3 16.6-15.8 29.4-42.2 31.4-30.7 2.4-52.4-7.5-52.4-24.9Z"
            fill="url(#hanzaki-salamander-pearl)"
          />
          <path
            className="hanzaki-page-salamander-highlight"
            d="M84.6 42.8c18.8-9.9 43.7-8.7 58.8 2.7"
          />
          <path
            className="hanzaki-page-salamander-accent"
            d="M88.8 56.9c17.6-5.2 37.8-4.3 54.3 2.3"
          />
        </g>

        <g id="head" className="hanzaki-page-salamander-head" style={animatedPartStyle}>
          <path
            d="M22.7 54.8c0-16.2 15.7-28.2 35.3-27.5 16.2.5 28 10.5 28.4 24.5.4 15-12.9 26.3-31.6 27.5-18.8 1.2-32.1-8.7-32.1-24.5Z"
            fill="url(#hanzaki-salamander-pearl)"
          />
          <path
            className="hanzaki-page-salamander-highlight"
            d="M36.4 43.1c8.5-6.3 21.1-7.9 31.4-3.4"
          />
          <path
            className="hanzaki-page-salamander-whisker"
            d="M32.7 60.7c-8.5.9-16.6 2.7-24.2 5.4"
          />
          <path
            className="hanzaki-page-salamander-whisker"
            d="M33.1 48.2c-8.1-1.2-15.9-3.2-23.2-6.2"
          />
        </g>

        <g
          id="tongue"
          className="hanzaki-page-salamander-tongue"
          style={{
            opacity: 0,
            transform: "scaleX(0)",
            transformBox: "fill-box",
            transformOrigin: "right center",
          }}
        >
          <path
            d="M23.9 56.2C14.5 56.1 9 53.9 5.3 50.4"
            fill="none"
            stroke="var(--salamander-accent)"
            strokeLinecap="round"
            strokeWidth="1.7"
          />
          <path
            d="M5.8 50.6 3.8 48.5"
            fill="none"
            stroke="var(--salamander-accent)"
            strokeLinecap="round"
            strokeWidth="1.3"
          />
          <path
            d="M5.8 50.6 3.9 52.5"
            fill="none"
            stroke="var(--salamander-accent)"
            strokeLinecap="round"
            strokeWidth="1.3"
          />
        </g>

        <g id="eye" style={animatedPartStyle}>
          <path
            d="M51.7 45.2c2.6-2.5 6.3-2.5 8.8 0-2.3 2.3-6.5 2.3-8.8 0Z"
            fill="#1c1715"
            opacity="0.76"
          />
          <circle cx="57.4" cy="44.6" r="0.85" fill="#ffffff" opacity="0.9" />
        </g>

        <g
          id="leg-front-right"
          className="hanzaki-page-salamander-leg hanzaki-page-leg-front-right"
          style={animatedPartStyle}
        >
          <path className="hanzaki-page-salamander-limb" d="M72.1 43.6C61 38 54.2 31.7 49.1 22.2" />
          <path className="hanzaki-page-salamander-toes" d="M49.4 22.6 39.8 19.7" />
        </g>

        <g
          id="leg-front-left"
          className="hanzaki-page-salamander-leg hanzaki-page-leg-front-left"
          style={animatedPartStyle}
        >
          <path className="hanzaki-page-salamander-limb" d="M73 68.3C62 74.8 53.7 82.6 48.2 92.5" />
          <path className="hanzaki-page-salamander-toes" d="M48.8 91.8 39.1 92.8" />
        </g>
      </g>
    </svg>
  );
}
