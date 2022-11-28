import { RpcException } from '@nestjs/microservices';
import { ResMessage, ResStatusCode } from '../../constants/index';

export class ChatCreateFailException extends RpcException {
  constructor(
    message = ResMessage.CHAT_CANNOT_CREATED,
    status = ResStatusCode.UNPROCESSABLE_ENTITY,
  ) {
    super({ message });
    this.status = status;
  }

  status: number;
}
