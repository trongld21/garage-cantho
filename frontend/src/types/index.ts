export interface ServiceItem {
  id: number;
  name: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  price_range: string;
  image: string;
  is_featured: boolean;
  process_steps?: { step: number; title: string; desc: string }[];
  benefits?: string[];
  pricing_table?: { name: string; price: string; note?: string }[];
  faqs?: { q: string; a: string }[];
}

export interface ProductItem {
  id: number;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  sale_price: number | null;
  stock: number;
  summary: string;
  description: string;
  image: string;
  is_featured: boolean;
  gallery?: string[];
  specifications?: Record<string, string>;
  compatible_vehicles?: string[];
}

export interface CarItem {
  id: number;
  title: string;
  slug: string;
  listing_type: 'sale' | 'rent';
  price: number;
  year: number;
  transmission: string;
  fuel_type: string;
  mileage: string;
  color: string;
  location: string;
  image: string;
  summary: string;
  description: string;
  status: string;
  seats?: number;
  engine_capacity?: string;
  gallery?: string[];
  features?: string[];
  history_report?: string;
}

export interface PostItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  published_at: string;
  author?: string;
  read_time?: string;
  tags?: string[];
}

export interface BookingPayload {
  customer_name: string;
  phone: string;
  email?: string;
  license_plate?: string;
  car_model?: string;
  car_year?: string;
  service_id?: number;
  service_name?: string;
  booking_date: string;
  booking_time: string;
  note?: string;
}

export interface BookingItem extends BookingPayload {
  id: number;
  booking_id: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
}

export interface RescuePayload {
  customer_name: string;
  phone: string;
  location: string;
  car_model?: string;
  issue_type?: string;
  issue_description?: string;
  coordinates?: { lat: number; lng: number };
}

export interface RescueItem extends RescuePayload {
  id: number;
  request_id: string;
  status: 'received' | 'dispatched' | 'resolved' | 'cancelled';
  created_at: string;
}

export interface DashboardStats {
  total_bookings: number;
  pending_bookings: number;
  active_rescues: number;
  total_services: number;
  total_products: number;
  total_cars: number;
  total_posts: number;
  estimated_revenue: number;
}
