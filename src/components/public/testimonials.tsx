"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { reviews } from "@/data/reviews";
import { properties } from "@/data/properties";
import { Star } from "lucide-react";
import { useT } from "@/lib/i18n";

const selectedReviews = [reviews[0], reviews[2], reviews[7], reviews[9]];

function getPropertyName(propertyId: string): string {
  return properties.find((p) => p.id === propertyId)?.name ?? "";
}

export function Testimonials() {
  const { t } = useT();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % selectedReviews.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const review = selectedReviews[active];

  return (
    <section className="relative bg-forest py-28 sm:py-36 overflow-hidden">
      {/* Noise texture */}
      <div className="noise absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8 text-center">
        <p className="label-luxury">{t.testimonials.tag}</p>

        {/* Quote mark */}
        <div className="mt-6 font-serif text-[7rem] leading-none text-terra/10 select-none sm:text-[10rem]">
          &ldquo;
        </div>

        {/* Quote text */}
        <div className="-mt-16 sm:-mt-24 min-h-[160px] sm:min-h-[130px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="font-serif text-lg font-light italic leading-relaxed text-white/50 sm:text-xl sm:leading-relaxed"
            >
              {review.comment}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Author */}
        <div className="mt-8">
          <div className="mx-auto h-px w-8 bg-terra/25" />
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id + "-a"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-5"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                {review.guest.name}
              </div>
              <div className="mt-1 text-[10px] text-white/25">
                {getPropertyName(review.propertyId)}
              </div>
              <div className="mt-2.5 flex items-center justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} className={i < review.rating ? "fill-terra text-terra" : "text-white/10"} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {selectedReviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-500 ${
                i === active ? "h-1.5 w-6 bg-terra" : "h-1.5 w-1.5 bg-white/15 hover:bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
