"use client";

import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, CalendarCheck, BedDouble, Euro } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { analyticsDashboard } from "@/data/analytics";
import { formatCurrency, formatPercent } from "@/lib/format";

function AnimatedValue({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const dur = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{value.toLocaleString("it-IT")}{suffix}</span>;
}

interface StatCardProps {
  title: string;
  rawValue: number;
  change: number;
  icon: React.ReactNode;
  index: number;
  prefix?: string;
  suffix?: string;
}

function StatCard({ title, rawValue, change, icon, index, prefix, suffix }: StatCardProps) {
  const isPositive = change >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }}
    >
      <Card className="gap-4 border-l-2 border-l-terra transition-all duration-300 hover:-translate-y-0.5">
        <CardContent className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-forest text-terra">
            {icon}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-medium tracking-tight">
                <AnimatedValue target={rawValue} prefix={prefix} suffix={suffix} />
              </p>
              <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {isPositive ? "+" : ""}{formatPercent(change)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function StatsCards() {
  const { totalRevenue, totalBookings, avgOccupancy, avgDailyRate, revenueChange, bookingsChange, occupancyChange } = analyticsDashboard;

  const stats = [
    { title: "Ricavi Totali", rawValue: totalRevenue, change: revenueChange, icon: <TrendingUp className="h-4 w-4" />, prefix: "€ " },
    { title: "Prenotazioni", rawValue: totalBookings, change: bookingsChange, icon: <CalendarCheck className="h-4 w-4" /> },
    { title: "Occupazione Media", rawValue: Math.round(avgOccupancy * 100), change: occupancyChange, icon: <BedDouble className="h-4 w-4" />, suffix: "%" },
    { title: "Tariffa Media", rawValue: avgDailyRate, change: 0, icon: <Euro className="h-4 w-4" />, prefix: "€ " },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => <StatCard key={stat.title} {...stat} index={i} />)}
    </div>
  );
}
