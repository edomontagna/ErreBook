"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, Users, CreditCard, CheckCircle2, ChevronLeft, ChevronRight, Lock, Shield } from "lucide-react";
import { useProperties } from "@/hooks/use-properties";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const STEPS = [
  { label: "Dettagli", icon: CalendarDays },
  { label: "Pagamento", icon: CreditCard },
  { label: "Conferma", icon: CheckCircle2 },
];

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getProperty } = useProperties();
  const property = getProperty(id);
  const [step, setStep] = useState(0);

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
        <h1 className="font-serif text-2xl font-light">Proprietà non trovata</h1>
        <Button asChild variant="outline"><Link href="/properties">Torna alle proprietà</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Button asChild variant="ghost" size="sm" className="mb-8 -ml-2 text-xs uppercase tracking-[0.15em]">
          <Link href={`/properties/${property.slug}`}><ChevronLeft className="mr-1 h-3 w-3" />Torna alla proprietà</Link>
        </Button>

        <p className="label-luxury">Prenotazione</p>
        <h1 className="mt-3 font-serif text-2xl font-light tracking-tight sm:text-3xl">{property.name}</h1>
        <div className="mt-3 h-px w-12 bg-terra/40" />

        {/* Step indicator */}
        <div className="mt-10 flex items-center justify-between">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="flex flex-col items-center gap-2.5">
                <div className={`flex h-10 w-10 items-center justify-center transition-all duration-500 ${
                  i <= step ? "bg-forest text-terra" : "border border-border text-muted-foreground"
                }`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <span className={`text-[10px] font-medium uppercase tracking-[0.2em] ${i <= step ? "text-forest" : "text-muted-foreground"}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-3 mb-7 h-px flex-1 bg-border">
                  <div className="h-full bg-forest transition-all duration-700 ease-out" style={{ width: i < step ? "100%" : "0%" }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="mt-10 space-y-6">
              <div className="border border-border/60">
                <div className="border-b border-border/60 px-6 py-4">
                  <h2 className="font-serif text-lg font-light">Dettagli del Soggiorno</h2>
                </div>
                <div className="space-y-4 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-[0.2em]">Check-in</Label>
                      <Input type="date" defaultValue="2026-03-15" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-[0.2em]">Check-out</Label>
                      <Input type="date" defaultValue="2026-03-18" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-[0.2em]">Numero ospiti</Label>
                    <Input type="number" defaultValue={2} min={1} max={property.details.maxGuests} />
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">{formatCurrency(property.pricing.basePrice)} x {nights} notti</span><span>{formatCurrency(baseTotal)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Pulizia</span><span>{formatCurrency(cleaningFee)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Servizio</span><span>{formatCurrency(serviceFee)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Tasse</span><span>{formatCurrency(taxes)}</span></div>
                    <Separator />
                    <div className="flex justify-between text-base font-medium"><span>Totale</span><span>{formatCurrency(total)}</span></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setStep(1)} className="gap-2 bg-forest text-canvas hover:bg-forest-light text-xs uppercase tracking-[0.2em]">
                  Continua <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="mt-10 space-y-6">
              <div className="border border-border/60">
                <div className="flex items-center gap-2 border-b border-border/60 px-6 py-4">
                  <Lock className="h-4 w-4 text-terra" />
                  <h2 className="font-serif text-lg font-light">Pagamento Sicuro</h2>
                </div>
                <div className="space-y-4 p-6">
                  <div className="space-y-2"><Label className="text-[10px] uppercase tracking-[0.2em]">Nome sulla carta</Label><Input placeholder="Mario Rossi" /></div>
                  <div className="space-y-2"><Label className="text-[10px] uppercase tracking-[0.2em]">Numero carta</Label><Input placeholder="4242 4242 4242 4242" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label className="text-[10px] uppercase tracking-[0.2em]">Scadenza</Label><Input placeholder="MM/AA" /></div>
                    <div className="space-y-2"><Label className="text-[10px] uppercase tracking-[0.2em]">CVC</Label><Input placeholder="123" /></div>
                  </div>
                  <div className="flex items-center gap-2 bg-canvas-dark p-3.5 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 shrink-0 text-terra" />
                    <span>Crittografia SSL a 256 bit. Non memorizziamo i dati della tua carta.</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base font-medium"><span>Totale da pagare</span><span>{formatCurrency(total)}</span></div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(0)} className="gap-2 text-xs uppercase tracking-[0.15em]"><ChevronLeft className="h-3.5 w-3.5" />Indietro</Button>
                <Button onClick={() => setStep(2)} className="gap-2 bg-forest text-canvas hover:bg-forest-light text-xs uppercase tracking-[0.2em]">Conferma e Paga <CreditCard className="h-3.5 w-3.5" /></Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mt-10">
              <div className="border border-border/60 py-16 text-center px-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.2 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center bg-forest"
                >
                  <CheckCircle2 className="h-8 w-8 text-terra" />
                </motion.div>

                <h2 className="mt-8 font-serif text-2xl font-light">Prenotazione Confermata</h2>
                <div className="mx-auto mt-3 h-px w-12 bg-terra/40" />
                <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
                  La tua prenotazione per {property.name} è stata confermata. Riceverai un&apos;email di conferma a breve.
                </p>

                <div className="mx-auto mt-10 max-w-sm border border-border/60">
                  <div className="space-y-0 text-sm">
                    {[
                      { l: "Proprietà", v: property.name },
                      { l: "Check-in", v: checkIn },
                      { l: "Check-out", v: checkOut },
                      { l: "Ospiti", v: String(guests) },
                      { l: "Notti", v: String(nights) },
                    ].map((r) => (
                      <div key={r.l} className="flex justify-between border-b border-border/60 last:border-b-0 px-5 py-3">
                        <span className="text-muted-foreground">{r.l}</span>
                        <span className="font-medium">{r.v}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t border-border bg-canvas-dark/50 px-5 py-3 font-medium">
                      <span>Totale</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button asChild className="bg-forest text-canvas hover:bg-forest-light text-xs uppercase tracking-[0.2em]">
                    <Link href="/properties">Esplora Altre Proprietà</Link>
                  </Button>
                  <Button asChild variant="outline" className="text-xs uppercase tracking-[0.15em]">
                    <Link href="/">Torna alla Home</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
