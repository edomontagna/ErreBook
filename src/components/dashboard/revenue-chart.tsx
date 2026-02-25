"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { monthlyStats } from "@/data/analytics";
import { formatCurrency } from "@/lib/format";

const chartConfig = {
  revenue: {
    label: "Ricavi",
    color: "#C47F5A",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  return (
    <Card className="shadow-card border-stone-100">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Andamento Ricavi</CardTitle>
        <CardDescription className="text-xs">Ricavi mensili degli ultimi 12 mesi</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={monthlyStats}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C47F5A" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#C47F5A" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v: string) => v.slice(0, 3)} fontSize={11} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v: number) => formatCurrency(v)} fontSize={11} />
            <ChartTooltip content={<ChartTooltipContent formatter={(v) => formatCurrency(v as number)} />} />
            <Area type="monotone" dataKey="revenue" stroke="#C47F5A" strokeWidth={2} fill="url(#revenueGradient)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
