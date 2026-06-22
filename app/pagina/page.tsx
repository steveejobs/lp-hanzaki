import type { Metadata } from "next";
import { HanzakiExperiencePlayground } from "@/components/hanzaki/HanzakiExperiencePlayground";

export const metadata: Metadata = {
  title: "Escolha sua experiência Hanzaki",
  description:
    "Página experimental da Hanzaki com uma salamandra branca caminhando entre experiências.",
};

export default function Pagina() {
  return (
    <main className="hanzaki-page-shell">
      <HanzakiExperiencePlayground />
    </main>
  );
}
