export type HanzakiTestimonial = {
  name: string;
  text: string;
  source: "Depoimento";
};

// Textos editoriais para composição visual. Não representam avaliações do Google.
export const hanzakiTestimonials = [
  { name: "Cliente Hanzaki", text: "Variedade para reunir todo mundo à mesa.", source: "Depoimento" },
  { name: "Cliente Hanzaki", text: "Um ambiente acolhedor para aproveitar a noite.", source: "Depoimento" },
  { name: "Cliente Hanzaki", text: "Pratos bem servidos e opções para diferentes gostos.", source: "Depoimento" },
  { name: "Cliente Hanzaki", text: "Comida oriental e brasileira em um só lugar.", source: "Depoimento" },
  { name: "Cliente Hanzaki", text: "Uma escolha prática para jantar em Araguaína.", source: "Depoimento" },
  { name: "Cliente Hanzaki", text: "Bom para ir com família, amigos ou em casal.", source: "Depoimento" },
] satisfies HanzakiTestimonial[];
