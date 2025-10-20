interface IBookings {
  id: number;
  user_id: string;
  package_id: string;
  booking_date: string;
  amount: string;
  booking_time: string | null;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string | null;
  location: string;
  latitude: string | null;
  longitude: string | null;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    email_verified_at: string;
    role: string;
    avatar: string;
    country: string | null;
    state: string | null;
    city: string | null;
    dob: string | null;
    gender: string | null;
    location: string | null;
    referral_id: string;
    referral_by: string;
    status: string;
    allow_push: string;
    terms: string;
    expo_token: string | null;
    device_id: string | null;
    platform: string | null;
    google_id: string | null;
    created_at: string;
    updated_at: string;
  };
  package: {
    id: number;
    name: string;
    description: string | null;
    price: string;
    image: string;
    status: string;
    created_at: string | null;
    updated_at: string | null;
  };
}

interface IBookingsResponse {
  message: string;
  status: boolean;
  data: {
    data: { data: IBookings[] };
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      page: number | null;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export type { IBookings, IBookingsResponse };
