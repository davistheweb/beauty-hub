interface INotification {
  id: string;
  type: string;
  read_at: string | null;
  created_at: string;
  data: string;
}

interface NotificationResponse {
  status: boolean;
  message: string;
  data: {
    data: {
      notifications: INotification[];
    };
  };
}

export type { INotification, NotificationResponse };
