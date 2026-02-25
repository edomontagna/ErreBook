"use client";

import { motion } from "motion/react";
import { Award, Leaf, Heart, Building2, Users, Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const stats = [
  { value: "8", label: "Proprietà", icon: Building2 },
  { value: "200+", label: "Ospiti Soddisfatti", icon: Users },
  { value: "4.9", label: "Valutazione Media", icon: Star },
  { value: "3", label: "Destinazioni", icon: MapPin },
];

const values = [
  {
    icon: Award,
    title: "Qualità",
    description:
      "Ogni proprietà viene selezionata con cura e mantenuta ai massimi standard. Arredi di qualità, pulizia impeccabile e comfort moderni per garantire un'esperienza indimenticabile.",
  },
  {
    icon: Leaf,
    title: "Sostenibilità",
    description:
      "Ci impegniamo per un turismo responsabile. Dalle nostre Green House ai prodotti locali che consigliamo, promuoviamo pratiche sostenibili in ogni aspetto dell'ospitalità.",
  },
  {
    icon: Heart,
    title: "Ospitalità",
    description:
      "Crediamo che un soggiorno debba essere più di un semplice pernottamento. Accoglienza calorosa, consigli personalizzati e attenzione ai dettagli rendono ogni visita speciale.",
  },
];

export default function AboutPage() {
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
              Chi Siamo
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              ErreBook nasce dalla passione per l&apos;ospitalità e dal desiderio
              di offrire esperienze di soggiorno autentiche e di qualità in
              alcune delle destinazioni più belle d&apos;Italia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeInUp}>
              <h2 className="font-serif text-3xl font-bold">
                La Nostra Missione
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                La nostra missione è semplice: rendere ogni soggiorno
                un&apos;esperienza indimenticabile. Gestiamo personalmente ogni
                proprietà, dalla cura degli ambienti all&apos;accoglienza degli
                ospiti, per garantire standard elevati e un servizio attento.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Dalle vette mozzafiato delle Dolomiti alla vivacità di Milano,
                fino al fascino romantico di Verona, offriamo alloggi
                selezionati che combinano comfort, posizione strategica e
                carattere unico.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <Card key={stat.label} className="text-center">
                    <CardContent className="py-6">
                      <stat.icon className="mx-auto h-8 w-8 text-primary" />
                      <div className="mt-3 text-3xl font-bold">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      {/* Team */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-2 lg:order-1"
            >
              <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-8">
                <blockquote className="text-lg italic leading-relaxed text-muted-foreground">
                  &ldquo;Ogni appartamento racconta una storia. Il nostro compito
                  è assicurarci che ogni ospite diventi parte di quella storia,
                  portando a casa ricordi che durano una vita.&rdquo;
                </blockquote>
                <div className="mt-6">
                  <div className="font-semibold">Il Team ErreBook</div>
                  <div className="text-sm text-muted-foreground">
                    San Martino di Castrozza, Italia
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="order-1 lg:order-2"
            >
              <h2 className="font-serif text-3xl font-bold">Il Nostro Team</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Siamo un team di professionisti dell&apos;ospitalità con una
                profonda conoscenza del territorio. Viviamo e lavoriamo nelle
                stesse zone in cui si trovano le nostre proprietà, il che ci
                permette di offrire consigli autentici e un&apos;assistenza
                rapida e personalizzata.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Dalla gestione delle prenotazioni alla manutenzione, dalla
                pulizia all&apos;accoglienza, ogni aspetto è curato direttamente
                dal nostro team per garantire un&apos;esperienza senza pensieri.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      {/* Values */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="font-serif text-3xl font-bold">I Nostri Valori</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Tre principi guida che definiscono il nostro modo di fare
              ospitalità.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-5 font-serif text-xl font-bold">
                      {value.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
