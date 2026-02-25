"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, ArrowRight, Star } from "lucide-react";
import { properties } from "@/data/properties";
import { formatCurrency } from "@/lib/format";

const featured = properties.filter((p) => p.featured);

export function FeaturedProperties() {
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="label-luxury">Selezione Esclusiva</p>
            <h2 className="mt-3 font-serif text-2xl font-light tracking-tight sm:text-3xl lg:text-4xl">
              Proprietà in Evidenza
            </h2>
          </div>
          <Link
            href="/properties"
            className="hidden sm:flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-terra hover:text-terra-hover transition-colors"
          >
            Vedi Tutte <ArrowRight className="h-3 w-3" />
          </Link>
        </motion.div>

        {/* 2x2 Editorial grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                href={`/properties/${p.slug}`}
                className="group relative block aspect-[16/10] overflow-hidden rounded-xl"
              >
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                {/* City badge */}
                <div className="absolute left-5 top-5">
                  <span className="bg-white/90 backdrop-blur-sm rounded-sm px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-forest">
                    {p.address.city}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute right-5 top-5">
                  <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-sm px-2 py-1 text-[10px] font-medium text-white">
                    <Star className="h-2.5 w-2.5 fill-terra text-terra" />
                    {p.rating.toFixed(1)}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-terra-light/80">
                    {formatCurrency(p.pricing.basePrice)} / notte
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-light text-white sm:text-2xl">
                    {p.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] text-white/40">
                    <MapPin className="h-3 w-3" />
                    {p.address.city}, {p.address.province}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-terra"
          >
            Vedi Tutte le Proprietà <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
