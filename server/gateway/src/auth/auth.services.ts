import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../constants/microservices';

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
  @Inject(MICRO_SERVICES.AUTH.NAME)
  private readonly client: ClientTCP;

  onModuleInit() {}

  onModuleDestroy() {}
}
