"use client";

import { useMemo } from "react";
import { properties } from "@/data/properties";
import { Property } from "@/types/property";

export function useProperties(filters?: {
  search?: string;
  city?: string;
  type?: string;
  minGuests?: number;
  status?: string;
}) {
  const filtered = useMemo(() => {
    let result = [...properties];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.address.city.toLowerCase().includes(q)
      );
    }

    if (filters?.city) {
      result = result.filter((p) => p.address.city === filters.city);
    }

    if (filters?.type) {
      result = result.filter((p) => p.type === filters.type);
    }

    if (filters?.minGuests) {
      result = result.filter((p) => p.details.maxGuests >= filters.minGuests!);
    }

    if (filters?.status) {
      result = result.filter((p) => p.status === filters.status);
    }

    return result;
  }, [filters]);

  const getProperty = (id: string): Property | undefined =>
    properties.find((p) => p.id === id);

  const getPropertyBySlug = (slug: string): Property | undefined =>
    properties.find((p) => p.slug === slug);

  const cities = [...new Set(properties.map((p) => p.address.city))];

  return { properties: filtered, getProperty, getPropertyBySlug, cities, total: properties.length };
}
