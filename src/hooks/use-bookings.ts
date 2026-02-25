"use client";

import { useMemo } from "react";
import { bookings } from "@/data/bookings";
import { Booking } from "@/types/booking";

export function useBookings(filters?: {
  search?: string;
  status?: string;
  propertyId?: string;
  source?: string;
}) {
  const filtered = useMemo(() => {
    let result = [...bookings];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (b) =>
          b.guest.name.toLowerCase().includes(q) ||
          b.propertyName.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q)
      );
    }

    if (filters?.status) {
      result = result.filter((b) => b.status === filters.status);
    }

    if (filters?.propertyId) {
      result = result.filter((b) => b.propertyId === filters.propertyId);
    }

    if (filters?.source) {
      result = result.filter((b) => b.source === filters.source);
    }

    return result.sort(
      (a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime()
    );
  }, [filters]);

  const getBooking = (id: string): Booking | undefined =>
    bookings.find((b) => b.id === id);

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;

  return { bookings: filtered, getBooking, pendingCount, confirmedCount, total: bookings.length };
}
