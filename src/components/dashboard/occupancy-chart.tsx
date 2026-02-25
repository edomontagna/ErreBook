"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { propertyStats } from "@/data/analytics";
import { formatPercent } from "@/lib/format";

const chartConfig = {
  occupancyRate: {
    label: "Occupazione",
    color: "#6B7F3B",
  },
} satisfies ChartConfig;

function shortenPropertyName(name: string): string {
  const shortened: Record<string, string> = {
    "Accogliente Appartamento di Lusso": "App. Lusso",
    "Mountain House": "Mountain H.",
    "La Perla delle Dolomiti": "Perla Dolomiti",
    "Appartamento Latemar": "App. Latemar",
    "Marte Apartment": "Marte",
    "Giove Apartment": "Giove",
    "Verona Romantica": "VR Romantica",
    "Green House Verona": "Green House",
  };
  return shortened[name] ?? name;
}

const chartData = propertyStats.map((stat) => ({
  ...stat,
  shortName: shortenPropertyName(stat.propertyName),
}));

export function OccupancyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Occupazione per Proprieta</CardTitle>
        <CardDescription>Tasso di occupazione medio per ogni struttura</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="shortName"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={60}
              fontSize={11}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: number) => `${value}%`}
              domain={[0, 100]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelKey="propertyName"
                  formatter={(value) => formatPercent(value as number)}
                />
              }
            />
            <Bar
              dataKey="occupancyRate"
              fill="#6B7F3B"
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
