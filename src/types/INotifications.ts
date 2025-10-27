interface NotificationUser {
  id: number;
  name: string;
  avatar?: string | null;
}

interface NotificationData {
  type: string;
  user: NotificationUser;
  data_id: number;
  message: string;
  my_user_id: number;
}

interface Notification {
  id: string;
  type: string;
  read_at: string | null;
  created_at: string;
  data: NotificationData;
}

interface NotificationResponse {
  status: boolean;
  message: string;
  data: {
    notifications: {
      id: string;
      type: string;
      read_at: string | null;
      created_at: string;
      data: string; // JSON string
    }[];
  };
}

export type {
  Notification,
  NotificationData,
  NotificationResponse,
  NotificationUser,
};
