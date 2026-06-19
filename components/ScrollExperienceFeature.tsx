"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { scrollExperienceMedia } from "@/src/data/hanzaki-media";

export function ScrollExperienceFeature() {
  return <ScrollExpandMedia mediaSrc={scrollExperienceMedia.video} mobileMediaSrc={scrollExperienceMedia.mobileVideo} posterSrc={scrollExperienceMedia.background.src} mobilePosterSrc={scrollExperienceMedia.background.src} bgImageSrc={scrollExperienceMedia.background.src} title="Da variedade ao primeiro prato." date="HANZAKI À NOITE" scrollToExpand="Uma experiência acolhedora que começa no ambiente e continua à mesa." />;
}
