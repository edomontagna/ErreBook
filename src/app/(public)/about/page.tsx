"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Award, Leaf, Heart, Building2, Users, Star, MapPin } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const dur = 1800, start = performance.now();
        const tick = (now: number) => { const p = Math.min((now - start) / dur, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 8, label: "Proprietà", icon: Building2 },
  { value: 200, label: "Ospiti Soddisfatti", icon: Users, suffix: "+" },
  { value: 4.9, label: "Valutazione Media", icon: Star, isDecimal: true },
  { value: 3, label: "Destinazioni", icon: MapPin },
];

const values = [
  { icon: Award, title: "Qualità", description: "Ogni proprietà viene selezionata con cura e mantenuta ai massimi standard per un'esperienza indimenticabile." },
  { icon: Leaf, title: "Sostenibilità", description: "Promuoviamo pratiche sostenibili in ogni aspetto, dai prodotti locali alle nostre Green House." },
  { icon: Heart, title: "Ospitalità", description: "Accoglienza calorosa, consigli personalizzati e attenzione ai dettagli rendono ogni visita speciale." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Full-bleed hero */}
      <div className="relative h-[50vh] overflow-hidden sm:h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=700&fit=crop&q=80"
          alt="Dolomiti panorama"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-forest/45" />
        <div className="noise absolute inset-0" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="label-luxury !text-terra-light/80">La Nostra Storia</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-4 font-serif text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">Chi Siamo</motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-4 h-px w-16 origin-center bg-terra" />
        </div>
      </div>

      {/* Intro statement */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 text-center">
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="font-serif text-2xl font-light leading-relaxed tracking-tight text-foreground/70 sm:text-3xl sm:leading-relaxed">
            ErreBook nasce dalla <span className="italic text-foreground">passione per l&apos;ospitalità</span> e dal desiderio di offrire esperienze autentiche in alcune delle destinazioni più <span className="text-terra">belle d&apos;Italia</span>.
          </motion.p>
        </div>
      </section>

      {/* Stats — dark section */}
      <section className="relative bg-forest py-20 sm:py-28 noise">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid grid-cols-2 gap-px border border-white/[0.06] sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center p-8 text-center sm:p-10">
                <stat.icon className="h-5 w-5 text-terra" />
                <div className="mt-4 font-serif text-4xl font-light text-canvas sm:text-5xl">
                  {stat.isDecimal ? "4.9" : <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
                </div>
                <div className="mt-2 text-[9px] font-medium uppercase tracking-[0.4em] text-canvas/30">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-28 sm:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="label-luxury">La Nostra Visione</p>
              <h2 className="mt-4 font-serif text-3xl font-light tracking-tight lg:text-4xl">La Nostra Missione</h2>
              <div className="mt-4 h-px w-12 bg-terra/40" />
              <p className="mt-8 leading-relaxed text-muted-foreground">Rendere ogni soggiorno un&apos;esperienza indimenticabile. Gestiamo personalmente ogni proprietà per garantire standard elevati e un servizio attento.</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">Dalle Dolomiti a Milano fino a Verona — comfort, posizione strategica e carattere unico.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="border border-border/60 p-8 sm:p-10">
                <span className="font-serif text-5xl leading-none text-terra/20 select-none">&ldquo;</span>
                <blockquote className="-mt-2 font-serif text-lg font-light italic leading-relaxed text-foreground/60 sm:text-xl">
                  Ogni appartamento racconta una storia. Il nostro compito è assicurarci che ogni ospite diventi parte di quella storia.
                </blockquote>
                <div className="mt-6 h-px w-8 bg-terra/20" />
                <div className="mt-4 text-xs font-medium uppercase tracking-[0.2em]">Il Team ErreBook</div>
                <div className="mt-1 text-[10px] tracking-wide text-muted-foreground">San Martino di Castrozza</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative bg-forest py-28 sm:py-40 noise">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <p className="label-luxury">I Nostri Principi</p>
            <h2 className="mt-6 font-serif text-3xl font-light tracking-tight text-canvas sm:text-4xl lg:text-5xl">I Nostri Valori</h2>
            <div className="mx-auto mt-6 h-px w-16 bg-terra/30" />
          </motion.div>
          <div className="mt-20 grid gap-px border border-white/[0.06] md:grid-cols-3">
            {values.map((val, i) => (
              <motion.div key={val.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.12 }} className="p-10 sm:p-14 text-center">
                <val.icon className="mx-auto h-6 w-6 text-terra" />
                <h3 className="mt-6 font-serif text-xl font-light text-canvas">{val.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-canvas/40">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
