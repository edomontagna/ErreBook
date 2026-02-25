"use client";

import { useMemo } from "react";
import { analyticsDashboard, monthlyStats, propertyStats, bookingSources } from "@/data/analytics";

export function useAnalytics(period?: "7D" | "30D" | "90D" | "12M") {
  const data = useMemo(() => {
    const months = period === "7D" ? 1 : period === "30D" ? 1 : period === "90D" ? 3 : 12;
    const filteredMonthly = monthlyStats.slice(-months);

    return {
      ...analyticsDashboard,
      monthlyStats: filteredMonthly,
      propertyStats,
      bookingSources,
    };
  }, [period]);

  return data;
}
