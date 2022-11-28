import { Inject } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { catchError, lastValueFrom, of } from 'rxjs';
import { CustomRes } from '../types';
import { MICRO_SERVICES } from '../constants/microservices';

export class CoreService {
  constructor(
    @Inject(MICRO_SERVICES.CORE.NAME)
    private readonly apiClient: ClientTCP,
  ) {}

  async getApiHello() {
    const { status, data, message }: CustomRes = await lastValueFrom(
      this.apiClient.send('getCoreHello', {}),
    );
    return data;
  }

  async getAllChatMessage() {
    return this.apiClient
      .send('findChatByFanUPId', {})
      .pipe(catchError((val) => of({ error: val.message })));
  }

  // async createFanUPRoom() {
  //   return await lastValueFrom(
  //     this.apiClient.send({ cme: 'createFanUPRoom' }, {}),
  //   );
  // }

  // async enterFanUPRoom() {
  //   return await lastValueFrom(
  //     this.apiClient.send({ cme: 'enterFanUPRoom' }, {}),
  //   );
  // }

  // async exitFanUPRoom() {
  //   return await lastValueFrom(
  //     this.apiClient.send({ cme: 'exitFanUPRoom' }, {}),
  //   );
  // }

  // async deleteFanUPRoom() {
  //   return await lastValueFrom(
  //     this.apiClient.send({ cme: 'deleteFanUPRoom' }, {}),
  //   );
  // }
}
