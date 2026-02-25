"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Award, Headset, BadgeCheck, Compass, Search as SearchIcon, CalendarCheck, Smile } from "lucide-react";
import { HeroSection } from "@/components/public/hero-section";
import { FeaturedProperties } from "@/components/public/featured-properties";
import { Testimonials } from "@/components/public/testimonials";
import { SearchBar } from "@/components/public/search-bar";
import { useT } from "@/lib/i18n";

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

export default function HomePage() {
  const { t } = useT();

  const destinations = [
    { name: "Dolomiti", sub: t.home.destDolomiti, href: "/properties?city=San+Martino+di+Castrozza", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&q=80" },
    { name: "Milano", sub: t.home.destMilano, href: "/properties?city=Rho", img: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=600&h=800&fit=crop&q=80" },
    { name: "Verona", sub: t.home.destVerona, href: "/properties?city=San+Giovanni+Lupatoto", img: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&h=800&fit=crop&q=80" },
  ];

  const whyFeatures = [
    { icon: Award, title: t.home.whyF1Title, desc: t.home.whyF1Desc },
    { icon: Headset, title: t.home.whyF2Title, desc: t.home.whyF2Desc },
    { icon: BadgeCheck, title: t.home.whyF3Title, desc: t.home.whyF3Desc },
    { icon: Compass, title: t.home.whyF4Title, desc: t.home.whyF4Desc },
  ];

  const howSteps = [
    { icon: SearchIcon, num: "01", title: t.home.howS1Title, desc: t.home.howS1Desc },
    { icon: CalendarCheck, num: "02", title: t.home.howS2Title, desc: t.home.howS2Desc },
    { icon: Smile, num: "03", title: t.home.howS3Title, desc: t.home.howS3Desc },
  ];

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
            {t.home.introP1} <span className="text-foreground">{t.home.introHighlight1}</span> {t.home.introP2}{" "}
            <span className="text-terra font-normal">{t.home.introHighlight2}</span> {t.home.introP3}
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

      {/* ── Why ErreBook ── */}
      <section className="py-28 sm:py-36 bg-canvas-dark/30">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="label-luxury">{t.home.whyTag}</p>
            <h2 className="mt-3 font-serif text-2xl font-light tracking-tight sm:text-3xl lg:text-4xl">
              {t.home.whyTitle}
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terra/30" />
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center bg-forest text-terra">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-serif text-lg font-light">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            <p className="label-luxury">{t.home.destTag}</p>
            <h2 className="mt-3 font-serif text-2xl font-light tracking-tight sm:text-3xl lg:text-4xl">
              {t.home.destTitle}
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

      {/* ── How It Works ── */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="label-luxury">{t.home.howTag}</p>
            <h2 className="mt-3 font-serif text-2xl font-light tracking-tight sm:text-3xl lg:text-4xl">
              {t.home.howTitle}
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terra/30" />
          </motion.div>

          <div className="mt-16 grid gap-10 sm:grid-cols-3">
            {howSteps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-stone-200 bg-white shadow-card">
                  <s.icon className="h-6 w-6 text-terra" />
                </div>
                <div className="mt-2 text-[10px] font-bold tracking-[0.3em] text-terra/40">{s.num}</div>
                <h3 className="mt-3 font-serif text-xl font-light">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                {i < howSteps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden w-[calc(100%-4rem)] translate-x-1/2 sm:block">
                    <div className="h-px w-full bg-gradient-to-r from-stone-200 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="label-luxury">{t.home.ctaTag}</p>

            <h2 className="mt-4 font-serif text-2xl font-light tracking-tight sm:text-3xl lg:text-4xl">
              {t.home.ctaTitle}
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terra/30" />

            {/* Stats */}
            <div className="mx-auto mt-12 flex max-w-xs items-center justify-center gap-10">
              {[
                { v: <Counter target={8} />, l: t.home.ctaProperties },
                { v: <Counter target={200} suffix="+" />, l: t.home.ctaGuests },
                { v: "4.9", l: t.home.ctaRating },
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
              {t.home.ctaCta} <ArrowRight className="h-3 w-3" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
