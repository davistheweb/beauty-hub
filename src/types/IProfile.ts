interface IProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  status: "active" | "inactive";
}

interface IProfileResponse {
  status: boolean;
  message: string;
  data: IProfile[];
}

export type { IProfile, IProfileResponse };
