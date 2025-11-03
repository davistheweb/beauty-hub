import {
  addBannerService,
  deleteBannerService,
  fetchBannersService,
  updateBannerService,
} from "@/services/BannerSettings";
import getErrorResponse from "@/services/helpers";
import { IErrorInfo } from "@/types/Error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useBanner() {
  const queryClient = useQueryClient();
  const {
    data,
    isPending: isLoading, //I am making use of isPending because isLoading is legacy but not yet deprecated
    error,
    isError: isFetchBannerError,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: fetchBannersService,
    retry: false,
    networkMode: "always",
    refetchOnReconnect: true,
    staleTime: 60_000,
    gcTime: 1000 * 60 * 5,
  });

  // console.log(data);

  const banners = data?.data?.data?.data || [];

  const fetchBannerErrorMessage = isFetchBannerError
    ? getErrorResponse(error)
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
