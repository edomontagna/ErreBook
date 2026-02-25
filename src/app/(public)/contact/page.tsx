"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormErrors { name?: string; email?: string; subject?: string; message?: string; }

export default function ContactPage() {
  const { t } = useT();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!name.trim()) e.name = t.contact.errors.nameRequired;
    if (!email.trim()) e.email = t.contact.errors.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t.contact.errors.emailInvalid;
    if (!subject.trim()) e.subject = t.contact.errors.subjectRequired;
    if (!message.trim()) e.message = t.contact.errors.messageRequired;
    else if (message.trim().length < 10) e.message = t.contact.errors.messageMin;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => { ev.preventDefault(); if (validate()) setSubmitted(true); };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Full-bleed hero */}
      <div className="relative h-[40vh] overflow-hidden sm:h-[50vh]">
        <Image
          src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1400&h=700&fit=crop&q=80"
          alt="Contact"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-forest/45" />
        <div className="noise absolute inset-0" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="label-luxury !text-terra-light/80">{t.contact.heroTag}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-4 font-serif text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">{t.contact.heroTitle}</motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-4 h-px w-16 origin-center bg-terra" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="mt-6 text-base text-white/45">{t.contact.heroSubtitle}</motion.p>
        </div>
      </div>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Info sidebar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
              <div>
                <p className="label-luxury">{t.contact.infoTag}</p>
                <h2 className="mt-3 font-serif text-2xl font-light">{t.contact.infoTitle}</h2>
                <div className="mt-3 h-px w-10 bg-terra/40" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t.contact.infoDesc}
              </p>

              <div className="space-y-px border border-border/60">
                {[
                  { icon: Mail, label: t.contact.email, value: siteConfig.company.email, href: `mailto:${siteConfig.company.email}` },
                  { icon: Phone, label: t.contact.phone, value: siteConfig.company.phone, href: `tel:${siteConfig.company.phone}` },
                  { icon: MapPin, label: t.contact.address, value: siteConfig.company.address },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 border-b border-border/60 last:border-b-0 p-5">
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-terra" />
                    <div>
                      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="mt-1 block text-sm hover:text-terra transition-colors">{item.value}</a>
                      ) : (
                        <p className="mt-1 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex h-48 items-center justify-center border border-border/60 bg-forest">
                <div className="text-center">
                  <MapPin className="mx-auto h-6 w-6 text-terra/30" />
                  <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-canvas/30">{t.contact.map}</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-2">
              {submitted ? (
                <div className="border border-border/60 py-20 text-center px-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 14 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center bg-forest">
                    <CheckCircle2 className="h-8 w-8 text-terra" />
                  </motion.div>
                  <h3 className="mt-8 font-serif text-2xl font-light">{t.contact.sent}</h3>
                  <div className="mx-auto mt-3 h-px w-10 bg-terra/40" />
                  <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">{t.contact.sentDesc}</p>
                  <Button className="mt-8 text-xs uppercase tracking-[0.15em]" variant="outline" onClick={() => { setSubmitted(false); setName(""); setEmail(""); setSubject(""); setMessage(""); setErrors({}); }}>
                    {t.contact.sendAnother}
                  </Button>
                </div>
              ) : (
                <div className="border border-border/60">
                  <div className="border-b border-border/60 px-6 py-5">
                    <h2 className="font-serif text-xl font-light">{t.contact.formTitle}</h2>
                  </div>
                  <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em]">{t.contact.name} <span className="text-destructive">*</span></Label>
                          <Input id="name" placeholder="Mario Rossi" value={name} onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }} aria-invalid={!!errors.name} />
                          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em]">{t.contact.emailField} <span className="text-destructive">*</span></Label>
                          <Input id="email" type="email" placeholder="mario@esempio.it" value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }} aria-invalid={!!errors.email} />
                          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-[10px] uppercase tracking-[0.2em]">{t.contact.subject} <span className="text-destructive">*</span></Label>
                        <Input id="subject" placeholder="Informazioni su una proprietà" value={subject} onChange={(e) => { setSubject(e.target.value); if (errors.subject) setErrors((p) => ({ ...p, subject: undefined })); }} aria-invalid={!!errors.subject} />
                        {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em]">{t.contact.message} <span className="text-destructive">*</span></Label>
                        <Textarea id="message" placeholder="Scrivi qui il tuo messaggio..." rows={6} value={message} onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((p) => ({ ...p, message: undefined })); }} aria-invalid={!!errors.message} className="min-h-[150px]" />
                        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                      </div>
                      <Button type="submit" className="gap-2 bg-forest text-canvas hover:bg-forest-light text-xs font-medium uppercase tracking-[0.2em] sm:w-auto w-full" size="lg">
                        <Send className="h-3.5 w-3.5" /> {t.contact.send}
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
