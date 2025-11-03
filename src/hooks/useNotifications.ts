"use client";
import getErrorResponse from "@/services/helpers";
import { getNotificationsService } from "@/services/notificationsService";
import { IErrorInfo } from "@/types/Error";
import { useQuery } from "@tanstack/react-query";

export default function useNotifications() {
  const {
    data,
    isPending: isLoading, //I am making use of isPending because isLoading is legacy but not yet deprecated
    error,
    isError,
  } = useQuery({
    queryFn: getNotificationsService,
    queryKey: ["notifications"],
    retry: false,
    networkMode: "always",
    refetchOnReconnect: true,
  });

  const notifications = data?.data?.data?.notifications || [];

  //Check if notificiation exists
  const hasNotification: boolean = notifications?.length > 0;

  const notificationErrorMessage = isError
    ? getErrorResponse(error)
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
