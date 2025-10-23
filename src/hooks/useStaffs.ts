import { fetchStaffs } from "@/services/staffService";
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
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const staffs: IStaff[] | [] = data?.data?.data?.data || [];

  console.log(staffs);

  const fetchStaffsErrorMessage: string = getErrorMessage(error);

  return {
    staffs,
    isStaffsLoading,
    isFetchStaffsError,
    fetchStaffsErrorMessage,
  };
};

export { useStaff };
