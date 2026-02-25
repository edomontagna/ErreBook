"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Users, Info } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format";
import { useT } from "@/lib/i18n";
import type { Property } from "@/types/property";

interface BookingWidgetProps {
  property: Property;
}

export function BookingWidget({ property }: BookingWidgetProps) {
  const { t } = useT();
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const priceBreakdown = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    const nights = differenceInDays(parseISO(checkOut), parseISO(checkIn));
    if (nights <= 0) return null;
    const baseTotal = property.pricing.basePrice * nights;
    const cleaningFee = property.pricing.cleaningFee;
    const serviceFee = Math.round(baseTotal * 0.08);
    const subtotal = baseTotal + cleaningFee + serviceFee;
    const taxes = Math.round(subtotal * 0.1);
    const total = subtotal + taxes;
    return { nights, baseTotal, cleaningFee, serviceFee, taxes, total };
  }, [checkIn, checkOut, property.pricing.basePrice, property.pricing.cleaningFee]);

  return (
    <div className="sticky top-24 overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-float">
      {/* Header */}
      <div className="relative bg-forest px-6 py-5 noise">
        <div className="relative z-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-terra">{t.booking.startingFrom}</p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-display text-2xl text-white">{formatCurrency(property.pricing.basePrice)}</span>
            <span className="text-xs text-white/40">{t.booking.perNight}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/40">
              <CalendarDays className="h-3 w-3" /> {t.booking.checkIn}
            </label>
            <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="h-10 border-stone-200" />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/40">
              <CalendarDays className="h-3 w-3" /> {t.booking.checkOut}
            </label>
            <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="h-10 border-stone-200" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/40">
            <Users className="h-3 w-3" /> {t.booking.guests}
          </label>
          <Input
            type="number"
            min={1}
            max={property.details.maxGuests}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="h-10 border-stone-200"
          />
          <p className="text-xs text-muted-foreground">{t.booking.maxGuests.replace("{n}", String(property.details.maxGuests))}</p>
        </div>

        {priceBreakdown && (
          <>
            <Separator className="bg-stone-100" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{formatCurrency(property.pricing.basePrice)} x {priceBreakdown.nights} {t.booking.nights}</span>
                <span>{formatCurrency(priceBreakdown.baseTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.booking.cleaning}</span>
                <span>{formatCurrency(priceBreakdown.cleaningFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1 text-muted-foreground">{t.booking.service} <Info className="h-3 w-3" /></span>
                <span>{formatCurrency(priceBreakdown.serviceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.booking.taxes}</span>
                <span>{formatCurrency(priceBreakdown.taxes)}</span>
              </div>
              <Separator className="bg-stone-100" />
              <div className="flex justify-between text-base font-medium">
                <span>{t.booking.total}</span>
                <span>{formatCurrency(priceBreakdown.total)}</span>
              </div>
            </div>
          </>
        )}

        <Button
          onClick={() => router.push(`/booking/${property.id}`)}
          className="w-full bg-terra text-white hover:bg-terra-hover text-xs font-semibold uppercase tracking-[0.2em] shadow-lg shadow-terra/20"
          size="lg"
        >
          {t.booking.bookNow}
        </Button>

        {!priceBreakdown && (
          <p className="text-center text-xs text-muted-foreground">{t.booking.selectDates}</p>
        )}
      </div>
    </div>
  );
}
