import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../constants/microservices';

@Controller('api')
export class ApiController {
  constructor(
    @Inject(MICRO_SERVICES.API.NAME)
    private readonly apiClient: ClientProxy, // todo: ClientProxy, TCP 차이 알아보기
  ) {}

  @Get()
  getApiHello() {
    return this.apiClient.send({ cmd: 'getApiHello' }, {});
  }
}
