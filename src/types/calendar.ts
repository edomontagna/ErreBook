export interface CalendarEvent {
  id: string;
  propertyId: string;
  propertyName: string;
  bookingId?: string;
  type: "booking" | "blocked" | "maintenance";
  title: string;
  startDate: string;
  endDate: string;
  guestName?: string;
  color: string;
  status?: string;
}

export interface CalendarDay {
  date: string;
  events: CalendarEvent[];
  isToday: boolean;
  isWeekend: boolean;
}
