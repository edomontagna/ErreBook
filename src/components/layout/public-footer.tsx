import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Input } from "@/components/ui/input";

export function PublicFooter() {
  return (
    <footer className="bg-forest-deep">
      <div className="h-px bg-gradient-to-r from-transparent via-terra/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center bg-terra text-[11px] font-display font-bold text-white">E</div>
              <span className="font-display text-sm tracking-[0.2em] text-white">ERREBOOK</span>
            </Link>
            <p className="mt-4 text-sm font-light leading-relaxed text-white/40 max-w-xs">
              Appartamenti selezionati tra Dolomiti, Milano e Verona per soggiorni indimenticabili.
            </p>
            <div className="mt-6">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center border border-white/10 text-white/40 transition-all hover:border-terra/40 hover:text-terra">
                <Instagram className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50">Esplora</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[{ l: "Proprietà", h: "/properties" }, { l: "Chi Siamo", h: "/about" }, { l: "Contatti", h: "/contact" }].map((lnk) => (
                <li key={lnk.h}><Link href={lnk.h} className="font-light text-white/40 hover:text-terra transition-colors duration-300">{lnk.l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50">Contatti</h3>
            <ul className="mt-5 space-y-3 text-sm font-light text-white/40">
              <li className="flex items-center gap-2.5"><Mail className="h-3.5 w-3.5 text-terra/60" />{siteConfig.company.email}</li>
              <li className="flex items-center gap-2.5"><Phone className="h-3.5 w-3.5 text-terra/60" />{siteConfig.company.phone}</li>
              <li className="flex items-start gap-2.5"><MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-terra/60" /><span>{siteConfig.company.address}</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50">Newsletter</h3>
            <p className="mt-5 text-sm font-light text-white/30">Ricevi le migliori offerte nella tua inbox.</p>
            <div className="mt-4 flex gap-0">
              <Input type="email" placeholder="La tua email" className="h-9 rounded-none border-white/10 bg-white/[0.04] text-sm text-white placeholder:text-white/20" />
              <button className="h-9 shrink-0 bg-terra px-3 text-white hover:bg-terra-hover transition-colors"><ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center gap-3 border-t border-white/[0.05] pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs font-light text-white/20">&copy; {new Date().getFullYear()} {siteConfig.company.name}. Tutti i diritti riservati.</p>
          <p className="text-[10px] text-white/15">P.IVA {siteConfig.company.vatNumber}</p>
        </div>
      </div>
    </footer>
  );
}
