"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useT } from "@/lib/i18n";

export function HeroSection() {
  const { t } = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-[85vh] overflow-hidden sm:h-screen">
      {/* Image with parallax — optimized size */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&h=900&fit=crop&q=80"
          alt="Dolomiti"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={85}
        />
      </motion.div>

      {/* Overlay layers for depth */}
      <div className="absolute inset-0 bg-forest/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/20 via-transparent to-forest/50" />

      {/* Noise for texture */}
      <div className="noise absolute inset-0" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ y: textY, opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="label-luxury !text-terra-light/80"
        >
          {t.hero.tag}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-5 heading-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.92] text-white"
        >
          {t.hero.title1}
          <br />
          <span className="font-serif italic font-light text-terra-light">{t.hero.title2}</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-7 h-px w-16 origin-center bg-terra/60"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-6 max-w-sm text-[13px] font-light leading-relaxed tracking-wide text-white/45 sm:text-sm"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.a
          href="/properties"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="mt-9 bg-terra px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white transition-all duration-300 hover:bg-terra-hover active:scale-[0.97]"
        >
          {t.hero.cta}
        </motion.a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[8px] font-semibold uppercase tracking-[0.5em] text-white/20">{t.hero.scroll}</span>
          <ChevronDown className="h-3.5 w-3.5 animate-float text-white/15" />
        </div>
      </motion.div>
    </section>
  );
}
