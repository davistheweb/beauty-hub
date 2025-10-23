export interface IRatingsResponse {
  status: boolean;
  message: string;
  data: IRatingsPagination;
}

export interface IRatingsPagination {
  current_page: number;
  data: { data: IRating[] };
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

export interface IRating {
  id: number;
  user_id: string;
  rating: string;
  comment: string;
  created_at: string;

  user: {
    name: string;
    email: string;
    avatar: string;
  };
}
