"use client";

import { motion } from "motion/react";
import { Save } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="space-y-6"
    >
      <PageHeader
        title="Impostazioni"
        description="Configura le preferenze della piattaforma"
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Generale</TabsTrigger>
          <TabsTrigger value="bookings">Prenotazioni</TabsTrigger>
          <TabsTrigger value="payments">Pagamenti</TabsTrigger>
          <TabsTrigger value="notifications">Notifiche</TabsTrigger>
          <TabsTrigger value="website">Sito Web</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Azienda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome Azienda</Label>
                  <Input id="company-name" defaultValue="ErreBook Hospitality" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vat">Partita IVA</Label>
                  <Input id="vat" defaultValue="IT12345678901" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="info@errebook.it" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input id="phone" type="tel" defaultValue="+39 0462 123456" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Indirizzo</Label>
                  <Input id="address" defaultValue="Via Roma 1, 38058 San Martino di Castrozza (TN)" />
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language">Lingua</Label>
                  <Select defaultValue="it">
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">Italiano</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Orario</Label>
                  <Select defaultValue="europe-rome">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-rome">Europe/Rome (CET)</SelectItem>
                      <SelectItem value="europe-london">Europe/London (GMT)</SelectItem>
                      <SelectItem value="europe-berlin">Europe/Berlin (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Valuta</Label>
                  <Select defaultValue="eur">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="usd">USD - Dollaro</SelectItem>
                      <SelectItem value="gbp">GBP - Sterlina</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Formato Data</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger id="date-format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Salva Modifiche
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Settings */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Prenotazioni</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="default-checkin">Orario Check-in Predefinito</Label>
                  <Input id="default-checkin" type="time" defaultValue="15:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-checkout">Orario Check-out Predefinito</Label>
                  <Input id="default-checkout" type="time" defaultValue="10:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-stay">Soggiorno Minimo (notti)</Label>
                  <Input id="min-stay" type="number" defaultValue="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-stay">Soggiorno Massimo (notti)</Label>
                  <Input id="max-stay" type="number" defaultValue="30" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Conferma Automatica</p>
                    <p className="text-xs text-muted-foreground">
                      Conferma automaticamente le prenotazioni dai canali diretti
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Prenotazione Istantanea</p>
                    <p className="text-xs text-muted-foreground">
                      Permetti la prenotazione senza approvazione
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Cancellazione Gratuita</p>
                    <p className="text-xs text-muted-foreground">
                      Cancellazione gratuita fino a 48 ore prima del check-in
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Richiedi Documenti</p>
                    <p className="text-xs text-muted-foreground">
                      Richiedi documento di identità agli ospiti
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Salva Modifiche
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Settings */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Pagamenti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stripe-key">Chiave API Stripe</Label>
                  <Input id="stripe-key" type="password" defaultValue="sk_live_****" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-webhook">Webhook Secret Stripe</Label>
                  <Input id="stripe-webhook" type="password" defaultValue="whsec_****" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Aliquota IVA (%)</Label>
                  <Input id="tax-rate" type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-fee">Commissione Servizio (%)</Label>
                  <Input id="service-fee" type="number" defaultValue="10" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Pagamento con Carta</p>
                    <p className="text-xs text-muted-foreground">
                      Accetta pagamenti con carte di credito/debito
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Bonifico Bancario</p>
                    <p className="text-xs text-muted-foreground">
                      Accetta pagamenti tramite bonifico bancario
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">PayPal</p>
                    <p className="text-xs text-muted-foreground">
                      Accetta pagamenti tramite PayPal
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Fatturazione Automatica</p>
                    <p className="text-xs text-muted-foreground">
                      Genera automaticamente le fatture dopo il pagamento
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Salva Modifiche
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Notifiche</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Notifiche Email</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Nuova Prenotazione</p>
                    <p className="text-xs text-muted-foreground">
                      Ricevi una notifica per ogni nuova prenotazione
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Cancellazione</p>
                    <p className="text-xs text-muted-foreground">
                      Notifica in caso di cancellazione
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Pagamento Ricevuto</p>
                    <p className="text-xs text-muted-foreground">
                      Conferma ricezione pagamento
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Nuova Recensione</p>
                    <p className="text-xs text-muted-foreground">
                      Notifica quando viene pubblicata una recensione
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Check-in Imminente</p>
                    <p className="text-xs text-muted-foreground">
                      Promemoria 24 ore prima del check-in
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Notifiche Ospiti</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Conferma Prenotazione</p>
                    <p className="text-xs text-muted-foreground">
                      Invia email di conferma all&#39;ospite
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Istruzioni Check-in</p>
                    <p className="text-xs text-muted-foreground">
                      Invia istruzioni per il check-in 24h prima
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Richiesta Recensione</p>
                    <p className="text-xs text-muted-foreground">
                      Richiedi una recensione dopo il check-out
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Salva Modifiche
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Website Settings */}
        <TabsContent value="website">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Sito Web</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="site-title">Titolo Sito</Label>
                  <Input id="site-title" defaultValue="ErreBook - Vacanze in Trentino e non solo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">URL Sito</Label>
                  <Input id="site-url" defaultValue="https://www.errebook.it" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="site-description">Descrizione SEO</Label>
                  <Textarea
                    id="site-description"
                    rows={3}
                    defaultValue="Scopri le nostre proprietà in Trentino Alto Adige, Verona e Milano. Appartamenti e case vacanza per le tue vacanze in montagna e in città."
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Sito Pubblico Attivo</p>
                    <p className="text-xs text-muted-foreground">
                      Rendi visibile il sito web pubblico
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Prenotazione Online</p>
                    <p className="text-xs text-muted-foreground">
                      Permetti prenotazioni dirette dal sito
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Chat Live</p>
                    <p className="text-xs text-muted-foreground">
                      Abilita la chat dal vivo per i visitatori
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Mostra Recensioni</p>
                    <p className="text-xs text-muted-foreground">
                      Mostra le recensioni sulle pagine delle proprietà
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ga-id">Google Analytics ID</Label>
                  <Input id="ga-id" placeholder="G-XXXXXXXXXX" defaultValue="G-AB12CD34EF" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fb-pixel">Facebook Pixel ID</Label>
                  <Input id="fb-pixel" placeholder="1234567890" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Salva Modifiche
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
