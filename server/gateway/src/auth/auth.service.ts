import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../constants/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MICRO_SERVICES.AUTH.NAME)
    private readonly authClient: ClientProxy, // todo: ClientProxy, TCP 차이 알아보기
  ) {}

  getAuthHello() {
    return this.authClient.send({ cmd: 'getAuthHello' }, { text: 'testtest' });
  }
}
