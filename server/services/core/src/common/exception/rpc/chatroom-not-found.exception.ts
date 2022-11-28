import { RpcException } from '@nestjs/microservices';
import { ResMessage, ResStatusCode } from '../../constants/index';

export class ChatRoomNotFoundException extends RpcException {
  constructor(
    message = ResMessage.CHAT_ROOM_NOT_FOUND,
    status = ResStatusCode.NOT_FOUND,
  ) {
    super({ message });
    this.status = status;
  }

  status: number;
}
