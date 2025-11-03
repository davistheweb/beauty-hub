import { getErrorResponse } from "@/services/helpers";
import {
  changeProfileAvatar,
  getProfile,
  updateProfile,
} from "@/services/profile";
import { AppDispatch, RootState } from "@/store";
import { setProfile } from "@/store/utils/adminProfileSlice";
import { IErrorInfo } from "@/types/Error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useProfile() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const adminProfileState = useSelector(
    (state: RootState) => state.admin.profile,
  );

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });

  const updateAvatar = useMutation({
    mutationFn: changeProfileAvatar,
    retry: false,
    networkMode: "always",
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });

  const profileInfo = data?.data[0];

  useEffect(() => {
    if (profileInfo)
      if (
        adminProfileState?.fullName?.trim() !== profileInfo.name.trim() ||
        adminProfileState?.email?.trim() !== profileInfo.email.trim() ||
        adminProfileState?.phoneNumber?.trim() !== profileInfo.phone.trim() ||
        adminProfileState?.avatar?.trim() !== profileInfo.avatar.trim()
      )
        dispatch(
          setProfile({
            fullName: profileInfo.name,
            email: profileInfo.email,
            phoneNumber: profileInfo.phone,
            avatar: profileInfo.avatar,
          }),
        );
  }, [profileInfo, adminProfileState, dispatch]);

  // console.log(profileInfo);

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
