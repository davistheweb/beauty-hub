import { IDashboardStatsResponse } from "@/types/IDashboardStats";
import { API } from "./axios";
import { getApiResponse } from "./helpers";

export const fetchDashboardStats = async (): Promise<IDashboardStatsResponse> =>
  getApiResponse(await API.post("/admin/dashboard/fetch_stats"));
