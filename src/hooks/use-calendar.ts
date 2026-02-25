"use client";

import { useMemo } from "react";
import { calendarEvents } from "@/data/calendar-events";
import { CalendarEvent } from "@/types/calendar";
import { isWithinInterval, parseISO } from "date-fns";

export function useCalendar(filters?: {
  propertyId?: string;
  startDate?: string;
  endDate?: string;
}) {
  const filtered = useMemo(() => {
    let result = [...calendarEvents];

    if (filters?.propertyId) {
      result = result.filter((e) => e.propertyId === filters.propertyId);
    }

    if (filters?.startDate && filters?.endDate) {
      const start = parseISO(filters.startDate);
      const end = parseISO(filters.endDate);
      result = result.filter((e) => {
        const eventStart = parseISO(e.startDate);
        const eventEnd = parseISO(e.endDate);
        return (
          isWithinInterval(eventStart, { start, end }) ||
          isWithinInterval(eventEnd, { start, end }) ||
          (eventStart <= start && eventEnd >= end)
        );
      });
    }

    return result;
  }, [filters]);

  const getEventsForDate = (date: string): CalendarEvent[] =>
    calendarEvents.filter((e) => {
      const d = parseISO(date);
      const start = parseISO(e.startDate);
      const end = parseISO(e.endDate);
      return d >= start && d < end;
    });

  const getEventsForProperty = (propertyId: string): CalendarEvent[] =>
    calendarEvents.filter((e) => e.propertyId === propertyId);

  return { events: filtered, getEventsForDate, getEventsForProperty };
}
