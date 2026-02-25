export interface MonthlyStats {
  month: string;
  revenue: number;
  bookings: number;
  occupancyRate: number;
  avgDailyRate: number;
  revPar: number;
}

export interface PropertyStats {
  propertyId: string;
  propertyName: string;
  revenue: number;
  bookings: number;
  occupancyRate: number;
  avgRating: number;
  avgDailyRate: number;
}

export interface BookingSourceStats {
  source: string;
  bookings: number;
  revenue: number;
  percentage: number;
}

export interface AnalyticsDashboard {
  totalRevenue: number;
  totalBookings: number;
  avgOccupancy: number;
  avgDailyRate: number;
  revPar: number;
  revenueChange: number;
  bookingsChange: number;
  occupancyChange: number;
  monthlyStats: MonthlyStats[];
  propertyStats: PropertyStats[];
  bookingSources: BookingSourceStats[];
}
