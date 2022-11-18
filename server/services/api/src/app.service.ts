import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getApiHello(): string {
    return 'API server is running!';
  }
}
