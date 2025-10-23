export interface IStaffResponse {
  status: boolean;
  message: string;
  data: IStaffPagination;
}

export interface IStaffPagination {
  current_page: number;
  data: { data: IStaff[] };
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: IPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface IPaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface IStaff {
  id: number;
  name: string;
  email: string;
  phone: string;
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
  status: "active" | "inactive" | string;
  allow_push: string;
  terms: string;
  expo_token: string | null;
  device_id: string | null;
  platform: string | null;
  google_id: string | null;
  created_at: string;
  updated_at: string;
}
