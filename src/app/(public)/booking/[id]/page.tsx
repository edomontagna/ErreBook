"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  CalendarDays,
  Users,
  CreditCard,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lock,
  Shield,
} from "lucide-react";
import { useProperties } from "@/hooks/use-properties";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const STEPS = [
  { label: "Dettagli", icon: CalendarDays },
  { label: "Pagamento", icon: CreditCard },
  { label: "Conferma", icon: CheckCircle2 },
];

export default function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getProperty } = useProperties();
  const property = getProperty(id);

  const [step, setStep] = useState(0);

  // Mock booking data
  const nights = 3;
  const guests = 2;
  const checkIn = "15 Mar 2026";
  const checkOut = "18 Mar 2026";
  const baseTotal = (property?.pricing.basePrice ?? 100) * nights;
  const cleaningFee = property?.pricing.cleaningFee ?? 50;
  const serviceFee = Math.round(baseTotal * 0.08);
  const taxes = Math.round((baseTotal + cleaningFee + serviceFee) * 0.1);
  const total = baseTotal + cleaningFee + serviceFee + taxes;

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-16">
        <h1 className="text-2xl font-bold">Proprietà non trovata</h1>
        <Button asChild variant="outline">
          <Link href="/properties">Torna alle proprietà</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
          <Link href={`/properties/${property.slug}`}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Torna alla proprietà
          </Link>
        </Button>

        <h1 className="font-serif text-2xl font-bold sm:text-3xl">
          Prenota {property.name}
        </h1>

        {/* Step indicator */}
        <div className="mt-8 flex items-center justify-between">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                    i <= step
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <span
                  className={`text-xs font-medium ${
                    i <= step ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 mb-6 h-0.5 flex-1 transition-colors ${
                    i < step ? "bg-primary" : "bg-muted-foreground/20"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Steps content */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Dettagli del Soggiorno</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        Check-in
                      </Label>
                      <Input type="date" defaultValue="2026-03-15" />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        Check-out
                      </Label>
                      <Input type="date" defaultValue="2026-03-18" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      Numero ospiti
                    </Label>
                    <Input
                      type="number"
                      defaultValue={2}
                      min={1}
                      max={property.details.maxGuests}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {formatCurrency(property.pricing.basePrice)} x {nights}{" "}
                        notti
                      </span>
                      <span>{formatCurrency(baseTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pulizia</span>
                      <span>{formatCurrency(cleaningFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Commissione servizio
                      </span>
                      <span>{formatCurrency(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tasse</span>
                      <span>{formatCurrency(taxes)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-base">
                      <span>Totale</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={() => setStep(1)} className="gap-2">
                  Continua
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Pagamento Sicuro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome sulla carta</Label>
                    <Input placeholder="Mario Rossi" />
                  </div>
                  <div className="space-y-2">
                    <Label>Numero carta</Label>
                    <Input placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Scadenza</Label>
                      <Input placeholder="MM/AA" />
                    </div>
                    <div className="space-y-2">
                      <Label>CVC</Label>
                      <Input placeholder="123" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 shrink-0" />
                    <span>
                      I tuoi dati di pagamento sono protetti con crittografia
                      SSL a 256 bit. Non memorizziamo i dati della tua carta.
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold">
                    <span>Totale da pagare</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(0)}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Indietro
                </Button>
                <Button onClick={() => setStep(2)} className="gap-2">
                  Conferma e Paga
                  <CreditCard className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Card className="text-center">
                <CardContent className="py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                  >
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </motion.div>

                  <h2 className="mt-6 font-serif text-2xl font-bold">
                    Prenotazione Confermata!
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                    La tua prenotazione per {property.name} è stata
                    confermata. Riceverai un&apos;email di conferma a breve.
                  </p>

                  <div className="mx-auto mt-8 max-w-sm space-y-3 rounded-lg bg-muted p-6 text-left text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Proprietà</span>
                      <span className="font-medium">{property.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-in</span>
                      <span className="font-medium">{checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-out</span>
                      <span className="font-medium">{checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ospiti</span>
                      <span className="font-medium">{guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Notti</span>
                      <span className="font-medium">{nights}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Totale pagato</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Button asChild>
                      <Link href="/properties">Esplora Altre Proprietà</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/">Torna alla Home</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
