import {
  addPackageAndService,
  fetchAllPackagesAndServices,
  updatePackageService,
} from "@/services/package-and-services";
import getErrorMessage from "@/utils/getErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function usePackages() {
  const queryClient = useQueryClient();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchAllPackagesAndServices,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const addPackage = useMutation({
    mutationFn: addPackageAndService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["packages"] }),
  });

  const updatePackage = useMutation({
    mutationFn: updatePackageService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["packages"] }),
  });

  const packages = (!isError && data?.data?.data) || [];

  const fetchPackagesErrorMessage: string = isError
    ? getErrorMessage(error)
    : "Something went wrong";

  return {
    packages,
    isLoading,
    addPackage,
    updatePackage,
    isError,
    fetchPackagesErrorMessage,
  };
}
