"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  BedDouble,
  Euro,
  BarChart3,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/shared/page-header";
import { useAnalytics } from "@/hooks/use-analytics";
import { formatCurrency, formatPercent } from "@/lib/format";
import { SOURCE_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { StarRating } from "@/components/shared/star-rating";

const PERIODS = ["7D", "30D", "90D", "12M"] as const;
type Period = (typeof PERIODS)[number];

const PIE_COLORS = ["#C75C2E", "#6B7F3B", "#D4A843", "#7B68EE", "#E06C75", "#56B6C2"];

const revenueChartConfig = {
  revenue: {
    label: "Ricavi",
    color: "#C75C2E",
  },
} satisfies ChartConfig;

const occupancyChartConfig = {
  occupancyRate: {
    label: "Occupazione",
    color: "#6B7F3B",
  },
} satisfies ChartConfig;

const pieChartConfig = {
  direct: { label: "Diretto", color: PIE_COLORS[0] },
  airbnb: { label: "Airbnb", color: PIE_COLORS[1] },
  booking_com: { label: "Booking.com", color: PIE_COLORS[2] },
  vrbo: { label: "Vrbo", color: PIE_COLORS[3] },
  expedia: { label: "Expedia", color: PIE_COLORS[4] },
  other: { label: "Altro", color: PIE_COLORS[5] },
} satisfies ChartConfig;

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("12M");
  const analytics = useAnalytics(period);

  const kpiCards = [
    {
      title: "Ricavi Totali",
      value: formatCurrency(analytics.totalRevenue),
      change: analytics.revenueChange,
      icon: <Euro className="h-5 w-5" />,
    },
    {
      title: "Occupazione Media",
      value: formatPercent(analytics.avgOccupancy),
      change: analytics.occupancyChange,
      icon: <BedDouble className="h-5 w-5" />,
    },
    {
      title: "ADR (Tariffa Media)",
      value: formatCurrency(analytics.avgDailyRate),
      change: 0,
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "RevPAR",
      value: formatCurrency(analytics.revPar),
      change: 0,
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ];

  const pieData = analytics.bookingSources.map((source) => ({
    name: SOURCE_LABELS[source.source] || source.source,
    value: source.bookings,
    revenue: source.revenue,
    fill: PIE_COLORS[analytics.bookingSources.indexOf(source)] || "#888",
  }));

  const occupancyBarData = analytics.propertyStats
    .sort((a, b) => b.occupancyRate - a.occupancyRate)
    .map((stat) => ({
      name: stat.propertyName.length > 18
        ? stat.propertyName.slice(0, 18) + "..."
        : stat.propertyName,
      fullName: stat.propertyName,
      occupancyRate: stat.occupancyRate,
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="space-y-6"
    >
      <PageHeader title="Analytics" description="Analisi dettagliata delle performance">
        <div className="flex items-center gap-1 rounded-lg border p-1">
          {PERIODS.map((p) => (
            <Button
              key={p}
              variant={period === p ? "default" : "ghost"}
              size="sm"
              onClick={() => setPeriod(p)}
              className="h-7 px-3 text-xs"
            >
              {p}
            </Button>
          ))}
        </div>
      </PageHeader>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                  {kpi.icon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    {kpi.change !== 0 && (
                      <span
                        className={`text-xs font-medium ${
                          kpi.change >= 0 ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {kpi.change >= 0 ? "+" : ""}
                        {formatPercent(kpi.change)}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Andamento Ricavi</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueChartConfig} className="h-[350px] w-full">
            <AreaChart
              data={analytics.monthlyStats}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="analyticsRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C75C2E" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#C75C2E" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatCurrency(value as number)}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#C75C2E"
                strokeWidth={2}
                fill="url(#analyticsRevenueGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Occupancy by Property */}
        <Card>
          <CardHeader>
            <CardTitle>Occupazione per Proprietà</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={occupancyChartConfig} className="h-[350px] w-full">
              <BarChart
                data={occupancyBarData}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  fontSize={10}
                  angle={-25}
                  textAnchor="end"
                  height={70}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 100]}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelKey="fullName"
                      formatter={(value) => formatPercent(value as number)}
                    />
                  }
                />
                <Bar
                  dataKey="occupancyRate"
                  fill="#6B7F3B"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Booking Sources Pie */}
        <Card>
          <CardHeader>
            <CardTitle>Fonti Prenotazione</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={pieChartConfig} className="h-[350px] w-full">
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => `${value} prenotazioni`}
                    />
                  }
                />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percentage }) =>
                    `${name}`
                  }
                  labelLine={true}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>Classifica Proprietà</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Proprietà</TableHead>
                <TableHead className="text-right">Ricavi</TableHead>
                <TableHead className="text-right">Prenotazioni</TableHead>
                <TableHead className="text-right">Occupazione</TableHead>
                <TableHead className="text-right">ADR</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics.propertyStats
                .sort((a, b) => b.revenue - a.revenue)
                .map((stat, index) => (
                  <TableRow key={stat.propertyId}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {stat.propertyName}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(stat.revenue)}
                    </TableCell>
                    <TableCell className="text-right">{stat.bookings}</TableCell>
                    <TableCell className="text-right">
                      {formatPercent(stat.occupancyRate)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(stat.avgDailyRate)}
                    </TableCell>
                    <TableCell>
                      <StarRating rating={stat.avgRating} size={14} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
