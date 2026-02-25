export interface Property {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  type: "apartment" | "house" | "studio" | "villa";
  status: "active" | "inactive" | "maintenance";
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    lat: number;
    lng: number;
  };
  details: {
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    beds: number;
    squareMeters: number;
  };
  amenities: string[];
  images: string[];
  pricing: {
    basePrice: number;
    cleaningFee: number;
    weekendSurcharge: number;
    seasonalPricing: SeasonalPrice[];
    currency: string;
  };
  rules: {
    checkIn: string;
    checkOut: string;
    minStay: number;
    maxStay: number;
    smokingAllowed: boolean;
    petsAllowed: boolean;
    partiesAllowed: boolean;
  };
  rating: number;
  reviewCount: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SeasonalPrice {
  name: string;
  startDate: string;
  endDate: string;
  price: number;
}
