"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, Users, SlidersHorizontal, X, Search, BedDouble, Bath, Star, ArrowRight } from "lucide-react";
import { useProperties } from "@/hooks/use-properties";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TYPE_LABELS: Record<string, string> = { apartment: "Appartamento", house: "Casa", studio: "Studio", villa: "Villa" };

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [cityFilter, setCityFilter] = useState(searchParams.get("city") || "");
  const [typeFilter, setTypeFilter] = useState("");
  const [guestsFilter, setGuestsFilter] = useState(searchParams.get("guests") || "");
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
      result = result.filter((p) => p.pricing.basePrice >= min && (max ? p.pricing.basePrice <= max : true));
    }
    return result;
  }, [properties, normalizedPrice]);

  const activeFilters = [normalizedCity, normalizedType, guestsFilter, normalizedPrice].filter(Boolean).length;
  const clearFilters = () => { setCityFilter(""); setTypeFilter(""); setGuestsFilter(""); setPriceRange(""); };

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="label-luxury">Collezione</p>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-tight sm:text-4xl">
            Le Nostre Proprietà
          </h1>
          <div className="mt-3 h-px w-12 bg-terra/40" />
        </motion.div>

        {/* Mobile filter toggle */}
        <div className="mt-8 flex items-center gap-3 md:hidden">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2 text-xs">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filtri
            {activeFilters > 0 && <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs">{activeFilters}</Badge>}
          </Button>
          {activeFilters > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
              <X className="mr-1 h-3 w-3" /> Cancella
            </Button>
          )}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mt-8 rounded-xl border border-stone-200 bg-white p-5 shadow-card ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5 md:items-end">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/40">Destinazione</label>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="border-stone-200"><SelectValue placeholder="Tutte le città" /></SelectTrigger>
                <SelectContent><SelectItem value="all">Tutte le città</SelectItem>{cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/40">Tipologia</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="border-stone-200"><SelectValue placeholder="Tutte" /></SelectTrigger>
                <SelectContent><SelectItem value="all">Tutte</SelectItem>{Object.entries(TYPE_LABELS).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/40">Ospiti min.</label>
              <Input type="number" min={1} max={10} placeholder="N." value={guestsFilter} onChange={(e) => setGuestsFilter(e.target.value)} className="border-stone-200" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/40">Prezzo / notte</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="border-stone-200"><SelectValue placeholder="Qualsiasi" /></SelectTrigger>
                <SelectContent><SelectItem value="all">Qualsiasi</SelectItem><SelectItem value="0-70">Fino a €70</SelectItem><SelectItem value="70-100">€70 – €100</SelectItem><SelectItem value="100-150">€100 – €150</SelectItem><SelectItem value="150-999">Oltre €150</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="hidden md:block">
              {activeFilters > 0 && <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full gap-1 text-xs"><X className="h-3 w-3" /> Reset</Button>}
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-sm text-muted-foreground">{filtered.length} proprietà trovate</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-20 flex flex-col items-center text-center">
            <Search className="h-10 w-10 text-muted-foreground/25" />
            <h3 className="mt-4 font-serif text-lg font-light">Nessun risultato</h3>
            <p className="mt-1 text-sm text-muted-foreground">Prova a modificare i filtri.</p>
            <Button variant="outline" className="mt-4 text-xs" onClick={clearFilters}>Rimuovi filtri</Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <Link
                  href={`/properties/${property.slug}`}
                  className="group block overflow-hidden rounded-xl border border-stone-200 bg-white shadow-card transition-shadow duration-300 hover:shadow-soft"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={property.images[0]}
                      alt={property.name}
                      fill
                      className="object-cover transition-transform duration-[1s] ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={80}
                    />
                    {/* Rating */}
                    <div className="absolute right-3 top-3">
                      <span className="flex items-center gap-1 rounded-sm bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-forest">
                        <Star className="h-2.5 w-2.5 fill-terra text-terra" />
                        {property.rating.toFixed(1)}
                      </span>
                    </div>
                    {/* Type */}
                    <div className="absolute left-3 top-3">
                      <span className="rounded-sm bg-forest/80 backdrop-blur-sm px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white">
                        {TYPE_LABELS[property.type]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-serif text-base font-medium leading-tight text-forest group-hover:text-terra transition-colors">
                      {property.name}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-1 text-[12px] text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {property.address.city}, {property.address.province}
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{property.details.maxGuests}</span>
                      <span className="flex items-center gap-1"><BedDouble className="h-3 w-3" />{property.details.bedrooms}</span>
                      <span className="flex items-center gap-1"><Bath className="h-3 w-3" />{property.details.bathrooms}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-medium text-forest">{formatCurrency(property.pricing.basePrice)}</span>
                        <span className="text-xs text-muted-foreground"> / notte</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-terra opacity-0 transition-opacity group-hover:opacity-100">
                        Dettagli <ArrowRight className="h-2.5 w-2.5" />
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
  return <Suspense><PropertiesContent /></Suspense>;
}
