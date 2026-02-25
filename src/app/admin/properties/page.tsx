"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  LayoutGrid,
  List,
  Plus,
  Search,
  MapPin,
  Users,
  BedDouble,
  Bath,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { StarRating } from "@/components/shared/star-rating";
import { useProperties } from "@/hooks/use-properties";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const { properties, cities } = useProperties({
    search,
    city: city && city !== "all" ? city : undefined,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="space-y-6"
    >
      <PageHeader title="Proprietà" description="Gestisci le tue strutture ricettive">
        <Link href="/admin/properties/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Aggiungi Proprietà
          </Button>
        </Link>
      </PageHeader>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cerca proprietà..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tutte le città" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le città</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/properties/${property.id}`}>
                <Card className="group overflow-hidden p-0 transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={property.images[0]}
                      alt={property.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute right-2 top-2">
                      <StatusBadge status={property.status} />
                    </div>
                  </div>
                  <CardContent className="space-y-2 p-4">
                    <h3 className="font-semibold leading-tight line-clamp-1">
                      {property.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{property.address.city}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {property.details.maxGuests}
                      </span>
                      <span className="flex items-center gap-1">
                        <BedDouble className="h-3 w-3" />
                        {property.details.bedrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-3 w-3" />
                        {property.details.bathrooms}
                      </span>
                    </div>
                    <StarRating
                      rating={property.rating}
                      size={14}
                      reviewCount={property.reviewCount}
                    />
                    <p className="text-lg font-bold">
                      {formatCurrency(property.pricing.basePrice)}
                      <span className="text-sm font-normal text-muted-foreground">
                        /notte
                      </span>
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proprietà</TableHead>
                  <TableHead>Città</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Prezzo/notte</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Stato</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <Link
                        href={`/properties/${property.id}`}
                        className="flex items-center gap-3 hover:underline"
                      >
                        <div className="relative h-10 w-14 overflow-hidden rounded">
                          <Image
                            src={property.images[0]}
                            alt={property.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <span className="font-medium">{property.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell>{property.address.city}</TableCell>
                    <TableCell className="capitalize">{property.type}</TableCell>
                    <TableCell>{formatCurrency(property.pricing.basePrice)}</TableCell>
                    <TableCell>
                      <StarRating rating={property.rating} size={14} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={property.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {properties.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">Nessuna proprietà trovata</p>
          <p className="text-muted-foreground">
            Prova a modificare i filtri di ricerca
          </p>
        </div>
      )}
    </motion.div>
  );
}
