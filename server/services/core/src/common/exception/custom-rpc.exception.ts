import { RpcException } from '@nestjs/microservices';

export class CustomRpcException extends RpcException {
  constructor({ message, status }) {
    super({ message });
    this.status = status;
  }

  status: number;
}
