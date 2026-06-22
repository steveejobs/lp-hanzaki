"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { GOOGLE_MAPS_URL, buildWhatsappLink, whatsappMessages } from "@/lib/site";
import { HanzakiSalamanderWalker } from "@/components/hanzaki/HanzakiSalamanderWalker";

const hanzakiExperiences = [
  {
    title: "Jantar no salão",
    text: "Ambiente aconchegante para aproveitar a noite com família, casal ou amigos.",
    color: "#dc2626",
  },
  {
    title: "Delivery",
    text: "Peça seus favoritos com praticidade e receba onde estiver.",
    color: "#f97316",
  },
  {
    title: "Sabores orientais",
    text: "Sushi, yakisoba, combinados e pratos para compartilhar.",
    color: "#ef4444",
  },
  {
    title: "Comida brasileira",
    text: "Variedade para quem quer uma refeição bem servida.",
    color: "#f59e0b",
  },
  {
    title: "Retirada",
    text: "Faça seu pedido e retire direto no Hanzaki.",
    color: "#f8fafc",
  },
] as const;

export function HanzakiExperiencePlayground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeExperience = hanzakiExperiences[activeIndex];
  const reservationUrl = buildWhatsappLink(whatsappMessages.reservation);

  function activateCard(index: number) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setActiveIndex(index);
    cardRefs.current[index]?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <section className="hanzaki-page-section" aria-labelledby="hanzaki-page-title">
      <div className="container-page">
        <div className="hanzaki-page-hero">
          <p className="hanzaki-page-eyebrow">Laboratório visual Hanzaki</p>
          <h1 id="hanzaki-page-title">Escolha sua experiência Hanzaki.</h1>
          <p>
            Salão, delivery, pratos orientais e brasileiros em uma experiência
            noturna em Araguaína.
          </p>
        </div>

        <div className="hanzaki-page-playground" ref={containerRef}>
          <HanzakiSalamanderWalker
            activeColor={activeExperience.color}
            activeIndex={activeIndex}
            cardRefs={cardRefs}
            containerRef={containerRef}
          />

          <div className="hanzaki-page-cards" role="list" aria-label="Experiências Hanzaki">
            {hanzakiExperiences.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  aria-pressed={isActive}
                  className={`hanzaki-page-card ${isActive ? "is-active" : ""}`}
                  key={item.title}
                  onClick={() => activateCard(index)}
                  onFocus={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  style={{ "--experience-color": item.color } as CSSProperties}
                  type="button"
                >
                  <span className="hanzaki-page-card-kicker">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="hanzaki-page-card-title">{item.title}</span>
                  <span className="hanzaki-page-card-text">{item.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="hanzaki-page-active-panel">
          <div>
            <p>Ativo agora</p>
            <h2>{activeExperience.title}</h2>
            <span>{activeExperience.text}</span>
          </div>
          <i
            aria-hidden="true"
            style={{ background: activeExperience.color, color: activeExperience.color }}
          />
        </div>

        <div className="hanzaki-page-cta" aria-label="Ações Hanzaki">
          <a href={reservationUrl} target="_blank" rel="noreferrer">
            Reservar pelo WhatsApp
          </a>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
            Ver localização
          </a>
        </div>
      </div>
    </section>
  );
}
