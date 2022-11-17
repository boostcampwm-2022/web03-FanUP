import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('google')
  googleLogin(@Body() { accessCode }: Record<'accessCode', string>) {
    return this.appService.googleLogin(accessCode);
  }
}
