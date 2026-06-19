import type { Metadata } from "next";
import { HANZAKI_CONFIG } from "@/src/data/hanzaki-config";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lp-hanzaki.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hanzaki | Restaurante Oriental e Brasileiro em Araguaína",
  description: "Reserve sua mesa, peça delivery ou veja a localização do Hanzaki em Araguaína. Comida oriental e brasileira em ambiente aconchegante.",
  icons: {
    icon: [
      { url: "/hanzaki/favicon-hanzaki.png", sizes: "32x32", type: "image/png" },
      { url: "/hanzaki/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/hanzaki/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/hanzaki/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Hanzaki | Restaurante Oriental e Brasileiro em Araguaína",
    description: "Comida oriental e brasileira em ambiente aconchegante, com reservas e delivery.",
    url: siteUrl,
    siteName: HANZAKI_CONFIG.name,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/hanzaki/imagem hero.jpg", width: 1600, height: 1067, alt: "Experiência gastronômica Hanzaki" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
