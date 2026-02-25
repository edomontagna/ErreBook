"use client";

import { motion } from "motion/react";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { OccupancyChart } from "@/components/dashboard/occupancy-chart";
import { RecentBookings } from "@/components/dashboard/recent-bookings";
import { PropertyOverview } from "@/components/dashboard/property-overview";

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="space-y-6"
    >
      <PageHeader
        title="Dashboard"
        description="Panoramica delle tue proprietà"
      />

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <OccupancyChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentBookings />
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Proprietà</h2>
          <PropertyOverview />
        </div>
      </div>
    </motion.div>
  );
}
