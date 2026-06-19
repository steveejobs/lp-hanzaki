import Image from "next/image";
import { FoodGallerySection } from "@/components/FoodGallerySection";
import { Header } from "@/components/Header";
import { HeroInteractiveIntro } from "@/components/HeroInteractiveIntro";
import { Reveal } from "@/components/Reveal";
import { ScrollExperienceFeature } from "@/components/ScrollExperienceFeature";
import { SectionIntro } from "@/components/SectionIntro";
import { SocialIconLinks } from "@/components/SocialIconLinks";
import { HANZAKI_CONFIG } from "@/src/data/hanzaki-config";
import {
  environmentImages,
  facadeMedia,
  logoMedia,
} from "@/src/data/hanzaki-media";
import {
  DELIVERY_URL,
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  OPENING_HOURS,
  buildWhatsappLink,
  navLinks,
  whatsappMessages,
} from "@/lib/site";

const experiences = [
  {
    title: "Jantar no salão",
    text: "Ambiente aconchegante para aproveitar com família, amigos ou casal.",
    cta: "Reservar mesa",
    href: buildWhatsappLink(whatsappMessages.reservation),
  },
  {
    title: "Delivery",
    text: "Peça seus favoritos pelo InstaDelivery e receba em casa sem complicação.",
    cta: "Pedir pelo InstaDelivery",
    href: DELIVERY_URL,
    featured: true,
  },
  {
    title: "Retirada",
    text: "Faça seu pedido e retire no restaurante.",
    cta: "Pedir para retirada",
    href: buildWhatsappLink(whatsappMessages.pickup),
  },
  {
    title: "Experiência à noite",
    text: "Jante com variedade, ambiente acolhedor e atendimento noturno.",
    cta: "Saber sobre a experiência",
    href: buildWhatsappLink(whatsappMessages.experience),
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Hanzaki",
  image: "/hanzaki/imagem hero.jpg",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lp-hanzaki.vercel.app",
  telephone: `+${HANZAKI_CONFIG.phone}`,
  servesCuisine: ["Japanese", "Brazilian", "Oriental"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. José de Brito, 940, St. Anhanguera",
    addressLocality: "Araguaína",
    addressRegion: "TO",
    postalCode: "77818-530",
    addressCountry: "BR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "533",
  },
  sameAs: [HANZAKI_CONFIG.instagramUrl],
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="topo" className="overflow-hidden pt-16 md:pt-20">
        <HeroInteractiveIntro />

        <section className="border-b border-black/8 bg-[#fbf5ec] py-5">
          <div className="container-page flex flex-wrap items-center justify-center gap-2 text-center text-xs font-black text-neutral-800 md:gap-3 md:text-sm">
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
              <span className="text-[var(--hanzaki-red)]">★★★★★</span>{" "}
              {HANZAKI_CONFIG.googleRating} no Google ·{" "}
              {HANZAKI_CONFIG.googleReviews} avaliações
            </span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
              Comida oriental e brasileira
            </span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
              Araguaína - TO · Atendimento à noite
            </span>
          </div>
        </section>

        <section id="experiencias" className="section-pad bg-[#fbf5ec]">
          <div className="container-page">
            <Reveal threshold={0.35}>
              <SectionIntro
                eyebrow="Sua experiência"
                title="Jante no salão, peça em casa ou retire no Hanzaki."
                copy="No salão, em casa ou para retirada: escolha a forma mais prática de aproveitar uma cozinha variada."
              />
            </Reveal>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {experiences.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 70}
                  threshold={0.18}
                  className="h-full"
                >
                  <article
                    className={`hanzaki-red-accent group flex h-full flex-col overflow-hidden rounded-[22px] border p-6 shadow-[0_16px_40px_rgba(35,22,14,.06)] transition hover:-translate-y-1 hover:shadow-xl ${item.featured ? "border-[var(--hanzaki-red)] bg-[#171413] text-white" : "border-black/8 bg-white"}`}
                  >
                    <span
                      className={`mb-7 h-1.5 w-12 rounded-full transition-all group-hover:w-20 ${item.featured ? "bg-white" : "bg-[var(--hanzaki-red)]"}`}
                    />
                    <h3 className="text-2xl font-black">{item.title}</h3>
                    <p
                      className={`mt-4 flex-1 text-base leading-7 ${item.featured ? "text-white/72" : "text-neutral-600"}`}
                    >
                      {item.text}
                    </p>
                    <a
                      href={item.href}
                      className={`btn mt-6 w-full ${item.featured ? "bg-[var(--hanzaki-red)] text-white shadow-[0_16px_34px_rgba(211,35,42,.24)]" : "btn-dark"}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.cta}
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="ambiente" className="section-pad bg-white">
          <div className="container-page">
            <Reveal threshold={0.4}>
              <SectionIntro
                eyebrow="Ambiente"
                title="Um ambiente aconchegante para aproveitar a noite."
                copy="Comida oriental e brasileira em um espaço pensado para jantar, reunir e pedir sem complicação."
              />
            </Reveal>
            <div className="mt-9 grid gap-4 md:grid-cols-[1.15fr_.85fr]">
              <Reveal
                className="relative min-h-[360px] overflow-hidden rounded-[26px] md:min-h-[600px]"
                threshold={0.2}
              >
                <Image
                  src={environmentImages[0].src}
                  alt={environmentImages[0].alt}
                  fill
                  sizes="(max-width:768px) 92vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <p className="absolute bottom-7 left-7 max-w-md text-3xl font-black leading-tight text-white md:text-5xl">
                  Calor, variedade e espaço para estar junto.
                </p>
              </Reveal>
              <div className="grid gap-4">
                <Reveal
                  className="relative min-h-[300px] overflow-hidden rounded-[26px]"
                  delay={100}
                  threshold={0.2}
                >
                  <Image
                    src={environmentImages[1].src}
                    alt={environmentImages[1].alt}
                    fill
                    sizes="(max-width:768px) 92vw, 38vw"
                    className="object-cover"
                  />
                </Reveal>
                <Reveal
                  className="rounded-[26px] bg-[#1b1817] p-8 text-white"
                  delay={160}
                  threshold={0.2}
                >
                  <p className="text-xs font-black uppercase tracking-[.16em] text-[#ff9a84]">
                    Oriental + brasileira
                  </p>
                  <p className="mt-5 text-3xl font-black leading-tight">
                    Do sushi ao prato quente, sempre bem servido.
                  </p>
                  <p className="mt-4 leading-7 text-white/65">
                    Uma noite para famílias, amigos e casais, com opções para
                    diferentes gostos.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <ScrollExperienceFeature />
        <FoodGallerySection />

        <section className="section-pad bg-[#1a1716] text-white">
          <div className="container-page grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <Reveal threshold={0.35}>
              <p className="eyebrow text-[#ff9a84]">Experiência à noite</p>
              <h2 className="mt-5 text-5xl font-black leading-none md:text-7xl">
                Todos os dias à noite.
              </h2>
            </Reveal>
            <Reveal delay={100} threshold={0.35}>
              <p className="max-w-2xl text-lg font-semibold leading-8 text-white/68">
                Uma opção para quem quer jantar bem em Araguaína, com variedade,
                ambiente acolhedor e atendimento à noite.
              </p>
              <p className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-black">
                {OPENING_HOURS}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-pad bg-white">
          <div className="container-page">
            <Reveal threshold={0.4} className="max-w-3xl">
              <p className="text-sm font-black text-[var(--hanzaki-red)]">
                ★★★★★ {HANZAKI_CONFIG.googleRating} no Google ·{" "}
                {HANZAKI_CONFIG.googleReviews} avaliações
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                Quem conhece, recomenda.
              </h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-neutral-600">
                Clientes destacam variedade, ambiente aconchegante e comida bem
                servida.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="localizacao" className="section-pad bg-[#fbf5ec]">
          <div className="container-page grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-center">
            <Reveal threshold={0.35}>
              <SectionIntro
                eyebrow="Localização"
                title="Estamos em Araguaína."
                copy="Trace a rota, reserve sua mesa ou peça pelo InstaDelivery."
              />
              <div className="mt-7 space-y-3 leading-7 text-neutral-700">
                <p>
                  <strong className="text-neutral-950">Endereço:</strong>{" "}
                  {HANZAKI_CONFIG.address}
                </p>
                <p>
                  <strong className="text-neutral-950">Horário:</strong>{" "}
                  {OPENING_HOURS}
                </p>
                <p>
                  <strong className="text-neutral-950">Instagram:</strong>{" "}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="font-black text-[var(--hanzaki-red)]"
                  >
                    {HANZAKI_CONFIG.instagramHandle}
                  </a>
                </p>
              </div>
              <div className="mt-8 grid gap-3 sm:flex">
                <a
                  href={GOOGLE_MAPS_URL}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir rota
                </a>
                <a
                  href={buildWhatsappLink(whatsappMessages.reservation)}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Reservar pelo WhatsApp
                </a>
                <a
                  href={DELIVERY_URL}
                  className="btn btn-dark"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pedir delivery
                </a>
              </div>
            </Reveal>
            <Reveal
              className="relative min-h-[340px] overflow-hidden rounded-[32px] bg-[#171413] md:min-h-[500px]"
              delay={100}
              threshold={0.25}
            >
              <Image
                src={facadeMedia.src}
                alt=""
                fill
                sizes="(max-width:768px) 92vw, 52vw"
                className="object-cover opacity-40 blur-xl scale-110"
              />
              <Image
                src={facadeMedia.src}
                alt={facadeMedia.alt}
                fill
                sizes="(max-width:768px) 92vw, 52vw"
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
              <div className="absolute left-4 right-4 top-4 flex items-center gap-4 rounded-[20px] bg-white/92 p-4 backdrop-blur md:left-5 md:right-auto md:min-w-[310px]">
                <Image
                  src={logoMedia.src}
                  alt=""
                  width={54}
                  height={54}
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <p className="font-black">Hanzaki | Araguaína</p>
                  <p className="text-xs font-bold text-neutral-600">
                    Fachada para reconhecer na chegada.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </main>
      <footer className="border-t border-white/10 bg-[#11100f] py-9 text-white">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={logoMedia.src}
              alt="Hanzaki"
              width={60}
              height={60}
              className="h-12 w-12 object-contain"
            />
            <p className="text-sm font-black">Hanzaki | Araguaína</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-white/60">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
            <SocialIconLinks dark />
          </div>
        </div>
      </footer>
    </>
  );
}
