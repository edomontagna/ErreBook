export const BOOKING_STATUS = {
  CONFIRMED: "confirmed",
  PENDING: "pending",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  NO_SHOW: "no_show",
} as const;

export const PAYMENT_STATUS = {
  PAID: "paid",
  PENDING: "pending",
  OVERDUE: "overdue",
  REFUNDED: "refunded",
  PARTIAL: "partial",
} as const;

export const PROPERTY_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  MAINTENANCE: "maintenance",
} as const;

export const AMENITIES = [
  "wifi",
  "parking",
  "kitchen",
  "washer",
  "dryer",
  "ac",
  "heating",
  "tv",
  "pool",
  "gym",
  "elevator",
  "balcony",
  "garden",
  "bbq",
  "fireplace",
  "dishwasher",
  "pet_friendly",
  "ski_storage",
  "mountain_view",
  "city_view",
] as const;

export const AMENITY_LABELS: Record<string, string> = {
  wifi: "Wi-Fi",
  parking: "Parcheggio",
  kitchen: "Cucina",
  washer: "Lavatrice",
  dryer: "Asciugatrice",
  ac: "Aria Condizionata",
  heating: "Riscaldamento",
  tv: "TV",
  pool: "Piscina",
  gym: "Palestra",
  elevator: "Ascensore",
  balcony: "Balcone",
  garden: "Giardino",
  bbq: "Barbecue",
  fireplace: "Camino",
  dishwasher: "Lavastoviglie",
  pet_friendly: "Animali Ammessi",
  ski_storage: "Deposito Sci",
  mountain_view: "Vista Montagna",
  city_view: "Vista Città",
};

export const BOOKING_SOURCES = [
  "direct",
  "airbnb",
  "booking_com",
  "vrbo",
  "expedia",
  "other",
] as const;

export const SOURCE_LABELS: Record<string, string> = {
  direct: "Diretto",
  airbnb: "Airbnb",
  booking_com: "Booking.com",
  vrbo: "Vrbo",
  expedia: "Expedia",
  other: "Altro",
};
