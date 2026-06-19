export const HANZAKI_CONFIG = {
  name: "Hanzaki | Araguaína",
  instagramHandle: "@hanzakiaraguaina",
  instagramUrl: "https://www.instagram.com/hanzakiaraguaina/",
  deliveryUrl: "https://instadelivery.com.br/Hanzaki",
  googleMapsUrl: "https://share.google/clSlVowJzjuTB9lFx",
  googleRating: "4,5",
  googleReviews: "533",
  phone: "5563992600874",
  whatsappNumber: "5563992600874",
  // Confirmar se o número correto é 940 ou 926 antes de publicar.
  address: "Av. José de Brito, 940, St. Anhanguera, Araguaína - TO, 77818-530",
  addressNeedsConfirmation: true,
  openingHours: "Todos os dias, das 17h às 23h",
  openingHoursNeedsConfirmation: true,
} as const;

export function createHanzakiWhatsAppLink(message: string) {
  return `https://api.whatsapp.com/send/?phone=${HANZAKI_CONFIG.whatsappNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

export const HANZAKI_WHATSAPP_MESSAGES = {
  reservation: "Olá, vim pelo site e quero reservar uma mesa no Hanzaki.",
  delivery: "Olá, vim pelo site e quero fazer um pedido no Hanzaki.",
  pickup: "Olá, vim pelo site e quero fazer um pedido para retirada no Hanzaki.",
  experience: "Olá, vim pelo site e quero saber sobre a experiência/rodízio do Hanzaki.",
  contact: "Olá, vim pelo site e quero falar com o Hanzaki.",
} as const;
