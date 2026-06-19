import { HANZAKI_CONFIG, HANZAKI_WHATSAPP_MESSAGES, createHanzakiWhatsAppLink } from "@/src/data/hanzaki-config";
import { environmentImages, facadeMedia, foodGalleryImages, heroMedia, logoMedia, scrollExperienceMedia } from "@/src/data/hanzaki-media";

export const FULL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lp-hanzaki.vercel.app";
export const ADDRESS = HANZAKI_CONFIG.address;
export const GOOGLE_MAPS_URL = HANZAKI_CONFIG.googleMapsUrl;
export const INSTAGRAM_URL = HANZAKI_CONFIG.instagramUrl;
export const DELIVERY_URL = HANZAKI_CONFIG.deliveryUrl;
export const OPENING_HOURS = HANZAKI_CONFIG.openingHoursNeedsConfirmation
  ? "Atendimento à noite — confirme horários pelo WhatsApp."
  : HANZAKI_CONFIG.openingHours;

export const createWhatsAppLink = createHanzakiWhatsAppLink;
export const buildWhatsappLink = createHanzakiWhatsAppLink;
export const whatsappMessages = HANZAKI_WHATSAPP_MESSAGES;

export const navLinks = [
  { label: "Experiências", href: "#experiencias" },
  { label: "Ambiente", href: "#ambiente" },
  { label: "Sabores", href: "#sabores" },
  { label: "Localização", href: "#localizacao" },
];

export const images = {
  logo: logoMedia.src,
  ambienteInterno: environmentImages[0].src,
  fachada: facadeMedia.src,
  heroIntro: heroMedia.src,
  foodGallery: foodGalleryImages.map((item) => item.src),
  scrollExperienceBg: scrollExperienceMedia.background.src,
  scrollMainVideo: scrollExperienceMedia.video,
  scrollMainVideoMobile: scrollExperienceMedia.mobileVideo,
  locationFacade: facadeMedia.src,
};
