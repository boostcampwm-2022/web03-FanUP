import { Inject } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { MICRO_SERVICES } from '../constants/microservices';

export class CoreService {
  constructor(
    @Inject(MICRO_SERVICES.CORE.NAME)
    private readonly apiClient: ClientTCP,
  ) {}

  getApiHello() {
    return this.apiClient.send({ cmd: 'getCoreHello' }, {});
  }

  async createFanUPRoom() {
    return await lastValueFrom(
      this.apiClient.send({ cme: 'createFanUPRoom' }, {}),
    );
  }

  async enterFanUPRoom() {
    return await lastValueFrom(
      this.apiClient.send({ cme: 'enterFanUPRoom' }, {}),
    );
  }

  async exitFanUPRoom() {
    return await lastValueFrom(
      this.apiClient.send({ cme: 'exitFanUPRoom' }, {}),
    );
  }

  async deleteFanUPRoom() {
    return await lastValueFrom(
      this.apiClient.send({ cme: 'deleteFanUPRoom' }, {}),
    );
  }
}
