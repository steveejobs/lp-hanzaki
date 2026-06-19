import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hanzaki | Araguaína",
    short_name: "Hanzaki",
    description: "Restaurante oriental e brasileiro em Araguaína.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf2",
    theme_color: "#d3232a",
    icons: [
      { src: "/hanzaki/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/hanzaki/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
