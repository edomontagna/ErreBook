"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Mountain, Building, Theater } from "lucide-react";
import { HeroSection } from "@/components/public/hero-section";
import { FeaturedProperties } from "@/components/public/featured-properties";
import { Testimonials } from "@/components/public/testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const locations = [
  {
    name: "Dolomiti",
    description:
      "San Martino di Castrozza e la Val di Fiemme: panorami mozzafiato, sci, trekking e un'atmosfera magica tra le Pale.",
    icon: Mountain,
    href: "/properties?city=San+Martino+di+Castrozza",
  },
  {
    name: "Milano",
    description:
      "Rho e dintorni: la posizione ideale per la Fiera di Milano, il design district e le eccellenze della Lombardia.",
    icon: Building,
    href: "/properties?city=Rho",
  },
  {
    name: "Verona",
    description:
      "San Giovanni Lupatoto: alle porte della città di Romeo e Giulietta, tra Vinitaly, cultura e sapori veneti.",
    icon: Theater,
    href: "/properties?city=San+Giovanni+Lupatoto",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <FeaturedProperties />

      {/* Locations Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Le Nostre Destinazioni
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Tre territori straordinari, un&apos;unica filosofia di ospitalità.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Card className="group h-full transition-shadow hover:shadow-lg">
                  <CardContent className="flex h-full flex-col items-center p-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <loc.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 font-serif text-xl font-bold">
                      {loc.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {loc.description}
                    </p>
                    <Button asChild variant="outline" className="mt-6">
                      <Link href={loc.href}>Esplora</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-stone-900 px-8 py-16 text-center text-white sm:px-16"
          >
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Pronto per la Tua Prossima Avventura?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Sfoglia le nostre proprietà e trova il soggiorno perfetto per te.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/properties">Scopri Tutte le Proprietà</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
