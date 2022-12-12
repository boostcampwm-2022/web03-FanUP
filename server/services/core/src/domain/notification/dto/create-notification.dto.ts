export class CreateNotificationDto {
  constructor(user_id: number, message: string) {
    this.user_id = user_id;
    this.message = message;
  }

  type: string;
  info: string;
  user_id: number;
  message: string;
  read: boolean = false;
}
