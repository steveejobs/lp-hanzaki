"use client";

import Image from "next/image";
import { foodGalleryImages } from "@/src/data/hanzaki-media";

type GalleryItem = {
  src: string;
  alt: string;
};

const categories = [
  "Sushi",
  "Temaki",
  "Yakisoba",
  "Pratos quentes",
  "Brasileira",
  "Combos",
  "Delivery",
];

function GalleryCard({
  item,
  index,
  compact = false,
}: {
  item: GalleryItem;
  index: number;
  compact?: boolean;
}) {
  return (
    <figure
      className={`group relative shrink-0 overflow-hidden rounded-[18px] bg-neutral-950 shadow-[0_18px_42px_rgba(16,16,16,0.09)] ${
        compact
          ? "h-[220px] w-[180px]"
          : index % 5 === 0
            ? "h-[250px] w-[360px]"
            : index % 3 === 0
              ? "h-[250px] w-[300px]"
              : "h-[250px] w-[250px]"
      }`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 180px, 320px"
        quality={82}
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[1.02]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
    </figure>
  );
}

function GalleryLoop({
  items,
  direction,
  indexOffset = 0,
  compact = false,
}: {
  items: GalleryItem[];
  direction: "left" | "right";
  indexOffset?: number;
  compact?: boolean;
}) {
  return (
    <div
      className={`gallery-marquee ${
        compact ? "gallery-marquee-mobile" : "gallery-marquee-desktop"
      } ${
        direction === "left" ? "gallery-marquee-left" : "gallery-marquee-right"
      } flex w-max gap-4`}
    >
      <div className="flex gap-4">
        {items.map((item, index) => (
          <GalleryCard
            key={`${item.src}-${direction}`}
            item={item}
            index={index + indexOffset}
            compact={compact}
          />
        ))}
      </div>
      <div className="flex gap-4" aria-hidden="true">
        {items.map((item, index) => (
          <GalleryCard
            key={`${item.src}-${direction}-loop`}
            item={item}
            index={index + indexOffset}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}

export function FoodGallerySection() {
  const galleryItems = foodGalleryImages.map((item) => ({
    src: item.src,
    alt: item.alt,
  }));

  const midpoint = Math.ceil(galleryItems.length / 2);
  const firstRow = galleryItems.slice(0, midpoint);
  const secondRow = galleryItems.slice(midpoint);
  return (
    <section
      id="sabores"
      className="overflow-hidden bg-[#f7f2ec] py-10 md:pb-16 md:pt-12"
    >
      <div className="container-page">
        <div className="grid gap-7 md:grid-cols-[0.82fr_1.18fr] md:items-end">
          <div>
            <span className="eyebrow">DA COZINHA HANZAKI</span>
            <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1.02] text-neutral-950 md:text-6xl">
              Sabores orientais e brasileiros para abrir o apetite.
            </h2>
          </div>
          <p className="max-w-xl text-base font-semibold leading-7 text-neutral-600 md:justify-self-end md:text-lg">
            Do sushi ao prato quente, uma seleção variada para jantar, pedir ou compartilhar.
          </p>
        </div>
      </div>

      <div className="mt-8 md:mt-10">
        <div className="overflow-hidden md:hidden">
          <GalleryLoop items={galleryItems} direction="left" compact />
        </div>

        <div className="hidden space-y-4 md:block">
          <GalleryLoop
            items={firstRow}
            direction="left"
          />
          <GalleryLoop
            items={secondRow}
            direction="right"
            indexOffset={2}
          />
        </div>
      </div>

      <div className="container-page">
        <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
          {categories.map((category, index) => (
            <span
              key={category}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                index === 0
                  ? "border-[var(--hanzaki-red)] bg-white text-[var(--hanzaki-red)] shadow-[0_10px_24px_rgba(211,35,42,0.08)]"
                  : "border-black/10 bg-white/78 text-neutral-700 hover:border-[var(--hanzaki-red)]/40 hover:text-neutral-950"
              }`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
