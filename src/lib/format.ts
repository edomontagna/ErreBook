import { format, formatDistanceToNow, parseISO } from "date-fns";
import { it } from "date-fns/locale";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "d MMM yyyy", { locale: it });
}

export function formatDateLong(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "d MMMM yyyy", { locale: it });
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "dd/MM/yyyy", { locale: it });
}

export function formatDateRange(start: string | Date, end: string | Date): string {
  const s = typeof start === "string" ? parseISO(start) : start;
  const e = typeof end === "string" ? parseISO(end) : end;
  return `${format(s, "d MMM", { locale: it })} - ${format(e, "d MMM yyyy", { locale: it })}`;
}

export function formatRelative(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: it });
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("it-IT").format(value);
}

export function formatNights(nights: number): string {
  return nights === 1 ? "1 notte" : `${nights} notti`;
}

export function formatGuests(guests: number): string {
  return guests === 1 ? "1 ospite" : `${guests} ospiti`;
}
