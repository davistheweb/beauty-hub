import {
  addBannerService,
  deleteBannerService,
  fetchBannersService,
  updateBannerService,
} from "@/services/BannerSettings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useBanner() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: fetchBannersService,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  console.log(data);

  const banners = data?.data.data.data || [];

  const deleteBanner = useMutation({
    mutationFn: deleteBannerService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  const addBanner = useMutation({
    mutationFn: addBannerService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  const updateBanner = useMutation({
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
  };
}
