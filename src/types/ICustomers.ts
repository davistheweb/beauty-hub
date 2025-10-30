interface ICustomer {
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
  referral_by: string;
  status: "active" | "inactive" | "archived" | "suspended";
  allow_push: string;
  terms: string;
  expo_token: string | null;
  device_id: string | null;
  platform: "ios" | "android" | null;
  google_id: string | null;
  created_at: string;
  updated_at: string;
}

interface ICustomersResponse {
  status: boolean;
  message: string;
  data: {
    data: {
      current_page: number;
      data: ICustomer[];
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
  };
}
interface ICustomerPackage {
  id: number;
  name: string;
  description: string | null;
  price: string;
  image: string;
  status: string;
  created_at: string | null;
  updated_at: string | null;
}

interface ICustomerRating {
  id: number;
  user_id: string;
  package_id: string;
  booking_id: string;
  rating: string;
  comment: string;
  created_at: string;
  updated_at: string;
}

interface ICustomerBooking {
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
  package: ICustomerPackage;
  rating: ICustomerRating | null;
}

interface ICustomerDetails extends Omit<ICustomer, "bookings"> {
  bookings: ICustomerBooking[];
}

interface ICustomerDetailsResponse {
  status: boolean;
  message: string;
  data: { data: ICustomerDetails };
}

export type {
  ICustomer,
  ICustomerBooking,
  ICustomerDetails,
  ICustomerDetailsResponse,
  ICustomerPackage,
  ICustomerRating,
  ICustomersResponse,
};
