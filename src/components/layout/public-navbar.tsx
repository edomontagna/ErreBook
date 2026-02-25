"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { publicNav } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Building2 } from "lucide-react";

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
            scrolled || !isHome ? "bg-primary text-primary-foreground" : "bg-white/20 text-white"
          )}>
            <Building2 className="h-4 w-4" />
          </div>
          <span className={cn(
            "font-serif text-xl font-bold transition-colors",
            scrolled || !isHome ? "text-foreground" : "text-white"
          )}>
            ErreBook
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:opacity-80",
                scrolled || !isHome ? "text-foreground" : "text-white"
              )}
            >
              {item.title}
            </Link>
          ))}
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <Link href="/properties">Prenota Ora</Link>
          </Button>
        </nav>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className={cn("h-5 w-5", !scrolled && isHome && "text-white")} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="sr-only">Menu di navigazione</SheetTitle>
            <nav className="flex flex-col gap-4 mt-8">
              {publicNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium"
                >
                  {item.title}
                </Link>
              ))}
              <Button asChild className="mt-4">
                <Link href="/properties">Prenota Ora</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
