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
  homeServiceFeeExtra?: number;
  description?: string;
  portfolioImages?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  serviceId?: string;
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
  ownerName: string;
  ownerAvatar?: string;
  slogan?: string;
  gender: GenderType;
  city: string;
  district: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
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
  openingHour?: string;
  closingHour?: string;
  workingDays?: string[];
  blockedSlots?: { date: string; timeSlot: string }[];
  featuredServices: string[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  reviews: ReviewItem[];
}

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';

export interface CustomerAddressDetail {
  province: string;
  city: string;
  address: string;
  plaque?: string;
  unit?: string;
  notes?: string;
  lat?: number;
  lng?: number;
}

export interface BookingRequest {
  id: string;
  trackingCode: string;
  salonId: string;
  salonName: string;
  serviceId: string;
  serviceName: string;
  price: number;
  homeFee?: number;
  durationMinutes?: number;
  serviceType: 'in_salon' | 'at_home';
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  addressDetail?: CustomerAddressDetail;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
  reminderEnabled?: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  fullName?: string;
  phone: string;
  role: 'customer' | 'barber';
  salonId?: string;
}

export interface SalonFilterState {
  searchQuery: string;
  city: string;
  district?: string;
  gender: 'all' | 'women' | 'men';
  category: string;
  priceLevel: string;
  serviceReception: 'all' | 'in_salon' | 'at_home';
  homeServiceOnly: boolean;
  preferredDate?: string;
  preferredTimeSlot?: string;
  sortBy: 'rating' | 'priceAsc' | 'priceDesc' | 'reviews' | 'distance';
}

export type ActiveView = 
  | 'home' 
  | 'search' 
  | 'women-salons'
  | 'men-salons'
  | 'salon-detail' 
  | 'compare' 
  | 'my-bookings' 
  | 'barber-panel' 
  | 'simulator'
  | 'dossier';
