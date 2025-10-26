import {
  addBannerService,
  deleteBannerService,
  fetchBannersService,
  updateBannerService,
} from "@/services/BannerSettings";
import { IErrorInfo } from "@/types/Error";
import getErrorMessage from "@/utils/getErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useBanner() {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    error,
    isError: isFetchBannerError,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: fetchBannersService,
    retry: false,
    networkMode: "always",
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  console.log(data);

  const banners = data?.data?.data?.data || [];

  const fetchBannerErrorMessage = isFetchBannerError
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  const deleteBanner = useMutation({
    retry: false,
    networkMode: "always",
    mutationFn: deleteBannerService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  const addBanner = useMutation({
    retry: false,
    networkMode: "always",
    mutationFn: addBannerService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  const updateBanner = useMutation({
    retry: false,
    networkMode: "always",
    mutationFn: updateBannerService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  return {
    banners,
    isLoading,
    deleteBanner,
    addBanner,
    updateBanner,
    isFetchBannerError,
    fetchBannerErrorMessage,
  };
}
