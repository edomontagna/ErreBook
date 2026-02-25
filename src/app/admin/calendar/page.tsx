"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  parseISO,
  isSameMonth,
  isToday,
  isWeekend,
  getDay,
} from "date-fns";
import { it } from "date-fns/locale";
import { PageHeader } from "@/components/shared/page-header";
import { calendarEvents } from "@/data/calendar-events";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1)); // Feb 2026

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => setCurrentMonth(new Date());

  // For each property, find events that overlap with the current month
  const propertyEvents = useMemo(() => {
    return properties.map((property) => {
      const events = calendarEvents.filter(
        (event) => event.propertyId === property.id
      );

      // For each day, find events
      const dayEvents = days.map((day) => {
        const dayStr = format(day, "yyyy-MM-dd");
        return events.filter((event) => {
          const start = parseISO(event.startDate);
          const end = parseISO(event.endDate);
          return day >= start && day < end;
        });
      });

      return {
        property,
        dayEvents,
      };
    });
  }, [currentMonth]);

  function getEventColor(event: (typeof calendarEvents)[0]): string {
    if (event.type === "maintenance") return "bg-gray-400/80";
    if (event.type === "blocked") return "bg-gray-500/80";
    if (event.status === "pending") return "bg-amber-400/80";
    if (event.status === "confirmed") return "bg-emerald-500/80";
    if (event.status === "completed") return "bg-blue-400/80";
    return "bg-slate-400/80";
  }

  function getEventBorderColor(event: (typeof calendarEvents)[0]): string {
    if (event.type === "maintenance") return "border-gray-500";
    if (event.type === "blocked") return "border-gray-600";
    if (event.status === "pending") return "border-amber-500";
    if (event.status === "confirmed") return "border-emerald-600";
    if (event.status === "completed") return "border-blue-500";
    return "border-slate-500";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="space-y-6"
    >
      <PageHeader
        title="Calendario"
        description="Visualizza le prenotazioni e la disponibilità"
      >
        <Button variant="outline" onClick={goToToday}>
          Oggi
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-xl capitalize">
                {format(currentMonth, "MMMM yyyy", { locale: it })}
              </CardTitle>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="hidden items-center gap-4 md:flex">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-emerald-500/80" />
                <span className="text-xs text-muted-foreground">Confermata</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-amber-400/80" />
                <span className="text-xs text-muted-foreground">In Attesa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-blue-400/80" />
                <span className="text-xs text-muted-foreground">Completata</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-gray-400/80" />
                <span className="text-xs text-muted-foreground">Manutenzione</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-gray-500/80" />
                <span className="text-xs text-muted-foreground">Bloccata</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Header - Days */}
            <div className="grid" style={{ gridTemplateColumns: `180px repeat(${days.length}, minmax(28px, 1fr))` }}>
              <div className="sticky left-0 z-10 border-b border-r bg-background p-2 text-xs font-medium text-muted-foreground">
                Proprietà
              </div>
              {days.map((day) => {
                const dayOfWeek = getDay(day);
                const isSat = dayOfWeek === 6;
                const isSun = dayOfWeek === 0;
                return (
                  <div
                    key={day.toISOString()}
                    className={`border-b border-r p-1 text-center ${
                      isToday(day) ? "bg-primary/10" : isWeekend(day) ? "bg-muted/50" : ""
                    }`}
                  >
                    <p className="text-[10px] text-muted-foreground">
                      {format(day, "EEE", { locale: it }).slice(0, 2)}
                    </p>
                    <p className={`text-xs font-medium ${isToday(day) ? "text-primary" : ""}`}>
                      {format(day, "d")}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Rows - Properties */}
            {propertyEvents.map(({ property, dayEvents }) => (
              <div
                key={property.id}
                className="grid"
                style={{ gridTemplateColumns: `180px repeat(${days.length}, minmax(28px, 1fr))` }}
              >
                <div className="sticky left-0 z-10 flex items-center border-b border-r bg-background p-2">
                  <span className="truncate text-xs font-medium" title={property.name}>
                    {property.name}
                  </span>
                </div>
                {days.map((day, dayIndex) => {
                  const events = dayEvents[dayIndex];
                  const hasEvent = events.length > 0;
                  const event = events[0];

                  // Determine if this is the start of an event
                  const isStart = event && format(parseISO(event.startDate), "yyyy-MM-dd") === format(day, "yyyy-MM-dd");

                  return (
                    <div
                      key={day.toISOString()}
                      className={`relative h-10 border-b border-r ${
                        isToday(day) ? "bg-primary/5" : isWeekend(day) ? "bg-muted/30" : ""
                      }`}
                      title={
                        event
                          ? `${event.title} (${event.startDate} - ${event.endDate})`
                          : undefined
                      }
                    >
                      {hasEvent && event && (
                        <div
                          className={`absolute inset-y-1 ${
                            isStart ? "left-1 rounded-l-sm" : "left-0"
                          } ${
                            format(parseISO(event.endDate), "yyyy-MM-dd") ===
                            format(
                              new Date(day.getTime() + 86400000),
                              "yyyy-MM-dd"
                            )
                              ? "right-1 rounded-r-sm"
                              : "right-0"
                          } ${getEventColor(event)} flex items-center overflow-hidden`}
                        >
                          {isStart && (
                            <span className="truncate px-1 text-[10px] font-medium text-white">
                              {event.title}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend for mobile */}
      <div className="flex flex-wrap items-center gap-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-emerald-500/80" />
          <span className="text-xs text-muted-foreground">Confermata</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-amber-400/80" />
          <span className="text-xs text-muted-foreground">In Attesa</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-blue-400/80" />
          <span className="text-xs text-muted-foreground">Completata</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-gray-400/80" />
          <span className="text-xs text-muted-foreground">Manutenzione</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-gray-500/80" />
          <span className="text-xs text-muted-foreground">Bloccata</span>
        </div>
      </div>
    </motion.div>
  );
}
