"use client";
import { getNotificationsService } from "@/services/notificationsService";
import { IErrorInfo } from "@/types/Error";
import getErrorMessage from "@/utils/getErrorMessage";
import { useQuery } from "@tanstack/react-query";

export default function useNotifications() {
  const { data, isLoading, error, isError } = useQuery({
    queryFn: getNotificationsService,
    queryKey: ["notifications"],
  });

  const notifications = data?.data?.data?.notifications || [];

  //Check if notificiation exists
  const hasNotification: boolean = notifications?.length > 0;

  const notificationErrorMessage = isError
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "Something went wrong" } as IErrorInfo);

  console.log(notifications);

  console.log(hasNotification);

  return {
    notifications,
    hasNotification,
    isLoading,
    isError,
    notificationErrorMessage,
  };
}
