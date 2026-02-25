"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  MapPin,
  FileText,
  Sparkles,
  Camera,
  Euro,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AMENITY_LABELS } from "@/lib/constants";

const STEPS = [
  { id: 1, title: "Info Base", icon: <Info className="h-4 w-4" /> },
  { id: 2, title: "Posizione", icon: <MapPin className="h-4 w-4" /> },
  { id: 3, title: "Dettagli", icon: <FileText className="h-4 w-4" /> },
  { id: 4, title: "Servizi", icon: <Sparkles className="h-4 w-4" /> },
  { id: 5, title: "Foto", icon: <Camera className="h-4 w-4" /> },
  { id: 6, title: "Prezzi", icon: <Euro className="h-4 w-4" /> },
  { id: 7, title: "Regole", icon: <ShieldCheck className="h-4 w-4" /> },
];

export default function NewPropertyPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNext = () => {
    if (currentStep < STEPS.length) setCurrentStep(currentStep + 1);
  };

  const goToBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

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
        <PageHeader
          title="Nuova Proprietà"
          description="Aggiungi una nuova struttura ricettiva"
        />
      </div>

      {/* Step Indicator */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                    currentStep === step.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : currentStep > step.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-muted bg-background text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.icon
                  )}
                </button>
                <span
                  className={`mt-1.5 hidden text-xs font-medium sm:block ${
                    currentStep === step.id
                      ? "text-primary"
                      : currentStep > step.id
                        ? "text-primary/70"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {step.id < STEPS.length && (
                <div
                  className={`mx-2 h-0.5 flex-1 ${
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Step 1: Info Base */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Proprietà</Label>
                <Input id="name" placeholder="Es: Appartamento Vista Dolomiti" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL</Label>
                <Input id="slug" placeholder="appartamento-vista-dolomiti" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="short-desc">Descrizione Breve</Label>
                <Input id="short-desc" placeholder="Breve descrizione per le card (max 100 caratteri)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrizione Completa</Label>
                <Textarea id="description" rows={5} placeholder="Descrivi la tua proprietà in dettaglio..." />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo di Proprietà</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Seleziona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Appartamento</SelectItem>
                      <SelectItem value="house">Casa</SelectItem>
                      <SelectItem value="studio">Monolocale</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Stato</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Attiva</SelectItem>
                      <SelectItem value="inactive">Inattiva</SelectItem>
                      <SelectItem value="maintenance">Manutenzione</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Posizione */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Posizione</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Indirizzo</Label>
                <Input id="street" placeholder="Via, numero civico" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">Città</Label>
                  <Input id="city" placeholder="Es: San Martino di Castrozza" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Provincia</Label>
                  <Input id="province" placeholder="Es: TN" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">CAP</Label>
                  <Input id="postal-code" placeholder="Es: 38058" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Paese</Label>
                <Input id="country" defaultValue="Italia" />
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitudine</Label>
                  <Input id="lat" type="number" step="0.0001" placeholder="46.2626" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lng">Longitudine</Label>
                  <Input id="lng" type="number" step="0.0001" placeholder="11.8042" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Dettagli */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Dettagli Struttura</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="max-guests">Ospiti Massimi</Label>
                  <Input id="max-guests" type="number" min="1" placeholder="4" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Camere da Letto</Label>
                  <Input id="bedrooms" type="number" min="0" placeholder="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bagni</Label>
                  <Input id="bathrooms" type="number" min="1" placeholder="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beds">Letti Totali</Label>
                  <Input id="beds" type="number" min="1" placeholder="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sqm">Superficie (m²)</Label>
                  <Input id="sqm" type="number" min="1" placeholder="65" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Servizi */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Servizi e Comfort</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {Object.entries(AMENITY_LABELS).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Checkbox id={`amenity-${key}`} />
                    <Label htmlFor={`amenity-${key}`} className="text-sm font-normal cursor-pointer">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Foto */}
        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Fotografie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border-2 border-dashed p-12 text-center">
                <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm font-medium">
                  Trascina le foto qui o clicca per caricare
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Formati supportati: JPG, PNG, WebP. Max 10MB per foto.
                </p>
                <Button variant="outline" className="mt-4">
                  Seleziona File
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Oppure inserisci gli URL delle immagini</Label>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Input
                      key={i}
                      placeholder={`URL immagine ${i}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Prezzi */}
        {currentStep === 6 && (
          <Card>
            <CardHeader>
              <CardTitle>Prezzi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="base-price">Prezzo Base / Notte (EUR)</Label>
                  <Input id="base-price" type="number" min="0" step="5" placeholder="95" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cleaning-fee">Costo Pulizia (EUR)</Label>
                  <Input id="cleaning-fee" type="number" min="0" step="5" placeholder="50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weekend-surcharge">Supplemento Weekend (EUR)</Label>
                  <Input id="weekend-surcharge" type="number" min="0" step="5" placeholder="15" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Tariffe Stagionali</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-4">
                    <div className="space-y-2">
                      <Label>Nome Stagione</Label>
                      <Input placeholder="Es: Alta Stagione Inverno" />
                    </div>
                    <div className="space-y-2">
                      <Label>Data Inizio</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Data Fine</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Prezzo / Notte (EUR)</Label>
                      <Input type="number" min="0" step="5" placeholder="140" />
                    </div>
                  </div>
                  <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-4">
                    <div className="space-y-2">
                      <Label>Nome Stagione</Label>
                      <Input placeholder="Es: Alta Stagione Estate" />
                    </div>
                    <div className="space-y-2">
                      <Label>Data Inizio</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Data Fine</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Prezzo / Notte (EUR)</Label>
                      <Input type="number" min="0" step="5" placeholder="120" />
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  + Aggiungi Stagione
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 7: Regole */}
        {currentStep === 7 && (
          <Card>
            <CardHeader>
              <CardTitle>Regole della Casa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="check-in-time">Orario Check-in</Label>
                  <Input id="check-in-time" type="time" defaultValue="15:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="check-out-time">Orario Check-out</Label>
                  <Input id="check-out-time" type="time" defaultValue="10:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-stay-rule">Soggiorno Minimo (notti)</Label>
                  <Input id="min-stay-rule" type="number" min="1" defaultValue="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-stay-rule">Soggiorno Massimo (notti)</Label>
                  <Input id="max-stay-rule" type="number" min="1" defaultValue="30" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Fumo Permesso</p>
                    <p className="text-xs text-muted-foreground">
                      Consenti agli ospiti di fumare nella struttura
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Animali Ammessi</p>
                    <p className="text-xs text-muted-foreground">
                      Consenti agli ospiti di portare animali domestici
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Feste Permesse</p>
                    <p className="text-xs text-muted-foreground">
                      Consenti l&#39;organizzazione di feste ed eventi
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={goToBack}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Indietro
        </Button>
        <span className="text-sm text-muted-foreground">
          Passo {currentStep} di {STEPS.length}
        </span>
        {currentStep < STEPS.length ? (
          <Button onClick={goToNext} className="gap-2">
            Avanti
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="gap-2">
            <Check className="h-4 w-4" />
            Crea Proprietà
          </Button>
        )}
      </div>
    </motion.div>
  );
}
