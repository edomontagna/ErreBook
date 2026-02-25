"use client";

import { TrendingUp, TrendingDown, CalendarCheck, BedDouble, Euro } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { analyticsDashboard } from "@/data/analytics";
import { formatCurrency, formatPercent } from "@/lib/format";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  index: number;
}

function StatCard({ title, value, change, icon, index }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" as const }}
    >
      <Card className="gap-4">
        <CardContent className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {isPositive ? "+" : ""}
                {formatPercent(change)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function StatsCards() {
  const { totalRevenue, totalBookings, avgOccupancy, avgDailyRate, revenueChange, bookingsChange, occupancyChange } =
    analyticsDashboard;

  const stats = [
    {
      title: "Ricavi Totali",
      value: formatCurrency(totalRevenue),
      change: revenueChange,
      icon: <TrendingUp className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Prenotazioni",
      value: totalBookings.toString(),
      change: bookingsChange,
      icon: <CalendarCheck className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Occupazione Media",
      value: formatPercent(avgOccupancy),
      change: occupancyChange,
      icon: <BedDouble className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Tariffa Media Giornaliera",
      value: formatCurrency(avgDailyRate),
      change: 0,
      icon: <Euro className="h-5 w-5 text-muted-foreground" />,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  );
}
