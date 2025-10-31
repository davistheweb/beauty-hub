//This code is for Suspending and Unsuspending both staff and users

import { API } from "./API";
import { getApiResponse } from "./helpers";

const suspendService = async (id: string) =>
  getApiResponse(await API.post("/admin/user/suspend_user", { id }));

const unSuspendService = async (id: string) =>
  getApiResponse(await API.post("/admin/user/unsuspend_user", { id }));

export { suspendService, unSuspendService };
