import { Inject } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { catchError, lastValueFrom, of } from 'rxjs';
import * as FormData from 'form-data';
import { MICRO_SERVICES } from '../../common/constants/microservices';
import { CustomRes } from '../../common/types';

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
      .pipe(catchError((err) => of(err)));
  }

  uploadSingleFile(file) {
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });
    return formData.submit(
      `http://${MICRO_SERVICES.CORE.HOST}:4002/file/single`,
      function (err, res) {
        if (err) return err;
        return res;
      },
    );
  }

  uploadMultipleFile(files) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file.buffer, { filename: file.originalname });
    });
    return formData.submit(
      `http://${MICRO_SERVICES.CORE.HOST}:4002/file/multiple`,
      function (err, res) {
        if (err) return err;
        return res;
      },
    );
  }

  async getAllFanUP() {
    return await this.apiClient
      .send('getAllFanUP', {})
      .pipe(catchError((err) => of(err)));
  }

  async createFanUP(data) {
    return await this.apiClient
      .send('createFanUP', data)
      .pipe(catchError((err) => of(err)));
  }
}
