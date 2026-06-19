import type { Metadata } from "next";
import Image from "next/image";
import { InstagramMediaMarquee } from "@/components/InstagramMediaMarquee";
import { InstagramTestimonialsMarquee } from "@/components/InstagramTestimonialsMarquee";
import { InstagramVideoMoment } from "@/components/InstagramVideoMoment";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  HANZAKI_CONFIG,
  HANZAKI_WHATSAPP_MESSAGES,
  createHanzakiWhatsAppLink,
} from "@/src/data/hanzaki-config";
import { hanzakiTestimonials } from "@/src/data/hanzaki-reviews";
import {
  instagramFoodGalleryMedia,
  logoMedia,
  scrollExperienceMedia,
} from "@/src/data/hanzaki-media";
import { FULL_SITE_URL, OPENING_HOURS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hanzaki | Links",
  description:
    "Reserve sua mesa, peça delivery ou veja a localização do Hanzaki em Araguaína.",
  openGraph: {
    title: "Hanzaki | Araguaína",
    description: "O sabor oriental e brasileiro da sua noite em Araguaína.",
    url: "/instagram",
    images: [{ url: logoMedia.src, width: 1200, height: 1200, alt: "Hanzaki" }],
  },
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M13.2 5.25 20 12l-6.8 6.75-1.35-1.35 4.45-4.45H4v-1.9h12.3L11.85 6.6l1.35-1.35Z"
        fill="currentColor"
      />
    </svg>
  );
}
function RouteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12 21s7-5.35 7-12A7 7 0 0 0 5 9c0 6.65 7 12 7 12Zm0-9.4A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkButton({
  href,
  children,
  tone = "default",
  icon,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "default" | "primary" | "dark";
  icon: React.ReactNode;
}) {
  const colors = {
    default: "border-black/10 bg-white text-neutral-950 shadow-sm",
    primary:
      "border-[var(--hanzaki-red)] bg-[var(--hanzaki-red)] text-white shadow-lg",
    dark: "border-[#171413] bg-[#171413] text-white shadow-lg",
  }[tone];

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`ig-rise flex min-h-14 items-center justify-between rounded-[18px] border px-5 text-sm font-black transition active:scale-[.985] ${colors}`}
    >
      <span className="flex items-center gap-3">
        {icon}
        {children}
      </span>
      <ArrowIcon />
    </a>
  );
}

export default function InstagramPage() {
  return (
    <main className="min-h-svh bg-[radial-gradient(circle_at_top,rgba(211,35,42,.12),transparent_32%),linear-gradient(180deg,#fffaf2,#f1e3d2)] px-4 py-5 text-neutral-950 sm:py-8">
      <div className="mx-auto max-w-[470px] overflow-hidden rounded-[30px] border border-black/8 bg-[#fffdf9]/94 px-4 py-6 shadow-[0_28px_80px_rgba(35,22,14,.13)] backdrop-blur sm:px-5">
        <header className="ig-rise text-center">
          <Image
            src={logoMedia.src}
            alt={logoMedia.alt}
            width={128}
            height={128}
            priority
            className="mx-auto h-24 w-24 object-contain"
          />
          <h1 className="mt-3 text-2xl font-black">Hanzaki | Araguaína</h1>
          <p className="mx-auto mt-3 max-w-sm text-3xl font-black leading-none">
            O sabor oriental e brasileiro da sua noite em Araguaína.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-black">
            <span className="mr-2 text-[var(--hanzaki-red)]">★★★★★</span>
            {HANZAKI_CONFIG.googleRating} no Google ·{" "}
            {HANZAKI_CONFIG.googleReviews} avaliações
          </p>
        </header>

        <InstagramMediaMarquee media={instagramFoodGalleryMedia} />

        <nav className="mt-5 grid gap-3" aria-label="Links principais">
          <LinkButton
            href={createHanzakiWhatsAppLink(
              HANZAKI_WHATSAPP_MESSAGES.reservation,
            )}
            tone="primary"
            icon={<WhatsAppIcon className="h-5 w-5" />}
          >
            Reservar pelo WhatsApp
          </LinkButton>
          <LinkButton
            href={HANZAKI_CONFIG.deliveryUrl}
            tone="dark"
            icon={<ArrowIcon />}
          >
            Pedir pelo InstaDelivery
          </LinkButton>
          <LinkButton href={HANZAKI_CONFIG.googleMapsUrl} icon={<RouteIcon />}>
            Ver localização
          </LinkButton>
          <LinkButton href={HANZAKI_CONFIG.instagramUrl} icon={<ArrowIcon />}>
            Instagram
          </LinkButton>
          <LinkButton href={FULL_SITE_URL} icon={<ArrowIcon />}>
            Site completo
          </LinkButton>
        </nav>

        <InstagramVideoMoment
          videoSrc={scrollExperienceMedia.mobileVideo}
          posterSrc={scrollExperienceMedia.background.src}
        />
        <InstagramTestimonialsMarquee reviews={hanzakiTestimonials} />

        <section className="ig-rise mt-6 rounded-[24px] bg-[#171413] p-5 text-white">
          <h2 className="text-2xl font-black">Estamos em Araguaína.</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/68">
            {HANZAKI_CONFIG.address}
          </p>
          <p className="mt-1 text-sm font-semibold text-white/68">
            {OPENING_HOURS}
          </p>
          <a
            href={HANZAKI_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full bg-white text-sm font-black text-neutral-950"
          >
            <RouteIcon /> Abrir rota
          </a>
        </section>
        <section className="ig-rise mt-4 rounded-[24px] border border-[var(--hanzaki-red)] bg-[var(--hanzaki-red)] p-5 text-white">
          <h2 className="text-2xl font-black">
            Sua noite no Hanzaki começa aqui.
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-white/78">
            Reserve uma mesa ou peça pelo delivery.
          </p>
          <div className="mt-4 grid gap-2">
            <a
              href={createHanzakiWhatsAppLink(
                HANZAKI_WHATSAPP_MESSAGES.reservation,
              )}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-white text-sm font-black text-neutral-950"
            >
              <WhatsAppIcon className="h-5 w-5" /> Reservar pelo WhatsApp
            </a>
            <a
              href={HANZAKI_CONFIG.deliveryUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center justify-center rounded-full border border-white/25 text-sm font-black text-white"
            >
              Pedir delivery
            </a>
          </div>
        </section>
        <footer className="mt-6 text-center text-xs font-black text-neutral-500">
          Hanzaki | Araguaína
        </footer>
      </div>
    </main>
  );
}
