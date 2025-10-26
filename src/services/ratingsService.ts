import { IRatingsResponse } from "@/types/IRatings";
import { API } from "./axios";
import { getApiResponse } from "./helpers";

const fetchRatingsService = async (
  search?: string,
): Promise<IRatingsResponse> =>
  getApiResponse(await API.post("/admin/rating/fetch_all_ratings", { search }));

const deleteRatingsService = async (id: number) =>
  getApiResponse(await API.post("/admin/rating/delete_review", { id }));

export { deleteRatingsService, fetchRatingsService };
