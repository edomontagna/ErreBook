export interface Review {
  id: string;
  propertyId: string;
  bookingId: string;
  guest: {
    name: string;
    avatar?: string;
    nationality: string;
  };
  rating: number;
  comment: string;
  categories: {
    cleanliness: number;
    communication: number;
    checkIn: number;
    accuracy: number;
    location: number;
    value: number;
  };
  response?: string;
  createdAt: string;
}
