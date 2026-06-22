import type { Metadata } from "next";
import { HanzakiExperienceLanding } from "@/components/hanzaki/HanzakiExperienceLanding";

export const metadata: Metadata = {
  title: "Hanzaki Experience",
  description:
    "Landing experimental da Hanzaki com experiências de salão, delivery, sabores orientais e brasileiros em Araguaína.",
};

export default function Pagina() {
  return (
    <main className="hanzaki-page-shell">
      <HanzakiExperienceLanding />
    </main>
  );
}
