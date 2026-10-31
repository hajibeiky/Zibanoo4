/**
 * زیبانو (ZIBANO) - تعاریف تایپ‌های سامانه
 */

export type GenderType = 'women' | 'men' | 'both';

export type PriceLevel = 'اقتصادی' | 'متوسط' | 'لوکس';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number; // Toman
  priceFormatted: string;
  durationMinutes: number;
  homeServiceAvailable: boolean;
  description?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  userName: string;
  date: string;
  rating: number;
  comment: string;
  serviceName: string;
  isVerifiedTest: boolean;
}

export interface Salon {
  id: string;
  name: string;
  gender: GenderType;
  city: string;
  district: string;
  address: string;
  phone: string;
  rating: number;
  reviewsCount: number;
  priceLevel: PriceLevel;
  priceRangeText: string;
  hasHomeService: boolean;
  homeServiceFee: number; // Toman
  imageUrl: string;
  galleryImages: string[];
  description: string;
  workingHours: string;
  featuredServices: string[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  reviews: ReviewItem[];
}

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface BookingRequest {
  id: string;
  trackingCode: string;
  salonId: string;
  salonName: string;
  serviceId: string;
  serviceName: string;
  price: number;
  serviceType: 'in_salon' | 'at_home';
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  date: string; // YYYY-MM-DD or Jalali
  timeSlot: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface SalonFilterState {
  searchQuery: string;
  city: string;
  gender: 'all' | 'women' | 'men';
  category: string;
  priceLevel: string;
  homeServiceOnly: boolean;
  sortBy: 'rating' | 'priceAsc' | 'priceDesc' | 'reviews';
}

export type ActiveView = 
  | 'home' 
  | 'search' 
  | 'salon-detail' 
  | 'compare' 
  | 'my-bookings' 
  | 'barber-panel' 
  | 'dossier';
