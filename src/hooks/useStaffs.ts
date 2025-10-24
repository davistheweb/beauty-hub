import { suspendService, unSuspendService } from "@/services/controlService";
import {
  addStaffService,
  fetchStaffs,
  updateStaffService,
} from "@/services/staffService";
import { IErrorInfo } from "@/types/Error";
import { IStaff } from "@/types/IStaff";
import getErrorMessage from "@/utils/getErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useStaff = () => {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading: isStaffsLoading,
    error,
    isError: isFetchStaffsError,
  } = useQuery({
    queryFn: fetchStaffs,
    queryKey: ["staffs"],
    retry: false,
    networkMode: "always",
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const addStaff = useMutation({
    mutationFn: addStaffService,
    retry: false,
    networkMode: "always",
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staffs"] }),
  });

  const updateStaff = useMutation({
    mutationFn: updateStaffService,
    retry: false,
    networkMode: "always",
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staffs"] }),
  });

  const suspendedStaff = useMutation({
    mutationFn: suspendService,
    retry: false,
    networkMode: "always",
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staffs"] }),
  });

  const unsuspendStaff = useMutation({
    mutationFn: unSuspendService,
    retry: false,
    networkMode: "always",
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staffs"] }),
  });

  const staffs: IStaff[] | [] = data?.data?.data?.data || [];

  console.log(staffs);

  const fetchStaffsErrorMessage = isFetchStaffsError
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  return {
    staffs,
    addStaff,
    suspendedStaff,
    unsuspendStaff,
    updateStaff,
    isStaffsLoading,
    isFetchStaffsError,
    fetchStaffsErrorMessage,
  };
};

export { useStaff };
