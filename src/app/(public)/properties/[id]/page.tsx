"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  MapPin, Users, BedDouble, Bath, Ruler, Clock, Ban, PawPrint, PartyPopper,
  ChevronLeft, Wifi, Car, CookingPot, WashingMachine, Wind, Flame, Tv,
  Waves, Dumbbell, ArrowUpFromDot, Fence, TreePine, Beef, Mountain,
  Building2, Snowflake, Star,
} from "lucide-react";
import { useProperties } from "@/hooks/use-properties";
import { reviews as allReviews } from "@/data/reviews";
import { AMENITY_LABELS } from "@/lib/constants";
import { formatCurrency } from "@/lib/format";
import { StarRating } from "@/components/shared/star-rating";
import { BookingWidget } from "@/components/public/booking-widget";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AMENITY_ICONS: Record<string, React.ElementType> = {
  wifi: Wifi, parking: Car, kitchen: CookingPot, washer: WashingMachine,
  dryer: Wind, ac: Snowflake, heating: Flame, tv: Tv, pool: Waves,
  gym: Dumbbell, elevator: ArrowUpFromDot, balcony: Fence, garden: TreePine,
  bbq: Beef, fireplace: Flame, dishwasher: WashingMachine, pet_friendly: PawPrint,
  ski_storage: Mountain, mountain_view: Mountain, city_view: Building2,
};

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getPropertyBySlug, getProperty } = useProperties();
  const [selectedImage, setSelectedImage] = useState(0);
  const property = getPropertyBySlug(id) ?? getProperty(id);

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-16">
        <h1 className="font-serif text-2xl font-light">Proprietà non trovata</h1>
        <Button asChild variant="outline"><Link href="/properties">Torna alle proprietà</Link></Button>
      </div>
    );
  }

  const propertyReviews = allReviews.filter((r) => r.propertyId === property.id);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2 text-xs uppercase tracking-[0.15em]">
            <Link href="/properties"><ChevronLeft className="mr-1 h-3 w-3" /> Tutte le proprietà</Link>
          </Button>
        </motion.div>

        {/* Bento Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-1.5 rounded-xl overflow-hidden md:grid-cols-4 md:grid-rows-2 md:h-[480px]"
        >
          {/* Main image */}
          <button
            onClick={() => setSelectedImage(0)}
            className="relative aspect-[4/3] overflow-hidden md:col-span-2 md:row-span-2 md:aspect-auto md:h-full"
          >
            <Image
              src={property.images[0]}
              alt={property.name}
              fill
              className="object-cover transition-opacity duration-300 hover:opacity-95"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              quality={80}
            />
          </button>
          {/* Thumbnails */}
          {property.images.slice(1, 5).map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i + 1)}
              className="relative hidden aspect-[4/3] overflow-hidden md:block transition-opacity duration-300 hover:opacity-90"
            >
              <Image src={img} alt={`${property.name} ${i + 2}`} fill className="object-cover" sizes="25vw" quality={75} />
              {i === 3 && property.images.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-forest/50 text-white">
                  <span className="text-sm font-medium">+{property.images.length - 5}</span>
                </div>
              )}
            </button>
          ))}
        </motion.div>

        {/* Mobile thumbnails */}
        <div className="mt-2 flex gap-1.5 overflow-x-auto md:hidden">
          {property.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition-all ${
                selectedImage === i ? "ring-2 ring-terra ring-offset-1 opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <Image src={img} alt={`${property.name} ${i + 1}`} fill className="object-cover" sizes="80px" quality={60} />
            </button>
          ))}
        </div>

        {/* Selected image (if not main) */}
        {selectedImage > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 relative aspect-video overflow-hidden rounded-xl md:hidden"
          >
            <Image src={property.images[selectedImage]} alt={property.name} fill className="object-cover" sizes="100vw" quality={80} />
          </motion.div>
        )}

        {/* Two-column layout */}
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Title & meta */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <p className="label-luxury">{formatCurrency(property.pricing.basePrice)} / notte</p>
              <h1 className="mt-2 font-serif text-2xl font-light tracking-tight sm:text-3xl">
                {property.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-terra" />{property.address.city}, {property.address.province}</span>
                <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-terra text-terra" />{property.rating.toFixed(1)} ({property.reviewCount})</span>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {[
                  { icon: Users, val: `${property.details.maxGuests} ospiti` },
                  { icon: BedDouble, val: `${property.details.bedrooms} ${property.details.bedrooms === 1 ? "camera" : "camere"}` },
                  { icon: Bath, val: `${property.details.bathrooms} ${property.details.bathrooms === 1 ? "bagno" : "bagni"}` },
                  { icon: Ruler, val: `${property.details.squareMeters} m²` },
                ].map((s) => (
                  <div key={s.val} className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-sm shadow-card">
                    <s.icon className="h-4 w-4 text-terra" />
                    <span>{s.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <Separator className="bg-stone-200" />

            {/* Description */}
            <div>
              <h2 className="font-serif text-xl font-light">Descrizione</h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-muted-foreground">{property.description}</p>
            </div>

            <Separator className="bg-stone-200" />

            {/* Amenities */}
            <div>
              <h2 className="font-serif text-xl font-light">Servizi</h2>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {property.amenities.map((amenity) => {
                  const Icon = AMENITY_ICONS[amenity] ?? Wifi;
                  return (
                    <div key={amenity} className="flex items-center gap-2.5 rounded-lg border border-stone-100 bg-white px-3.5 py-2.5 text-sm">
                      <Icon className="h-4 w-4 shrink-0 text-terra" />
                      <span>{AMENITY_LABELS[amenity] ?? amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator className="bg-stone-200" />

            {/* Rules */}
            <div>
              <h2 className="font-serif text-xl font-light">Regole della Casa</h2>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {[
                  { icon: Clock, l: "Check-in", v: property.rules.checkIn },
                  { icon: Clock, l: "Check-out", v: property.rules.checkOut },
                  { icon: Ban, l: "Fumo", v: property.rules.smokingAllowed ? "Consentito" : "Non consentito" },
                  { icon: PawPrint, l: "Animali", v: property.rules.petsAllowed ? "Ammessi" : "Non ammessi" },
                  { icon: PartyPopper, l: "Feste", v: property.rules.partiesAllowed ? "Consentite" : "Non consentite" },
                  { icon: Clock, l: "Soggiorno", v: `${property.rules.minStay}–${property.rules.maxStay} notti` },
                ].map((r) => (
                  <div key={r.l} className="flex items-center gap-2.5 rounded-lg border border-stone-100 bg-white px-3.5 py-2.5 text-sm">
                    <r.icon className="h-4 w-4 text-muted-foreground" />
                    <span><span className="font-medium">{r.l}:</span> {r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-stone-200" />

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-light">Recensioni ({propertyReviews.length})</h2>
                <StarRating rating={property.rating} size={16} reviewCount={property.reviewCount} />
              </div>

              {propertyReviews.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">Nessuna recensione ancora.</p>
              ) : (
                <div className="mt-6 space-y-3">
                  {propertyReviews.map((review) => (
                    <div key={review.id} className="rounded-xl border border-stone-100 bg-white p-5 shadow-card">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-semibold text-terra">
                          {review.guest.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{review.guest.name}</span>
                            <StarRating rating={review.rating} size={12} showValue={false} />
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
                          {review.response && (
                            <div className="mt-3 rounded-lg border-l-2 border-terra/20 bg-stone-50 px-4 py-3">
                              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-terra">Risposta del proprietario</span>
                              <p className="mt-1 text-sm text-muted-foreground">{review.response}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Booking widget */}
          <div className="hidden lg:block">
            <BookingWidget property={property} />
          </div>
        </div>

        {/* Mobile booking bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur-md p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-medium">{formatCurrency(property.pricing.basePrice)}</span>
              <span className="text-sm text-muted-foreground"> / notte</span>
            </div>
            <Button asChild className="bg-terra text-white hover:bg-terra-hover text-xs font-semibold uppercase tracking-[0.15em]">
              <Link href={`/booking/${property.id}`}>Prenota Ora</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
