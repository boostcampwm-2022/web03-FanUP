interface CreateNotification {
  type: string;
  info: string;
  userId: number;
  message: string;
  read: boolean;
}

export { CreateNotification };
