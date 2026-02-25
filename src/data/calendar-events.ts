import { CalendarEvent } from "@/types/calendar";

export const calendarEvents: CalendarEvent[] = [
  // Prop 1 - Accogliente Appartamento di Lusso
  { id: "evt-1", propertyId: "prop-1", propertyName: "Accogliente Appartamento di Lusso", bookingId: "book-1", type: "booking", title: "Marco Bianchi", startDate: "2026-02-20", endDate: "2026-02-25", guestName: "Marco Bianchi", color: "#C75C2E", status: "confirmed" },
  { id: "evt-2", propertyId: "prop-1", propertyName: "Accogliente Appartamento di Lusso", bookingId: "book-22", type: "booking", title: "Lisa Wagner", startDate: "2026-03-08", endDate: "2026-03-14", guestName: "Lisa Wagner", color: "#C75C2E", status: "confirmed" },
  // Prop 2 - Mountain House
  { id: "evt-3", propertyId: "prop-2", propertyName: "Mountain House", bookingId: "book-2", type: "booking", title: "Klaus Müller", startDate: "2026-02-28", endDate: "2026-03-07", guestName: "Klaus Müller", color: "#6B7F3B", status: "confirmed" },
  { id: "evt-4", propertyId: "prop-2", propertyName: "Mountain House", type: "maintenance", title: "Manutenzione caldaia", startDate: "2026-03-08", endDate: "2026-03-09", color: "#888888" },
  // Prop 3 - La Perla delle Dolomiti
  { id: "evt-5", propertyId: "prop-3", propertyName: "La Perla delle Dolomiti", bookingId: "book-3", type: "booking", title: "Sophie Laurent", startDate: "2026-03-01", endDate: "2026-03-08", guestName: "Sophie Laurent", color: "#D4A843", status: "confirmed" },
  { id: "evt-6", propertyId: "prop-3", propertyName: "La Perla delle Dolomiti", bookingId: "book-18", type: "booking", title: "Emma Johnson", startDate: "2026-03-20", endDate: "2026-03-27", guestName: "Emma Johnson", color: "#D4A843", status: "pending" },
  // Prop 4 - Appartamento Latemar
  { id: "evt-7", propertyId: "prop-4", propertyName: "Appartamento Latemar", bookingId: "book-4", type: "booking", title: "Anna Rossi", startDate: "2026-03-10", endDate: "2026-03-15", guestName: "Anna Rossi", color: "#7B68EE", status: "pending" },
  { id: "evt-8", propertyId: "prop-4", propertyName: "Appartamento Latemar", bookingId: "book-20", type: "booking", title: "Michael Schmidt", startDate: "2026-03-22", endDate: "2026-03-29", guestName: "Michael Schmidt", color: "#7B68EE", status: "confirmed" },
  // Prop 5 - Marte Apartment
  { id: "evt-9", propertyId: "prop-5", propertyName: "Marte Apartment", bookingId: "book-5", type: "booking", title: "Roberto Conti", startDate: "2026-03-02", endDate: "2026-03-05", guestName: "Roberto Conti", color: "#E06C75", status: "confirmed" },
  { id: "evt-10", propertyId: "prop-5", propertyName: "Marte Apartment", bookingId: "book-25", type: "booking", title: "Federica Baldi", startDate: "2026-03-15", endDate: "2026-03-18", guestName: "Federica Baldi", color: "#E06C75", status: "pending" },
  // Prop 6 - Giove Apartment
  { id: "evt-11", propertyId: "prop-6", propertyName: "Giove Apartment", bookingId: "book-6", type: "booking", title: "Elena Marchetti", startDate: "2026-03-07", endDate: "2026-03-10", guestName: "Elena Marchetti", color: "#56B6C2", status: "confirmed" },
  { id: "evt-12", propertyId: "prop-6", propertyName: "Giove Apartment", bookingId: "book-24", type: "booking", title: "Matteo Ricci", startDate: "2026-02-24", endDate: "2026-02-27", guestName: "Matteo Ricci", color: "#56B6C2", status: "confirmed" },
  // Prop 7 - Verona Romantica
  { id: "evt-13", propertyId: "prop-7", propertyName: "Verona Romantica", bookingId: "book-7", type: "booking", title: "James Smith", startDate: "2026-03-15", endDate: "2026-03-20", guestName: "James Smith", color: "#C678DD", status: "pending" },
  { id: "evt-14", propertyId: "prop-7", propertyName: "Verona Romantica", type: "blocked", title: "Blocco proprietario", startDate: "2026-03-25", endDate: "2026-03-31", color: "#666666" },
  // Prop 8 - Green House Verona
  { id: "evt-15", propertyId: "prop-8", propertyName: "Green House Verona", bookingId: "book-8", type: "booking", title: "Maria Fischer", startDate: "2026-03-05", endDate: "2026-03-09", guestName: "Maria Fischer", color: "#98C379", status: "confirmed" },
  { id: "evt-16", propertyId: "prop-8", propertyName: "Green House Verona", bookingId: "book-23", type: "booking", title: "Andrea Galli", startDate: "2026-02-20", endDate: "2026-02-23", guestName: "Andrea Galli", color: "#98C379", status: "confirmed" },
  // Completed bookings
  { id: "evt-17", propertyId: "prop-2", propertyName: "Mountain House", bookingId: "book-21", type: "booking", title: "Chiara Fontana", startDate: "2026-02-14", endDate: "2026-02-19", guestName: "Chiara Fontana", color: "#6B7F3B", status: "completed" },
  { id: "evt-18", propertyId: "prop-7", propertyName: "Verona Romantica", bookingId: "book-19", type: "booking", title: "Diego Moretti", startDate: "2026-02-05", endDate: "2026-02-09", guestName: "Diego Moretti", color: "#C678DD", status: "completed" },
];
