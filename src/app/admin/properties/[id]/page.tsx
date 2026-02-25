"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Edit,
  MapPin,
  Users,
  BedDouble,
  Bath,
  Ruler,
  Clock,
  Wifi,
  Car,
  UtensilsCrossed,
  Flame,
  Tv,
  WashingMachine,
  Snowflake,
  Mountain,
  Building,
  Trees,
  Beef,
  DoorOpen,
  Dog,
  PartyPopper,
  Cigarette,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { StarRating } from "@/components/shared/star-rating";
import { useProperties } from "@/hooks/use-properties";
import { formatCurrency, formatDate } from "@/lib/format";
import { AMENITY_LABELS } from "@/lib/constants";
import { reviews } from "@/data/reviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-4 w-4" />,
  parking: <Car className="h-4 w-4" />,
  kitchen: <UtensilsCrossed className="h-4 w-4" />,
  heating: <Flame className="h-4 w-4" />,
  tv: <Tv className="h-4 w-4" />,
  washer: <WashingMachine className="h-4 w-4" />,
  ac: <Snowflake className="h-4 w-4" />,
  mountain_view: <Mountain className="h-4 w-4" />,
  city_view: <Building className="h-4 w-4" />,
  garden: <Trees className="h-4 w-4" />,
  bbq: <Beef className="h-4 w-4" />,
  elevator: <DoorOpen className="h-4 w-4" />,
  fireplace: <Flame className="h-4 w-4" />,
  ski_storage: <Snowflake className="h-4 w-4" />,
  balcony: <Mountain className="h-4 w-4" />,
  dishwasher: <UtensilsCrossed className="h-4 w-4" />,
  dryer: <WashingMachine className="h-4 w-4" />,
  pet_friendly: <Dog className="h-4 w-4" />,
};

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { getProperty } = useProperties();
  const property = getProperty(id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium">Proprietà non trovata</p>
        <Link href="/admin/properties" className="mt-2 text-primary hover:underline">
          Torna alle proprietà
        </Link>
      </div>
    );
  }

  const propertyReviews = reviews.filter((r) => r.propertyId === property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Link href="/admin/properties">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <PageHeader
            title={property.name}
            description={property.shortDescription}
          >
            <StatusBadge status={property.status} />
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Modifica
            </Button>
          </PageHeader>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid gap-2 md:grid-cols-4 md:grid-rows-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:col-span-2 md:row-span-2">
          <Image
            src={property.images[selectedImage]}
            alt={property.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        {property.images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="relative hidden aspect-[4/3] cursor-pointer overflow-hidden rounded-lg md:block"
            onClick={() => setSelectedImage(index + 1)}
          >
            <Image
              src={image}
              alt={`${property.name} - ${index + 2}`}
              fill
              className="object-cover transition-opacity hover:opacity-80"
              sizes="25vw"
            />
          </div>
        ))}
      </div>

      {/* Mobile image thumbnails */}
      <div className="flex gap-2 overflow-x-auto md:hidden">
        {property.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-md ${
              selectedImage === index ? "ring-2 ring-primary" : ""
            }`}
          >
            <Image
              src={image}
              alt={`${property.name} - ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="pricing">Prezzi</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
          <TabsTrigger value="reviews">Recensioni</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Descrizione</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
                <Separator />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Ospiti max</p>
                      <p className="font-medium">{property.details.maxGuests}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Camere</p>
                      <p className="font-medium">{property.details.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Bagni</p>
                      <p className="font-medium">{property.details.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Superficie</p>
                      <p className="font-medium">{property.details.squareMeters} m²</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informazioni</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{property.address.street}</p>
                    <p className="text-sm text-muted-foreground">
                      {property.address.postalCode} {property.address.city} ({property.address.province})
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium">Valutazione</p>
                  <StarRating
                    rating={property.rating}
                    reviewCount={property.reviewCount}
                  />
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium">Tipo</p>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {property.type}
                  </Badge>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">Creata il</p>
                  <p className="text-sm">{formatDate(property.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ultimo aggiornamento</p>
                  <p className="text-sm">{formatDate(property.updatedAt)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Servizi e Comfort</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 rounded-lg border p-3"
                  >
                    {amenityIcons[amenity] || (
                      <CircleCheck className="h-4 w-4" />
                    )}
                    <span className="text-sm">
                      {AMENITY_LABELS[amenity] || amenity}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rules */}
          <Card>
            <CardHeader>
              <CardTitle>Regole della Casa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Check-in</p>
                    <p className="text-sm text-muted-foreground">
                      Dalle {property.rules.checkIn}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Check-out</p>
                    <p className="text-sm text-muted-foreground">
                      Entro le {property.rules.checkOut}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Soggiorno</p>
                  <p className="text-sm text-muted-foreground">
                    Min {property.rules.minStay} - Max {property.rules.maxStay} notti
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Cigarette className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">Fumo</span>
                    {property.rules.smokingAllowed ? (
                      <CircleCheck className="h-4 w-4 text-green-600" />
                    ) : (
                      <CircleX className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dog className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">Animali</span>
                    {property.rules.petsAllowed ? (
                      <CircleCheck className="h-4 w-4 text-green-600" />
                    ) : (
                      <CircleX className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PartyPopper className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">Feste</span>
                    {property.rules.partiesAllowed ? (
                      <CircleCheck className="h-4 w-4 text-green-600" />
                    ) : (
                      <CircleX className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tariffe Base</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Prezzo base/notte</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(property.pricing.basePrice)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pulizia</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(property.pricing.cleaningFee)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Supplemento weekend</TableCell>
                      <TableCell className="text-right">
                        +{formatCurrency(property.pricing.weekendSurcharge)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tariffe Stagionali</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stagione</TableHead>
                      <TableHead>Periodo</TableHead>
                      <TableHead className="text-right">Prezzo/notte</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {property.pricing.seasonalPricing.map((season, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{season.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(season.startDate)} - {formatDate(season.endDate)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(season.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendario Disponibilità</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">
                  Vai al{" "}
                  <Link href="/admin/calendar" className="text-primary hover:underline">
                    Calendario Generale
                  </Link>{" "}
                  per vedere le disponibilità di questa proprietà.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recensioni ({propertyReviews.length})</CardTitle>
                <StarRating
                  rating={property.rating}
                  reviewCount={property.reviewCount}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {propertyReviews.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nessuna recensione disponibile
                </p>
              ) : (
                propertyReviews.map((review) => (
                  <div key={review.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{review.guest.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {review.guest.nationality} - {formatDate(review.createdAt)}
                        </p>
                      </div>
                      <StarRating rating={review.rating} size={14} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {Object.entries(review.categories).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-xs text-muted-foreground capitalize">
                            {key === "checkIn"
                              ? "Check-in"
                              : key === "value"
                                ? "Rapporto Q/P"
                                : key.charAt(0).toUpperCase() + key.slice(1)}
                          </p>
                          <p className="text-sm font-semibold">{value}/5</p>
                        </div>
                      ))}
                    </div>
                    {review.response && (
                      <div className="ml-4 rounded-lg bg-muted p-3">
                        <p className="text-xs font-medium">Risposta del proprietario:</p>
                        <p className="text-sm text-muted-foreground">
                          {review.response}
                        </p>
                      </div>
                    )}
                    <Separator />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
