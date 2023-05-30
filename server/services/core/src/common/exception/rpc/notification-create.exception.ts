import { ResMessage, ResStatusCode } from '../../constants/index';
import { CustomRpcException } from '../custom-rpc.exception';

export class NotificationCreateException extends CustomRpcException {
  constructor(
    message = ResMessage.NOTIFICATION_BAD_REQUEST,
    status = ResStatusCode.BAD_REQUEST,
  ) {
    super({ message, status });
  }
}
