"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  MapPin,
  Users,
  SlidersHorizontal,
  X,
  Search,
  BedDouble,
  Bath,
} from "lucide-react";
import { useProperties } from "@/hooks/use-properties";
import { StarRating } from "@/components/shared/star-rating";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TYPE_LABELS: Record<string, string> = {
  apartment: "Appartamento",
  house: "Casa",
  studio: "Studio",
  villa: "Villa",
};

function PropertiesContent() {
  const searchParams = useSearchParams();

  const [cityFilter, setCityFilter] = useState(
    searchParams.get("city") || ""
  );
  const [typeFilter, setTypeFilter] = useState("");
  const [guestsFilter, setGuestsFilter] = useState(
    searchParams.get("guests") || ""
  );
  const [priceRange, setPriceRange] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const normalizedCity = cityFilter && cityFilter !== "all" ? cityFilter : undefined;
  const normalizedType = typeFilter && typeFilter !== "all" ? typeFilter : undefined;
  const normalizedPrice = priceRange && priceRange !== "all" ? priceRange : "";

  const { properties, cities } = useProperties({
    city: normalizedCity,
    type: normalizedType,
    minGuests: guestsFilter ? Number(guestsFilter) : undefined,
  });

  const filtered = useMemo(() => {
    let result = [...properties];

    if (normalizedPrice) {
      const [min, max] = normalizedPrice.split("-").map(Number);
      result = result.filter(
        (p) =>
          p.pricing.basePrice >= min &&
          (max ? p.pricing.basePrice <= max : true)
      );
    }

    return result;
  }, [properties, normalizedPrice]);

  const activeFilters = [normalizedCity, normalizedType, guestsFilter, normalizedPrice].filter(Boolean).length;

  const clearFilters = () => {
    setCityFilter("");
    setTypeFilter("");
    setGuestsFilter("");
    setPriceRange("");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-3xl font-bold sm:text-4xl">
            Le Nostre Proprietà
          </h1>
          <p className="mt-2 text-muted-foreground">
            {filtered.length} proprietà disponibili
          </p>
        </motion.div>

        {/* Filter toggle (mobile) */}
        <div className="mt-6 flex items-center gap-3 md:hidden">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtri
            {activeFilters > 0 && (
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                {activeFilters}
              </Badge>
            )}
          </Button>
          {activeFilters > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="mr-1 h-3 w-3" />
              Cancella filtri
            </Button>
          )}
        </div>

        {/* Filters bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`mt-6 rounded-xl border bg-card p-4 shadow-sm ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5 md:items-end">
            {/* City */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Destinazione
              </label>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tutte le città" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte le città</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Tipologia
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tutti i tipi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i tipi</SelectItem>
                  {Object.entries(TYPE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Guests */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Ospiti (min.)
              </label>
              <Input
                type="number"
                min={1}
                max={10}
                placeholder="N. ospiti"
                value={guestsFilter}
                onChange={(e) => setGuestsFilter(e.target.value)}
              />
            </div>

            {/* Price range */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Fascia di prezzo
              </label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Qualsiasi prezzo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Qualsiasi prezzo</SelectItem>
                  <SelectItem value="0-70">Fino a 70 EUR/notte</SelectItem>
                  <SelectItem value="70-100">70 - 100 EUR/notte</SelectItem>
                  <SelectItem value="100-150">100 - 150 EUR/notte</SelectItem>
                  <SelectItem value="150-999">Oltre 150 EUR/notte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear */}
            <div className="hidden md:block">
              {activeFilters > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="w-full gap-1"
                >
                  <X className="h-3.5 w-3.5" />
                  Cancella filtri
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Properties grid */}
        {filtered.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <Search className="h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-semibold">
              Nessuna proprietà trovata
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Prova a modificare i filtri di ricerca.
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Rimuovi tutti i filtri
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
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
                    {property.featured && (
                      <div className="absolute left-3 top-3">
                        <Badge className="bg-amber-500 text-white">
                          In Evidenza
                        </Badge>
                      </div>
                    )}
                    <div className="absolute right-3 top-3">
                      <Badge variant="secondary" className="bg-white/90 text-foreground">
                        {TYPE_LABELS[property.type]}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                      {property.name}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {property.address.city}, {property.address.province}
                    </div>

                    <div className="mt-2.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {property.details.maxGuests}
                      </span>
                      <span className="flex items-center gap-1">
                        <BedDouble className="h-3.5 w-3.5" />
                        {property.details.bedrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-3.5 w-3.5" />
                        {property.details.bathrooms}
                      </span>
                    </div>

                    <div className="mt-3">
                      <StarRating
                        rating={property.rating}
                        size={14}
                        reviewCount={property.reviewCount}
                      />
                    </div>

                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-lg font-bold">
                        {formatCurrency(property.pricing.basePrice)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / notte
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense>
      <PropertiesContent />
    </Suspense>
  );
}
