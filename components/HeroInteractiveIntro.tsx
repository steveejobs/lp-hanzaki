import Image from "next/image";
import {
  DELIVERY_URL,
  buildWhatsappLink,
  images,
  whatsappMessages,
} from "@/lib/site";

export function HeroInteractiveIntro() {
  return (
    <section className="bg-[#171413] p-3 md:p-5" aria-label="Abertura Hanzaki">
      <div className="hero-hanzaki relative isolate mx-auto min-h-[calc(100svh-88px)] max-w-[1440px] overflow-hidden rounded-[28px] border border-white/10 bg-[#211c19] md:min-h-[760px]">
        <Image
          src={images.heroIntro}
          alt="Preparo de sushi na cozinha do Hanzaki"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="hero-hanzaki-image object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,9,.88)_0%,rgba(23,18,15,.62)_42%,rgba(23,18,15,.2)_78%),linear-gradient(0deg,rgba(13,10,9,.68),transparent_48%)]" />
        <div className="hero-hanzaki-sweep absolute inset-y-0 -left-1/3 w-2/3 bg-[linear-gradient(90deg,transparent,rgba(211,35,42,.22),rgba(17,16,15,.24),transparent)]" />
        <div className="relative z-10 flex min-h-[calc(100svh-88px)] max-w-3xl flex-col justify-end p-6 pb-10 text-white md:min-h-[760px] md:p-14">
          <Image
            src={images.logo}
            alt="Hanzaki"
            width={128}
            height={128}
            priority
            className="hero-hanzaki-copy mb-7 h-20 w-20 object-contain drop-shadow-xl md:h-28 md:w-28"
          />
          <p className="hero-hanzaki-copy text-xs font-black uppercase tracking-[0.18em] text-[#ffb19e]">
            Oriental + brasileira · Araguaína
          </p>
          <h1 className="hero-hanzaki-copy mt-4 text-4xl font-black leading-[.98] md:text-7xl">
            O sabor oriental e brasileiro da sua noite em Araguaína.
          </h1>
          <p className="hero-hanzaki-copy mt-5 max-w-xl text-base font-semibold leading-7 text-white/78 md:text-xl">
            Ambiente aconchegante, pratos variados, delivery e atendimento à
            noite.
          </p>
          <div className="mt-8 grid gap-3 sm:flex">
            <a
              href={buildWhatsappLink(whatsappMessages.reservation)}
              className="hero-hanzaki-cta btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Reservar pelo WhatsApp
            </a>
            <a
              href={DELIVERY_URL}
              className="hero-hanzaki-cta btn border border-white/25 bg-white text-neutral-950"
              target="_blank"
              rel="noreferrer"
            >
              Pedir delivery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
