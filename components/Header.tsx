import Image from "next/image";
import { SocialIconLinks } from "@/components/SocialIconLinks";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { buildWhatsappLink, images, navLinks, whatsappMessages } from "@/lib/site";

export function Header() {
  const reservationUrl = buildWhatsappLink(whatsappMessages.reservation);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#11100f]/92 text-white backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20 md:gap-6">
        <a href="#topo" className="flex shrink-0 items-center gap-3" aria-label="Hanzaki | Araguaína">
          <Image src={images.logo} alt="Hanzaki | Araguaína" width={64} height={64} priority className="h-11 w-11 object-contain md:h-14 md:w-14" />
          <span className="hidden text-sm font-black tracking-wide sm:block">HANZAKI <span className="text-white/50">| ARAGUAÍNA</span></span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-bold text-white/72 lg:flex">
          {navLinks.map((link) => <a key={link.href} href={link.href} className="transition-colors hover:text-white">{link.label}</a>)}
        </nav>
        <SocialIconLinks className="hidden xl:flex" dark />
        <a href={reservationUrl} className="btn btn-primary hidden md:inline-flex" target="_blank" rel="noreferrer">Reservar</a>
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <a href={reservationUrl} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white" target="_blank" rel="noreferrer" aria-label="Falar com o Hanzaki pelo WhatsApp"><WhatsAppIcon className="h-[18px] w-[18px]" /></a>
          <a href={reservationUrl} className="btn btn-primary min-h-10 w-auto px-4 text-xs" target="_blank" rel="noreferrer">Reservar</a>
        </div>
      </div>
    </header>
  );
}
