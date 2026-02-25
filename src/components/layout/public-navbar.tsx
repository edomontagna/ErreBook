"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { t, locale, setLocale } = useT();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = scrolled || !isHome;

  const navItems = [
    { title: t.nav.properties, href: "/properties" },
    { title: t.nav.about, href: "/about" },
    { title: t.nav.contact, href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        solid
          ? "bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-none text-[11px] font-display font-bold transition-all duration-300",
            solid
              ? "bg-forest text-white"
              : "bg-white/10 backdrop-blur-md border border-white/20 text-white"
          )}>
            E
          </div>
          <span className={cn(
            "font-display text-sm tracking-[0.2em] transition-colors duration-300",
            solid ? "text-forest" : "text-white"
          )}>
            ERREBOOK
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
                solid ? "text-forest/50 hover:text-forest" : "text-white/60 hover:text-white",
                pathname === item.href && (solid ? "text-forest" : "text-white")
              )}
            >
              {item.title}
            </Link>
          ))}

          {/* Language switch */}
          <button
            onClick={() => setLocale(locale === "it" ? "en" : "it")}
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
              solid ? "text-forest/40 hover:text-forest" : "text-white/40 hover:text-white"
            )}
          >
            <span className={locale === "it" ? (solid ? "text-forest" : "text-white") : ""}>IT</span>
            <span className="mx-1">|</span>
            <span className={locale === "en" ? (solid ? "text-forest" : "text-white") : ""}>EN</span>
          </button>

          <Link
            href="/properties"
            className="bg-terra px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-terra-hover hover:-translate-y-0.5"
          >
            {t.nav.book}
          </Link>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile language switch */}
          <button
            onClick={() => setLocale(locale === "it" ? "en" : "it")}
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300",
              solid ? "text-forest/40 hover:text-forest" : "text-white/40 hover:text-white"
            )}
          >
            <span className={locale === "it" ? (solid ? "text-forest" : "text-white") : ""}>IT</span>
            <span className="mx-0.5">|</span>
            <span className={locale === "en" ? (solid ? "text-forest" : "text-white") : ""}>EN</span>
          </button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className={cn("h-5 w-5", solid ? "text-forest" : "text-white")} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-forest border-forest-light">
              <SheetTitle className="sr-only">{t.nav.menu}</SheetTitle>
              <nav className="flex flex-col gap-1 mt-12">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white",
                      pathname === item.href && "text-terra"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="mx-4 mt-6">
                  <Link
                    href="/properties"
                    className="block bg-terra px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-white hover:bg-terra-hover"
                  >
                    {t.nav.bookNow}
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
