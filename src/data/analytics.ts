import { AnalyticsDashboard, MonthlyStats, PropertyStats, BookingSourceStats } from "@/types/analytics";

export const monthlyStats: MonthlyStats[] = [
  { month: "Mar 2025", revenue: 8420, bookings: 12, occupancyRate: 52, avgDailyRate: 89, revPar: 46 },
  { month: "Apr 2025", revenue: 9180, bookings: 14, occupancyRate: 58, avgDailyRate: 92, revPar: 53 },
  { month: "Mag 2025", revenue: 7650, bookings: 10, occupancyRate: 45, avgDailyRate: 85, revPar: 38 },
  { month: "Giu 2025", revenue: 11200, bookings: 16, occupancyRate: 68, avgDailyRate: 98, revPar: 67 },
  { month: "Lug 2025", revenue: 15800, bookings: 22, occupancyRate: 82, avgDailyRate: 115, revPar: 94 },
  { month: "Ago 2025", revenue: 18500, bookings: 25, occupancyRate: 92, avgDailyRate: 125, revPar: 115 },
  { month: "Set 2025", revenue: 10400, bookings: 15, occupancyRate: 55, avgDailyRate: 95, revPar: 52 },
  { month: "Ott 2025", revenue: 7800, bookings: 11, occupancyRate: 42, avgDailyRate: 88, revPar: 37 },
  { month: "Nov 2025", revenue: 6200, bookings: 8, occupancyRate: 35, avgDailyRate: 82, revPar: 29 },
  { month: "Dic 2025", revenue: 14500, bookings: 20, occupancyRate: 78, avgDailyRate: 120, revPar: 94 },
  { month: "Gen 2026", revenue: 16200, bookings: 21, occupancyRate: 85, avgDailyRate: 128, revPar: 109 },
  { month: "Feb 2026", revenue: 14800, bookings: 19, occupancyRate: 79, avgDailyRate: 118, revPar: 93 },
];

export const propertyStats: PropertyStats[] = [
  { propertyId: "prop-1", propertyName: "Accogliente Appartamento di Lusso", revenue: 22450, bookings: 28, occupancyRate: 72, avgRating: 4.8, avgDailyRate: 112 },
  { propertyId: "prop-2", propertyName: "Mountain House", revenue: 19800, bookings: 22, occupancyRate: 68, avgRating: 5.0, avgDailyRate: 135 },
  { propertyId: "prop-3", propertyName: "La Perla delle Dolomiti", revenue: 28500, bookings: 24, occupancyRate: 75, avgRating: 5.0, avgDailyRate: 165 },
  { propertyId: "prop-4", propertyName: "Appartamento Latemar", revenue: 18200, bookings: 20, occupancyRate: 62, avgRating: 4.89, avgDailyRate: 125 },
  { propertyId: "prop-5", propertyName: "Marte Apartment", revenue: 8400, bookings: 35, occupancyRate: 78, avgRating: 5.0, avgDailyRate: 62 },
  { propertyId: "prop-6", propertyName: "Giove Apartment", revenue: 11200, bookings: 30, occupancyRate: 75, avgRating: 5.0, avgDailyRate: 72 },
  { propertyId: "prop-7", propertyName: "Verona Romantica", revenue: 16800, bookings: 26, occupancyRate: 65, avgRating: 4.83, avgDailyRate: 95 },
  { propertyId: "prop-8", propertyName: "Green House Verona", revenue: 12300, bookings: 22, occupancyRate: 60, avgRating: 4.93, avgDailyRate: 78 },
];

export const bookingSources: BookingSourceStats[] = [
  { source: "direct", bookings: 68, revenue: 42800, percentage: 32 },
  { source: "airbnb", bookings: 52, revenue: 35200, percentage: 25 },
  { source: "booking_com", bookings: 45, revenue: 30500, percentage: 22 },
  { source: "vrbo", bookings: 22, revenue: 15800, percentage: 11 },
  { source: "expedia", bookings: 14, revenue: 9500, percentage: 7 },
  { source: "other", bookings: 6, revenue: 3850, percentage: 3 },
];

export const analyticsDashboard: AnalyticsDashboard = {
  totalRevenue: 137650,
  totalBookings: 207,
  avgOccupancy: 69.4,
  avgDailyRate: 105.5,
  revPar: 73.2,
  revenueChange: 12.5,
  bookingsChange: 8.3,
  occupancyChange: 5.2,
  monthlyStats,
  propertyStats,
  bookingSources,
};
