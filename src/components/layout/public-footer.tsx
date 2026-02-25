import Link from "next/link";
import { Building2, Mail, Phone, MapPin, Instagram } from "lucide-react";
import { siteConfig } from "@/config/site";

export function PublicFooter() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="h-4 w-4" />
              </div>
              <span className="font-serif text-xl font-bold">ErreBook</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              {siteConfig.description}. Appartamenti selezionati tra Dolomiti, Milano e Verona per vacanze indimenticabili.
            </p>
            <div className="flex gap-3 mt-4">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-serif font-semibold mb-3">Esplora</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/properties" className="hover:text-foreground">Proprietà</Link></li>
              <li><Link href="/about" className="hover:text-foreground">Chi Siamo</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contatti</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold mb-3">Contatti</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {siteConfig.company.email}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {siteConfig.company.phone}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{siteConfig.company.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {siteConfig.company.name}. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
