import Image from "next/image";
import { HanzakiExperiencePlayground } from "@/components/hanzaki/HanzakiExperiencePlayground";
import { HanzakiSalamanderRig } from "@/components/hanzaki/HanzakiSalamanderRig";
import {
  ADDRESS,
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  OPENING_HOURS,
  buildWhatsappLink,
  whatsappMessages,
} from "@/lib/site";
import { HANZAKI_CONFIG } from "@/src/data/hanzaki-config";
import {
  environmentImages,
  facadeMedia,
  foodGalleryImages,
  heroMedia,
  logoMedia,
} from "@/src/data/hanzaki-media";

const galleryImages = foodGalleryImages.slice(0, 10);

const flavorCards = [
  {
    title: "Sushi e combinados",
    text: "Seleções para compartilhar, pedir à mesa ou levar para casa.",
  },
  {
    title: "Yakisoba e pratos orientais",
    text: "Pratos quentes, porções e sabores que combinam com a noite.",
  },
  {
    title: "Comida brasileira",
    text: "Opções bem servidas para quem busca uma refeição completa.",
  },
  {
    title: "Delivery e retirada",
    text: "Praticidade para escolher, pedir e aproveitar onde estiver.",
  },
];

const testimonials = [
  "Ambiente gostoso para jantar em família.",
  "Boa variedade e comida bem servida.",
  "Delivery prático e pedido organizado.",
  "Ótima opção para comer à noite em Araguaína.",
];

function cleanConfiguredText(text: string) {
  return text
    .replaceAll("Ã¡", "á")
    .replaceAll("Ã ", "à")
    .replaceAll("Ã£", "ã")
    .replaceAll("Ã¢", "â")
    .replaceAll("Ã©", "é")
    .replaceAll("Ãª", "ê")
    .replaceAll("Ã­", "í")
    .replaceAll("Ã³", "ó")
    .replaceAll("Ã´", "ô")
    .replaceAll("Ãµ", "õ")
    .replaceAll("Ãº", "ú")
    .replaceAll("Ã§", "ç")
    .replaceAll("â€”", "—");
}

export function HanzakiExperienceLanding() {
  const reservationUrl = buildWhatsappLink(whatsappMessages.reservation);
  const contactUrl = buildWhatsappLink(whatsappMessages.contact);
  const displayAddress = cleanConfiguredText(ADDRESS);
  const displayOpeningHours = cleanConfiguredText(OPENING_HOURS);

  return (
    <>
      <section className="hanzaki-exp-hero" aria-labelledby="hanzaki-exp-hero-title">
        <div className="container-page hanzaki-exp-hero-grid">
          <div className="hanzaki-exp-hero-copy">
            <Image
              src={logoMedia.src}
              alt="Hanzaki"
              width={72}
              height={72}
              priority
              className="hanzaki-exp-hero-logo"
            />
            <p className="hanzaki-exp-kicker">Hanzaki Experience</p>
            <h1 id="hanzaki-exp-hero-title">
              Uma experiência oriental e brasileira guiada pela Hanzaki.
            </h1>
            <p>
              Salão, delivery, sabores orientais e comida brasileira em uma
              noite com mais personalidade.
            </p>
            <div className="hanzaki-exp-actions">
              <a href={reservationUrl} target="_blank" rel="noreferrer">
                Reservar pelo WhatsApp
              </a>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                Ver localização
              </a>
            </div>
          </div>

          <div className="hanzaki-exp-hero-visual">
            <Image
              src={heroMedia.src}
              alt={heroMedia.alt}
              fill
              priority
              sizes="(max-width: 768px) 92vw, 46vw"
              className="hanzaki-exp-hero-image"
            />
            <div className="hanzaki-exp-hero-salamander" aria-hidden="true">
              <HanzakiSalamanderRig accentColor="#dc2626" direction="left" state="idle" />
            </div>
            <div className="hanzaki-exp-hero-note">
              <span>Oriental + brasileiro</span>
              <strong>Atendimento à noite em Araguaína</strong>
            </div>
          </div>
        </div>
      </section>

      <HanzakiExperiencePlayground />

      <section className="hanzaki-exp-section hanzaki-exp-gallery" aria-labelledby="hanzaki-exp-gallery-title">
        <div className="container-page">
          <div className="hanzaki-exp-section-head">
            <p className="hanzaki-exp-kicker">Galeria premium</p>
            <h2 id="hanzaki-exp-gallery-title">Sabores para abrir a noite.</h2>
            <p>Pratos orientais, brasileiros e combinações para compartilhar.</p>
          </div>
          <div className="hanzaki-exp-gallery-rail">
            {[galleryImages, galleryImages].map((set, setIndex) => (
              <div
                className="hanzaki-exp-gallery-track"
                aria-hidden={setIndex === 1}
                key={setIndex === 0 ? "gallery-main" : "gallery-copy"}
              >
                {set.map((image, index) => (
                  <figure className="hanzaki-exp-gallery-item" key={`${setIndex}-${image.src}`}>
                    <Image
                      src={image.src}
                      alt={setIndex === 0 ? image.alt : ""}
                      width={320}
                      height={420}
                      sizes="(max-width: 768px) 70vw, 260px"
                      className="hanzaki-exp-gallery-image"
                    />
                    {setIndex === 0 && index < 3 ? (
                      <figcaption>
                        {index === 0 ? "Compartilhar" : index === 1 ? "Oriental" : "Noite"}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hanzaki-exp-section hanzaki-exp-atmosphere" aria-labelledby="hanzaki-exp-atmosphere-title">
        <div className="container-page hanzaki-exp-atmosphere-grid">
          <div className="hanzaki-exp-atmosphere-image">
            <Image
              src={environmentImages[0].src}
              alt={environmentImages[0].alt}
              fill
              sizes="(max-width: 768px) 92vw, 54vw"
              className="hanzaki-exp-cover"
            />
          </div>
          <div>
            <p className="hanzaki-exp-kicker">Ambiente e atmosfera</p>
            <h2 id="hanzaki-exp-atmosphere-title">
              Um lugar para jantar, reunir e aproveitar.
            </h2>
            <p>
              Ambiente aconchegante, atendimento à noite e uma proposta feita
              para quem quer comer bem sem complicação.
            </p>
            <div className="hanzaki-exp-chips" aria-label="Características da experiência">
              {["Salão", "Família", "Casal", "Delivery", "Noite"].map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hanzaki-exp-section hanzaki-exp-flavors" aria-labelledby="hanzaki-exp-flavors-title">
        <div className="container-page">
          <div className="hanzaki-exp-section-head">
            <p className="hanzaki-exp-kicker">Sabores</p>
            <h2 id="hanzaki-exp-flavors-title">Oriental e brasileiro no mesmo lugar.</h2>
          </div>
          <div className="hanzaki-exp-flavor-grid">
            {flavorCards.map((card) => (
              <article className="hanzaki-exp-flavor-card" key={card.title}>
                <span />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hanzaki-exp-section hanzaki-exp-testimonials" aria-labelledby="hanzaki-exp-testimonials-title">
        <div className="container-page">
          <div className="hanzaki-exp-section-head">
            <p className="hanzaki-exp-kicker">Recomendações</p>
            <h2 id="hanzaki-exp-testimonials-title">Quem conhece, recomenda.</h2>
          </div>
          <div className="hanzaki-exp-testimonial-grid">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial}>“{testimonial}”</blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="hanzaki-exp-section hanzaki-exp-location" aria-labelledby="hanzaki-exp-location-title">
        <div className="container-page hanzaki-exp-location-grid">
          <div>
            <p className="hanzaki-exp-kicker">Localização</p>
            <h2 id="hanzaki-exp-location-title">Estamos em Araguaína.</h2>
            <dl className="hanzaki-exp-details">
              <div>
                <dt>Endereço</dt>
                <dd>{displayAddress}</dd>
              </div>
              <div>
                <dt>Horário</dt>
                <dd>{displayOpeningHours}</dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                    {HANZAKI_CONFIG.instagramHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a href={contactUrl} target="_blank" rel="noreferrer">
                    Falar com o Hanzaki
                  </a>
                </dd>
              </div>
            </dl>
            <div className="hanzaki-exp-actions">
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                Abrir rota
              </a>
              <a href={reservationUrl} target="_blank" rel="noreferrer">
                Reservar pelo WhatsApp
              </a>
            </div>
          </div>
          <div className="hanzaki-exp-location-image">
            <Image
              src={facadeMedia.src}
              alt={facadeMedia.alt}
              fill
              sizes="(max-width: 768px) 92vw, 42vw"
              className="hanzaki-exp-cover"
            />
          </div>
        </div>
      </section>

      <footer className="hanzaki-exp-footer">
        <div className="container-page">
          <Image src={logoMedia.src} alt="Hanzaki" width={54} height={54} />
          <p>Hanzaki Experience. Noite, sabor e encontro em Araguaína.</p>
          <nav aria-label="Links finais Hanzaki">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={contactUrl} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
              Localização
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
