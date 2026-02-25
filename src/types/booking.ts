export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  guest: {
    name: string;
    email: string;
    phone: string;
    nationality: string;
  };
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  status: "confirmed" | "pending" | "cancelled" | "completed" | "no_show";
  source: "direct" | "airbnb" | "booking_com" | "vrbo" | "expedia" | "other";
  pricing: {
    baseTotal: number;
    cleaningFee: number;
    serviceFee: number;
    taxes: number;
    total: number;
    currency: string;
  };
  paymentStatus: "paid" | "pending" | "partial" | "refunded";
  notes: string;
  createdAt: string;
  updatedAt: string;
}
