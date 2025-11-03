import getErrorResponse from "@/services/helpers";
import {
  changeProfileAvatar,
  getProfile,
  updateProfile,
} from "@/services/profile";
import { IErrorInfo } from "@/types/Error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useProfile() {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading: profileLoading,
    isError,
    error,
  } = useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
    staleTime: 10 * 60 * 1000,
  });

  const update_profile = useMutation({
    mutationFn: updateProfile,
    retry: false,
    networkMode: "always",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const updateAvatar = useMutation({
    mutationFn: changeProfileAvatar,
    retry: false,
    networkMode: "always",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const profileInfo = data?.data[0];

  console.log(profileInfo);

  const profileErrorMessage = isError
    ? getErrorResponse(error)
    : ({ type: "unknown", message: "Something went wrong" } as IErrorInfo);

  return {
    profileInfo,
    update_profile,
    updateAvatar,
    profileLoading,
    isError,
    profileErrorMessage,
  };
}
