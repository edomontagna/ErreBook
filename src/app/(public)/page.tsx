"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/public/hero-section";
import { FeaturedProperties } from "@/components/public/featured-properties";
import { Testimonials } from "@/components/public/testimonials";
import { SearchBar } from "@/components/public/search-bar";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const d = 2200, s = performance.now();
        const t = (n: number) => {
          const p = Math.min((n - s) / d, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target));
          if (p < 1) requestAnimationFrame(t);
        };
        requestAnimationFrame(t);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const destinations = [
  { name: "Dolomiti", sub: "Panorami mozzafiato tra le Pale di San Martino", href: "/properties?city=San+Martino+di+Castrozza", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&q=80" },
  { name: "Milano", sub: "La posizione ideale per la Fiera e il design district", href: "/properties?city=Rho", img: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=600&h=800&fit=crop&q=80" },
  { name: "Verona", sub: "Alle porte della città di Romeo e Giulietta", href: "/properties?city=San+Giovanni+Lupatoto", img: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&h=800&fit=crop&q=80" },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ── Intro ── */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-xl font-light leading-relaxed text-foreground/50 sm:text-2xl sm:leading-relaxed"
          >
            Ospitiamo viaggiatori in <span className="text-foreground">luoghi straordinari</span> d&apos;Italia.
            Ogni proprietà è selezionata per offrire
            un&apos;esperienza <span className="text-terra font-normal">autentica</span> e indimenticabile.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-12"
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* ── Featured ── */}
      <FeaturedProperties />

      {/* ── Destinations ── */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="label-luxury">Destinazioni</p>
            <h2 className="mt-3 font-serif text-2xl font-light tracking-tight sm:text-3xl lg:text-4xl">
              Tre Territori, Un&apos;Unica Passione
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {destinations.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={d.href} className="group block text-center">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <Image
                      src={d.img} alt={d.name} fill quality={80}
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                      <h3 className="font-serif text-2xl font-light text-white">{d.name}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-[13px] font-light leading-relaxed text-foreground/40 transition-colors group-hover:text-terra">
                    {d.sub}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── CTA ── */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="label-luxury">Inizia Il Viaggio</p>

            <h2 className="mt-4 font-serif text-2xl font-light tracking-tight sm:text-3xl lg:text-4xl">
              La Tua Prossima Avventura Ti Aspetta
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terra/30" />

            {/* Stats */}
            <div className="mx-auto mt-12 flex max-w-xs items-center justify-center gap-10">
              {[
                { v: <Counter target={8} />, l: "Proprietà" },
                { v: <Counter target={200} suffix="+" />, l: "Ospiti" },
                { v: "4.9", l: "Rating" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-serif text-3xl font-light sm:text-4xl">{s.v}</div>
                  <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.35em] text-foreground/25">{s.l}</div>
                </div>
              ))}
            </div>

            <Link
              href="/properties"
              className="mt-10 inline-flex items-center gap-2.5 bg-terra px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-terra-hover active:scale-[0.98]"
            >
              Scopri Tutte le Proprietà <ArrowRight className="h-3 w-3" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
