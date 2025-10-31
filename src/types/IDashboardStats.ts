export interface IDashboardStatsResponse {
  status: boolean;
  message: string;
  data: { data: DashboardStatsData };
}

export interface DashboardStatsData {
  total_users: number;
  total_bookings: number;
  total_staff: number;
  latest_bookings: LatestBooking[];
  top_packages: TopPackage[];
}

export interface LatestBooking {
  id: number;
  user_id: string;
  package_id: string;
  booking_date: string;
  amount: string;
  booking_time: string | null;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string | null;
  location: string | null;
  latitude: string | null;
  longitude: string | null;
  created_at: string;
  updated_at: string;
  user: BookingUser;
  package: BookingPackage;
}

export interface BookingUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  email_verified_at: string | null;
  role: string;
  avatar: string;
  country: string | null;
  state: string | null;
  city: string | null;
  dob: string | null;
  gender: string | null;
  location: string | null;
  referral_id: string | null;
  referral_by: string | null;
  status: string;
  allow_push: string;
  terms: string;
  expo_token: string | null;
  device_id: string | null;
  platform: string | null;
  google_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingPackage {
  id: number;
  name: string;
  description: string | null;
  price: string;
  image: string;
  status: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface TopPackage {
  package_id: string;
  total: string;
  package: BookingPackage;
}
