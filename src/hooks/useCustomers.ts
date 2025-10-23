import {
  fetchCustomerDetails,
  fetchCustomers,
} from "@/services/customersServices";
import { ICustomer, ICustomerDetails } from "@/types/ICustomers";
import getErrorMessage from "@/utils/getErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useCustomers = () => {
  const {
    data,
    isLoading: isAllCustomersDataLoading,
    error,
    isError: isFetchCustomersError,
  } = useQuery({
    queryFn: fetchCustomers,
    queryKey: ["customers"],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  console.log(error?.message);

  const customers: ICustomer[] | [] = !isFetchCustomersError
    ? data?.data.data.data || []
    : [];

  const fetchCustomersErrorMessage: string = isFetchCustomersError
    ? getErrorMessage(error)
    : "Something went wrong";

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
    retry: (failureCount, err) => {
      if (err instanceof AxiosError && err.response?.status === 404)
        return false;

      return failureCount < 2;
    },
  });

  const customerDetails: ICustomerDetails | null =
    !isFetchCustomerDetailsError && customerDetailsData?.data?.data
      ? customerDetailsData?.data?.data
      : null;

  const fetchCustomerDetailsErrorMessage: string = isFetchCustomerDetailsError
    ? getErrorMessage(error)
    : "Something went wrong";

  return {
    customerDetails,
    customerDetailsDataIsLoading,
    isFetchCustomerDetailsError,
    fetchCustomerDetailsErrorMessage,
  };
};

export { useCustomerDetailsByID, useCustomers };
