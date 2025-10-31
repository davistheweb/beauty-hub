import { IRatingsResponse } from "@/types/IRatings";
import { API } from "./API";
import { getApiResponse } from "./helpers";

const fetchRatingsService = async ({
  page = 1,
  search = "",
}: {
  page?: number;
  search?: string;
}): Promise<IRatingsResponse> =>
  getApiResponse(
    await API.post(`/admin/rating/fetch_all_ratings?page=${page}`, { search }),
  );

const deleteRatingsService = async (id: number) =>
  getApiResponse(await API.post("/admin/rating/delete_review", { id }));

export { deleteRatingsService, fetchRatingsService };
