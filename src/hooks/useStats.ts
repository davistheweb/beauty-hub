import { fetchDashboardStats } from "@/services/dashboardStatsService";
import { IErrorInfo } from "@/types/Error";
import { DashboardStatsData } from "@/types/IDashboardStats";
import getErrorMessage from "@/utils/getErrorMessage";
import { useQuery } from "@tanstack/react-query";

export default function useStats() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchDashboardStats,
    retry: 2,
    networkMode: "always",
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const statsDataResponse = data?.data?.data;

  const stats: DashboardStatsData = {
    total_users: statsDataResponse?.total_users ?? 0,
    total_bookings: statsDataResponse?.total_bookings ?? 0,
    total_staff: statsDataResponse?.total_staff ?? 0,
    latest_bookings: Array.isArray(statsDataResponse?.latest_bookings)
      ? statsDataResponse.latest_bookings
      : [],
    top_packages: Array.isArray(statsDataResponse?.top_packages)
      ? statsDataResponse.top_packages
      : [],
  };

  console.log(stats);

  const statsErrorMessage = isError
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "Something went wrong" } as IErrorInfo);

  return { stats, isLoading, isError, statsErrorMessage };
}
