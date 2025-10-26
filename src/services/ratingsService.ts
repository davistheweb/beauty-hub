import { IRatingsResponse } from "@/types/IRatings";
import { API } from "./axios";
import { getApiResponse } from "./helpers";

export const fetchRatingsService = async (search?: string): Promise<IRatingsResponse> =>
  getApiResponse(await API.post("/admin/rating/fetch_all_ratings", {search}));
