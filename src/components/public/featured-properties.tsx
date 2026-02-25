"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, Users } from "lucide-react";
import { properties } from "@/data/properties";
import { StarRating } from "@/components/shared/star-rating";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

const featuredProperties = properties.filter((p) => p.featured);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function FeaturedProperties() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            Proprietà in Evidenza
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Le nostre selezioni migliori, scelte per qualità, comfort e
            posizione privilegiata.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredProperties.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <Link
                href={`/properties/${property.slug}`}
                className="group block overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={property.images[0]}
                    alt={property.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge className="bg-amber-500 text-white">
                      In Evidenza
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                    {property.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {property.address.city}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    Fino a {property.details.maxGuests} ospiti
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <StarRating
                      rating={property.rating}
                      size={14}
                      reviewCount={property.reviewCount}
                    />
                  </div>
                  <div className="mt-2">
                    <span className="text-lg font-bold">
                      {formatCurrency(property.pricing.basePrice)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {" "}/ notte
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
