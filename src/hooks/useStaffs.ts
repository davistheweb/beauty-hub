import { fetchStaffs } from "@/services/staffService";
import { IErrorInfo } from "@/types/Error";
import { IStaff } from "@/types/Istaff";
import getErrorMessage from "@/utils/getErrorMessage";
import { useQuery } from "@tanstack/react-query";

const useStaff = () => {
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

  const staffs: IStaff[] | [] = data?.data?.data?.data || [];

  console.log(staffs);

  const fetchStaffsErrorMessage = isFetchStaffsError
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  return {
    staffs,
    isStaffsLoading,
    isFetchStaffsError,
    fetchStaffsErrorMessage,
  };
};

export { useStaff };
