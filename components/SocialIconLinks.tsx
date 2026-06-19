import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { INSTAGRAM_URL, buildWhatsappLink, whatsappMessages } from "@/lib/site";

function InstagramIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" /></svg>;
}

export function SocialIconLinks({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const colors = dark ? "border-white/15 bg-white/10 text-white hover:border-[var(--hanzaki-red)]" : "border-black/10 bg-white text-neutral-800 hover:border-[var(--hanzaki-red)] hover:text-[var(--hanzaki-red)]";
  return <div className={`flex items-center gap-2 ${className}`}>
    <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Abrir Instagram do Hanzaki" title="Instagram" className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:-translate-y-0.5 ${colors}`}><InstagramIcon /></a>
    <a href={buildWhatsappLink(whatsappMessages.contact)} target="_blank" rel="noreferrer" aria-label="Falar com o Hanzaki pelo WhatsApp" title="WhatsApp" className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:-translate-y-0.5 ${colors}`}><WhatsAppIcon className="h-[18px] w-[18px]" /></a>
  </div>;
}
