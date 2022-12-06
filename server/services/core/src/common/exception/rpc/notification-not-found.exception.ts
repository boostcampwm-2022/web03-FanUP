import { ResMessage, ResStatusCode } from '../../constants/index';
import { CustomRpcException } from '../custom-rpc.exception';

export class NotificationNotFoundException extends CustomRpcException {
  constructor(
    message = ResMessage.NOTIFICATION_NOT_FOUND,
    status = ResStatusCode.NOT_FOUND,
  ) {
    super({ message, status });
  }
}
