import { ResMessage, ResStatusCode } from '../../constants/index';
import { CustomRpcException } from '../custom-rpc.exception';

export class LoginFailException extends CustomRpcException {
  constructor(
    message = ResMessage.CANNOT_LOGIN,
    status = ResStatusCode.UNPROCESSABLE_ENTITY,
  ) {
    super({ message, status });
  }
}
