import {
  addPackageAndService,
  addSerive,
  deleteService,
  fetchAllPackagesAndServices,
  updatePackageService,
} from "@/services/package-and-services";
import { IErrorInfo } from "@/types/Error";
import getErrorMessage from "@/utils/getErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function usePackages() {
  const queryClient = useQueryClient();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchAllPackagesAndServices,
    retry: false,
    networkMode: "always",
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnReconnect: true,
  });

  const addPackage = useMutation({
    mutationFn: addPackageAndService,
    retry: false,
    networkMode: "always",
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["packages"] }),
  });

  const updatePackage = useMutation({
    retry: false,
    networkMode: "always",
    mutationFn: updatePackageService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["packages"] }),
  });

  const addServiceToPackage = useMutation({
    retry: false,
    networkMode: "always",
    mutationFn: addSerive,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["packages"] }),
  });

  const deletePackageService = useMutation({
    retry: false,
    networkMode: "always",
    mutationFn: deleteService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["packages"] }),
  });

  const packages = (!isError && data?.data?.data) || [];

  const fetchPackagesErrorMessage = isError
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  return {
    packages,
    isLoading,
    addPackage,
    addServiceToPackage,
    updatePackage,
    deletePackageService,
    isError,
    fetchPackagesErrorMessage,
  };
}
