interface IBanner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  status: "active" | "inactive";
  created_at?: string;
  updated_at?: string;
}
interface IFetchBannerResponse {
  message: string;
  status: boolean;
  data: {
    current_page: number;
    data: { data: IBanner[] };
    total: number;
    per_page: number;
    last_page: number;
  };
}

export type { IBanner, IFetchBannerResponse };
