import { ResMessage, ResStatusCode } from '../../constants/index';
import { CustomRpcException } from '../custom-rpc.exception';

export class NotificationUpdateException extends CustomRpcException {
  constructor(
    message = ResMessage.NOTIFICATION_UPDATE_FAIL,
    status = ResStatusCode.BAD_REQUEST,
  ) {
    super({ message, status });
  }
}
