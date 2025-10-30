import { suspendService, unSuspendService } from "@/services/controlService";
import {
  addStaffService,
  fetchStaffs,
  updateStaffService,
} from "@/services/staffService";
import { IErrorInfo } from "@/types/Error";
import { IStaff } from "@/types/IStaff";
import getErrorMessage from "@/utils/getErrorMessage";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";

const useStaff = (page: number = 1) => {
  const queryClient = useQueryClient();

  const staffQueryOptions = (pageNumber: number) =>
    queryOptions({
      queryFn: () => fetchStaffs(pageNumber),
      queryKey: ["staffs", pageNumber],
      placeholderData: (prevData) => prevData,
      retry: false,
      networkMode: "always",
      refetchOnReconnect: true,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const {
    data: allStaffsData,
    isPending: isStaffsDataPending,
    isFetching: isAllStaffDataFetching,
    error,
    isError: isFetchStaffsError,
  } = useQuery(staffQueryOptions(page));

  useEffect(() => {
    if (
      allStaffsData?.data.data.current_page !==
      allStaffsData?.data.data.last_page
    )
      queryClient.prefetchQuery(staffQueryOptions(page + 1));
  }, [
    page,
    queryClient,
    allStaffsData?.data.data.current_page,
    allStaffsData?.data.data.last_page,
  ]);

  const addStaff = useMutation({
    mutationFn: addStaffService,
    retry: false,
    networkMode: "always",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
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

  const staffs: IStaff[] | [] = allStaffsData?.data?.data?.data || [];

  console.log(staffs);

  const fetchStaffsErrorMessage = isFetchStaffsError
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  return {
    allStaffsData,
    staffs,
    addStaff,
    suspendedStaff,
    unsuspendStaff,
    updateStaff,
    isStaffsDataPending,
    isAllStaffDataFetching,
    isFetchStaffsError,
    fetchStaffsErrorMessage,
  };
};

export { useStaff };
