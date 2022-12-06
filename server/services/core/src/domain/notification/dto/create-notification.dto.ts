export class CreateNotificationDto {
  constructor(user_id: number, message: string) {
    this.user_id = user_id;
    this.message = message;
  }

  user_id: number;
  message: string;
  read: boolean = false;
}
