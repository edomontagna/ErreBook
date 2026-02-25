export interface Payment {
  id: string;
  bookingId: string;
  propertyName: string;
  guestName: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "overdue" | "refunded" | "partial";
  method: "stripe" | "bank_transfer" | "cash" | "paypal";
  stripePaymentId?: string;
  description: string;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
}
