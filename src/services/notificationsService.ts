import { NotificationResponse } from "@/types/INotifications";
import { API } from "./API";
import { getApiResponse } from "./helpers";

export const getNotificationsService =
  async (): Promise<NotificationResponse> =>
    getApiResponse(await API.post("/admin/notifications/fetch"));
