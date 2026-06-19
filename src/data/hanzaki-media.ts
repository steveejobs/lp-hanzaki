export type HanzakiMediaAsset = {
  src: string;
  alt: string;
};

export const logoMedia = {
  src: "/hanzaki/logo-hanzaki.png",
  alt: "Símbolo oficial do Hanzaki",
} satisfies HanzakiMediaAsset;

export const heroMedia = {
  src: "/hanzaki/imagem hero.jpg",
  alt: "Preparo de sushi na cozinha do Hanzaki",
} satisfies HanzakiMediaAsset;

export const facadeMedia = {
  src: "/hanzaki/fachada-hanzaki.jpg",
  alt: "Fachada do Hanzaki à noite em Araguaína",
} satisfies HanzakiMediaAsset;

export const environmentImages = [
  {
    src: "/hanzaki/ambiente-hanzaki-01.jpg",
    alt: "Salão aconchegante do Hanzaki",
  },
  {
    src: "/hanzaki/ambiente-hanzaki-02.jpg",
    alt: "Buffet variado do Hanzaki",
  },
] satisfies HanzakiMediaAsset[];

export const scrollExperienceMedia = {
  background: {
    src: "/hanzaki/scroll-experience-bg.jpg",
    alt: "Momento visual da experiência Hanzaki",
  },
  video: "/hanzaki/scroll-main-video.mp4",
  mobileVideo: "/hanzaki/scroll-main-video-mobile.mp4",
} as const;

export const foodGalleryImages = Array.from({ length: 19 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    src: `/hanzaki/gallery-food-${number}.jpg`,
    alt: `Prato oriental ou brasileiro do Hanzaki ${index + 1}`,
  };
}) satisfies HanzakiMediaAsset[];

export const instagramFoodGalleryMedia = [
  { src: "/hanzaki/instagram-food-01.jpg", alt: "Seleção servida no Hanzaki" },
  ...foodGalleryImages.slice(1, 8),
] satisfies HanzakiMediaAsset[];
