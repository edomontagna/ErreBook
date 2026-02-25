"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Users, Info } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format";
import type { Property } from "@/types/property";

interface BookingWidgetProps {
  property: Property;
}

export function BookingWidget({ property }: BookingWidgetProps) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const priceBreakdown = useMemo(() => {
    if (!checkIn || !checkOut) return null;

    const start = parseISO(checkIn);
    const end = parseISO(checkOut);
    const nights = differenceInDays(end, start);

    if (nights <= 0) return null;

    const baseTotal = property.pricing.basePrice * nights;
    const cleaningFee = property.pricing.cleaningFee;
    const serviceFee = Math.round(baseTotal * 0.08);
    const subtotal = baseTotal + cleaningFee + serviceFee;
    const taxes = Math.round(subtotal * 0.1);
    const total = subtotal + taxes;

    return { nights, baseTotal, cleaningFee, serviceFee, taxes, total };
  }, [checkIn, checkOut, property.pricing.basePrice, property.pricing.cleaningFee]);

  const handleBooking = () => {
    router.push(`/booking/${property.id}`);
  };

  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">
            {formatCurrency(property.pricing.basePrice)}
          </span>
          <span className="text-base font-normal text-muted-foreground">
            / notte
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" />
              Check-in
            </label>
            <Input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" />
              Check-out
            </label>
            <Input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="h-10"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            Ospiti
          </label>
          <Input
            type="number"
            min={1}
            max={property.details.maxGuests}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="h-10"
          />
          <p className="text-xs text-muted-foreground">
            Massimo {property.details.maxGuests} ospiti
          </p>
        </div>

        {/* Price breakdown */}
        {priceBreakdown && (
          <>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {formatCurrency(property.pricing.basePrice)} x{" "}
                  {priceBreakdown.nights} notti
                </span>
                <span>{formatCurrency(priceBreakdown.baseTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pulizia</span>
                <span>{formatCurrency(priceBreakdown.cleaningFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1 text-muted-foreground">
                  Commissione servizio
                  <Info className="h-3 w-3" />
                </span>
                <span>{formatCurrency(priceBreakdown.serviceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tasse</span>
                <span>{formatCurrency(priceBreakdown.taxes)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Totale</span>
                <span>{formatCurrency(priceBreakdown.total)}</span>
              </div>
            </div>
          </>
        )}

        <Button onClick={handleBooking} className="w-full" size="lg">
          Prenota Ora
        </Button>

        {!priceBreakdown && (
          <p className="text-center text-xs text-muted-foreground">
            Seleziona le date per vedere il prezzo totale
          </p>
        )}
      </CardContent>
    </Card>
  );
}
