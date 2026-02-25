"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { reviews } from "@/data/reviews";
import { properties } from "@/data/properties";
import { StarRating } from "@/components/shared/star-rating";
import { Card, CardContent } from "@/components/ui/card";

// Pick 4 diverse, high-quality reviews
const selectedReviews = [reviews[0], reviews[2], reviews[7], reviews[9]];

function getPropertyName(propertyId: string): string {
  return properties.find((p) => p.id === propertyId)?.name ?? "";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Testimonials() {
  return (
    <section className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            Cosa Dicono i Nostri Ospiti
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Le esperienze autentiche di chi ha scelto ErreBook per le proprie
            vacanze.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {selectedReviews.map((review) => (
            <motion.div key={review.id} variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col justify-between pt-2">
                  <div>
                    <Quote className="mb-3 h-8 w-8 text-primary/20" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 border-t pt-4">
                    <div className="font-semibold">{review.guest.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {getPropertyName(review.propertyId)}
                    </div>
                    <div className="mt-2">
                      <StarRating
                        rating={review.rating}
                        size={14}
                        showValue={false}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
