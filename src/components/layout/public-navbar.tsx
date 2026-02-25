"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { publicNav } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = scrolled || !isHome;

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
          {publicNav.map((item) => (
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
          <Link
            href="/properties"
            className="bg-terra px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-terra-hover hover:-translate-y-0.5"
          >
            Prenota
          </Link>
        </nav>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className={cn("h-5 w-5", solid ? "text-forest" : "text-white")} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-forest border-forest-light">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="flex flex-col gap-1 mt-12">
              {publicNav.map((item) => (
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
                  Prenota Ora
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
