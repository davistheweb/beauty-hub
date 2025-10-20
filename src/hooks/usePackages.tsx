import {
  addPackageAndService,
  fetchAllPackagesAndServices,
} from "@/services/package-and-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function usePackages() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchAllPackagesAndServices,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const addService = useMutation({
    mutationFn: addPackageAndService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["packages"] }),
  });

  const packages = data?.data?.data || [];

  return { packages, isLoading, addService };
}
