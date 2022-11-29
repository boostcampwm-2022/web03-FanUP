import { RpcException } from '@nestjs/microservices';
import { ResMessage, ResStatusCode } from '../../constants/index';
import { CustomRpcException } from '../custom-rpc.exception';

export class ChatCreateFailException extends CustomRpcException {
  constructor(
    message = ResMessage.CHAT_CANNOT_CREATED,
    status = ResStatusCode.UNPROCESSABLE_ENTITY,
  ) {
    super({ message, status });
  }
}
