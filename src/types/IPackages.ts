interface IService {
  id: number;
  package_id: string;
  name: string;
  status: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IPackage {
  id: number;
  name: string;
  description: string | null;
  price: string;
  image: string;
  status: "active" | "inactive";
  created_at: string | null;
  updated_at: string | null;
  services: IService[];
}

interface IPackagesResponse {
  status: boolean;
  message: string;
  data: { data: IPackage[] };
}

export type { IPackagesResponse };
