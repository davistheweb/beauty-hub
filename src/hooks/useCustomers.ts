import { suspendService, unSuspendService } from "@/services/controlService";
import {
  fetchCustomerDetails,
  fetchCustomers,
} from "@/services/customersServices";
import { IErrorInfo } from "@/types/Error";
import { ICustomer, ICustomerDetails } from "@/types/ICustomers";
import getErrorMessage from "@/utils/getErrorMessage";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";

const useCustomers = (page: number) => {
  const queryClient = useQueryClient();

  const customersQueryOptions = (pageNumber: number) =>
    queryOptions({
      queryFn: () => fetchCustomers({ page: pageNumber }),
      queryKey: ["customers", pageNumber],
      placeholderData: (prevData) => prevData,
      retry: false,
      networkMode: "always",
      staleTime: 60_000,
      gcTime: 1000 * 60 * 5,
    });

  const {
    data: allCustomersData,
    isPending: isAllCustomersDataPending,
    isFetching: isAllCustomersDataFetching,
    error,
    isError: isFetchCustomersError,
  } = useQuery(customersQueryOptions(page));

  useEffect(() => {
    if (
      allCustomersData?.data.data.current_page !==
      allCustomersData?.data.data.last_page
    )
      queryClient.prefetchQuery(customersQueryOptions(page + 1));
  }, [
    page,
    queryClient,
    allCustomersData?.data.data.current_page,
    allCustomersData?.data.data.last_page,
  ]);

  const searchCustomer = useMutation({
    retry: false,
    networkMode: "always",
    mutationFn: fetchCustomers,
  });

  console.log(error?.message);

  const customers: ICustomer[] | [] = !isFetchCustomersError
    ? allCustomersData?.data?.data?.data || []
    : [];

  const fetchCustomersErrorMessage = isFetchCustomersError
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  return {
    allCustomersData,
    customers,
    searchCustomer,
    isAllCustomersDataPending,
    isAllCustomersDataFetching,
    isFetchCustomersError,
    fetchCustomersErrorMessage,
  };
};

const useCustomerDetailsByID = (customerId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: customerDetailsData,
    isLoading: customerDetailsDataIsLoading,
    error,
    isError: isFetchCustomerDetailsError,
  } = useQuery({
    queryKey: ["customerDetailsData", customerId],
    queryFn: () => fetchCustomerDetails(customerId!),
    enabled: !!customerId,
    staleTime: 60_000,
    gcTime: 1000 * 60 * 5,
    retry: false,
    networkMode: "always",
    refetchOnReconnect: true,
  });

  const suspendedCustomer = useMutation({
    mutationFn: suspendService,
    retry: false,
    networkMode: "always",
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({
        queryKey: ["customerDetailsData", variables],
      });
    },
  });

  const unsuspendCustomer = useMutation({
    mutationFn: unSuspendService,
    retry: false,
    networkMode: "always",
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({
        queryKey: ["customerDetailsData", variables],
      });
    },
  });

  const customerDetails: ICustomerDetails | null =
    !isFetchCustomerDetailsError && customerDetailsData?.data?.data
      ? customerDetailsData?.data?.data
      : null;

  const fetchCustomerDetailsErrorMessage = isFetchCustomerDetailsError
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  return {
    customerDetails,
    suspendedCustomer,
    unsuspendCustomer,
    customerDetailsDataIsLoading,
    isFetchCustomerDetailsError,
    fetchCustomerDetailsErrorMessage,
  };
};

export { useCustomerDetailsByID, useCustomers };
