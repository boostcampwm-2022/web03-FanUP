import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTicketHello(): string {
    return 'Ticket server is running!';
  }
}
