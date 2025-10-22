import {
  fetchCustomerDetails,
  fetchCustomers,
} from "@/services/customersServices";
import { ICustomer } from "@/types/ICustomers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useCustomers = () => {
  const { data, isLoading: isAllCustomersDataLoading } = useQuery({
    queryFn: fetchCustomers,
    queryKey: ["customers"],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const customers: ICustomer[] | [] = data?.data.data.data || [];

  return { customers, isAllCustomersDataLoading };
};

const useCustomerDetailsByID = (customerId?: string) => {
  const queryClient = useQueryClient();

  const { data: customerDetailsData, isLoading: customerDetailsDataIsLoading } =
    useQuery({
      queryKey: ["customerDetailsData", customerId],
      queryFn: () => fetchCustomerDetails(customerId!),
      enabled: !!customerId,
      staleTime: 1000 * 60 * 2,
    });

  const customerDetails = customerDetailsData?.data.data;

  return { customerDetails, customerDetailsDataIsLoading };
};

export { useCustomerDetailsByID, useCustomers };
