import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getCoreHello(): string {
    return 'Core server is running!';
  }
}
