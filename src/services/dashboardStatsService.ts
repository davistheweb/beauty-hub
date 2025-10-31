import { IDashboardStatsResponse } from "@/types/IDashboardStats";
import { API } from "./API";
import { getApiResponse } from "./helpers";

export const fetchDashboardStats = async (): Promise<IDashboardStatsResponse> =>
  getApiResponse(await API.post("/admin/dashboard/fetch_stats"));
