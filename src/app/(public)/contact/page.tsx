"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) newErrors.name = "Il nome è obbligatorio";
    if (!email.trim()) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Inserisci un'email valida";
    }
    if (!subject.trim()) newErrors.subject = "L'oggetto è obbligatorio";
    if (!message.trim()) {
      newErrors.message = "Il messaggio è obbligatorio";
    } else if (message.trim().length < 10) {
      newErrors.message = "Il messaggio deve avere almeno 10 caratteri";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-stone-900 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,146,47,0.1),_transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-serif text-4xl font-bold sm:text-5xl">
              Contattaci
            </h1>
            <p className="mt-6 text-lg text-white/70">
              Hai domande o vuoi saperne di più? Siamo qui per aiutarti.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact info sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-2xl font-bold">Informazioni</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Puoi contattarci tramite il modulo oppure utilizzando i
                riferimenti qui sotto. Rispondiamo entro 24 ore.
              </p>

              <div className="space-y-4">
                <Card>
                  <CardContent className="flex items-start gap-4 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <a
                        href={`mailto:${siteConfig.company.email}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {siteConfig.company.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Telefono</div>
                      <a
                        href={`tel:${siteConfig.company.phone}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {siteConfig.company.phone}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Indirizzo</div>
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.company.address}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map placeholder */}
              <div className="overflow-hidden rounded-xl border bg-muted">
                <div className="flex h-48 items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 opacity-40" />
                    <p className="mt-2 text-sm">Mappa interattiva</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <Card>
                  <CardContent className="py-16 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                    >
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </motion.div>
                    <h3 className="mt-6 font-serif text-2xl font-bold">
                      Messaggio Inviato!
                    </h3>
                    <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                      Grazie per averci contattato. Ti risponderemo il prima
                      possibile.
                    </p>
                    <Button
                      className="mt-8"
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setEmail("");
                        setSubject("");
                        setMessage("");
                        setErrors({});
                      }}
                    >
                      Invia un altro messaggio
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">
                      Scrivici un Messaggio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            Nome e Cognome <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="Mario Rossi"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (errors.name)
                                setErrors((p) => ({ ...p, name: undefined }));
                            }}
                            aria-invalid={!!errors.name}
                          />
                          {errors.name && (
                            <p className="text-xs text-destructive">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="mario@esempio.it"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email)
                                setErrors((p) => ({ ...p, email: undefined }));
                            }}
                            aria-invalid={!!errors.email}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">
                          Oggetto <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="subject"
                          placeholder="Informazioni su una proprietà"
                          value={subject}
                          onChange={(e) => {
                            setSubject(e.target.value);
                            if (errors.subject)
                              setErrors((p) => ({ ...p, subject: undefined }));
                          }}
                          aria-invalid={!!errors.subject}
                        />
                        {errors.subject && (
                          <p className="text-xs text-destructive">
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          Messaggio <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Scrivi qui il tuo messaggio..."
                          rows={6}
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                            if (errors.message)
                              setErrors((p) => ({ ...p, message: undefined }));
                          }}
                          aria-invalid={!!errors.message}
                          className="min-h-[150px]"
                        />
                        {errors.message && (
                          <p className="text-xs text-destructive">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto">
                        <Send className="h-4 w-4" />
                        Invia Messaggio
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
