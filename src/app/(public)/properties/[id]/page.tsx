"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  MapPin,
  Users,
  BedDouble,
  Bath,
  Ruler,
  Clock,
  Ban,
  PawPrint,
  PartyPopper,
  ChevronLeft,
  Wifi,
  Car,
  CookingPot,
  WashingMachine,
  Wind,
  Flame,
  Tv,
  Waves,
  Dumbbell,
  ArrowUpFromDot,
  Fence,
  TreePine,
  Beef,
  Mountain,
  Building2,
  Snowflake,
} from "lucide-react";
import { useProperties } from "@/hooks/use-properties";
import { reviews as allReviews } from "@/data/reviews";
import { AMENITY_LABELS } from "@/lib/constants";
import { formatCurrency } from "@/lib/format";
import { StarRating } from "@/components/shared/star-rating";
import { BookingWidget } from "@/components/public/booking-widget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AMENITY_ICONS: Record<string, React.ElementType> = {
  wifi: Wifi,
  parking: Car,
  kitchen: CookingPot,
  washer: WashingMachine,
  dryer: Wind,
  ac: Snowflake,
  heating: Flame,
  tv: Tv,
  pool: Waves,
  gym: Dumbbell,
  elevator: ArrowUpFromDot,
  balcony: Fence,
  garden: TreePine,
  bbq: Beef,
  fireplace: Flame,
  dishwasher: WashingMachine,
  pet_friendly: PawPrint,
  ski_storage: Mountain,
  mountain_view: Mountain,
  city_view: Building2,
};

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getPropertyBySlug, getProperty } = useProperties();
  const [selectedImage, setSelectedImage] = useState(0);

  const property = getPropertyBySlug(id) ?? getProperty(id);

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-16">
        <h1 className="text-2xl font-bold">Proprietà non trovata</h1>
        <p className="text-muted-foreground">
          La proprietà richiesta non esiste o è stata rimossa.
        </p>
        <Button asChild variant="outline">
          <Link href="/properties">Torna alle proprietà</Link>
        </Button>
      </div>
    );
  }

  const propertyReviews = allReviews.filter(
    (r) => r.propertyId === property.id
  );

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
            <Link href="/properties">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Tutte le proprietà
            </Link>
          </Button>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-3 md:grid-cols-4 md:grid-rows-2"
        >
          {/* Main image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:col-span-2 md:row-span-2 md:aspect-auto md:h-full">
            <Image
              src={property.images[selectedImage]}
              alt={property.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Thumbnails */}
          {property.images.slice(1, 5).map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i + 1)}
              className="relative hidden aspect-[4/3] overflow-hidden rounded-xl md:block"
            >
              <Image
                src={img}
                alt={`${property.name} - ${i + 2}`}
                fill
                className="object-cover transition-opacity hover:opacity-80"
                sizes="25vw"
              />
              {i === 3 && property.images.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                  <span className="text-lg font-semibold">
                    +{property.images.length - 5}
                  </span>
                </div>
              )}
            </button>
          ))}
        </motion.div>

        {/* Mobile thumbnail row */}
        <div className="mt-3 flex gap-2 overflow-x-auto md:hidden">
          {property.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                selectedImage === i
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`${property.name} - ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left column: details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex flex-wrap items-start gap-3">
                <h1 className="font-serif text-2xl font-bold sm:text-3xl">
                  {property.name}
                </h1>
                {property.featured && (
                  <Badge className="bg-amber-500 text-white">
                    In Evidenza
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {property.address.city}, {property.address.province}
                </span>
                <StarRating
                  rating={property.rating}
                  size={16}
                  reviewCount={property.reviewCount}
                />
              </div>

              {/* Quick stats */}
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{property.details.maxGuests} ospiti</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                  <BedDouble className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {property.details.bedrooms}{" "}
                    {property.details.bedrooms === 1 ? "camera" : "camere"}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {property.details.bathrooms}{" "}
                    {property.details.bathrooms === 1 ? "bagno" : "bagni"}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <span>{property.details.squareMeters} m²</span>
                </div>
              </div>
            </motion.div>

            <Separator />

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-serif text-xl font-bold">Descrizione</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {property.description}
              </p>
            </motion.div>

            <Separator />

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="font-serif text-xl font-bold">Servizi</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {property.amenities.map((amenity) => {
                  const Icon = AMENITY_ICONS[amenity] ?? Wifi;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-2.5 rounded-lg border p-3 text-sm"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-primary" />
                      <span>{AMENITY_LABELS[amenity] ?? amenity}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <Separator />

            {/* House rules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="font-serif text-xl font-bold">Regole della Casa</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Check-in:</span>{" "}
                    {property.rules.checkIn}
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Check-out:</span>{" "}
                    {property.rules.checkOut}
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                  <Ban className="h-4 w-4 text-muted-foreground" />
                  <div>
                    Fumo:{" "}
                    {property.rules.smokingAllowed
                      ? "Consentito"
                      : "Non consentito"}
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                  <PawPrint className="h-4 w-4 text-muted-foreground" />
                  <div>
                    Animali:{" "}
                    {property.rules.petsAllowed
                      ? "Ammessi"
                      : "Non ammessi"}
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                  <PartyPopper className="h-4 w-4 text-muted-foreground" />
                  <div>
                    Feste:{" "}
                    {property.rules.partiesAllowed
                      ? "Consentite"
                      : "Non consentite"}
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    Soggiorno: {property.rules.minStay}-
                    {property.rules.maxStay} notti
                  </div>
                </div>
              </div>
            </motion.div>

            <Separator />

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold">
                  Recensioni ({propertyReviews.length})
                </h2>
                <StarRating
                  rating={property.rating}
                  size={18}
                  reviewCount={property.reviewCount}
                />
              </div>

              {propertyReviews.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Nessuna recensione ancora per questa proprietà.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  {propertyReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-semibold">
                              {review.guest.name}
                            </span>
                            <div className="mt-1">
                              <StarRating
                                rating={review.rating}
                                size={14}
                                showValue={false}
                              />
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {review.comment}
                        </p>
                        {review.response && (
                          <div className="mt-3 rounded-lg bg-muted p-3">
                            <span className="text-xs font-semibold">
                              Risposta del proprietario:
                            </span>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {review.response}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right column: booking widget */}
          <div className="hidden lg:block">
            <BookingWidget property={property} />
          </div>
        </div>

        {/* Mobile booking bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold">
                {formatCurrency(property.pricing.basePrice)}
              </span>
              <span className="text-sm text-muted-foreground"> / notte</span>
            </div>
            <Button asChild>
              <Link href={`/booking/${property.id}`}>Prenota Ora</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
