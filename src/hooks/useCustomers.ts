import {
  fetchCustomerDetails,
  fetchCustomers,
} from "@/services/customersServices";
import { IErrorInfo } from "@/types/Error";
import { ICustomer, ICustomerDetails } from "@/types/ICustomers";
import getErrorMessage from "@/utils/getErrorMessage";
import { useQuery } from "@tanstack/react-query";

const useCustomers = () => {
  const {
    data,
    isLoading: isAllCustomersDataLoading,
    error,
    isError: isFetchCustomersError,
  } = useQuery({
    queryFn: fetchCustomers,
    queryKey: ["customers"],
    retry: false,
    networkMode: "always",
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  console.log(error?.message);

  const customers: ICustomer[] | [] = !isFetchCustomersError
    ? data?.data?.data?.data || []
    : [];

  const fetchCustomersErrorMessage = isFetchCustomersError
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  return {
    customers,
    isAllCustomersDataLoading,
    isFetchCustomersError,
    fetchCustomersErrorMessage,
  };
};

const useCustomerDetailsByID = (customerId?: string) => {
  // const queryClient = useQueryClient();

  const {
    data: customerDetailsData,
    isLoading: customerDetailsDataIsLoading,
    error,
    isError: isFetchCustomerDetailsError,
  } = useQuery({
    queryKey: ["customerDetailsData", customerId],
    queryFn: () => fetchCustomerDetails(customerId!),
    enabled: !!customerId,
    staleTime: 1000 * 60 * 2,
    retry: false,
    networkMode: "always",
    refetchOnReconnect: true,
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
    customerDetailsDataIsLoading,
    isFetchCustomerDetailsError,
    fetchCustomerDetailsErrorMessage,
  };
};

export { useCustomerDetailsByID, useCustomers };
