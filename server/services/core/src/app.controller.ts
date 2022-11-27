import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ResMessage, ResStatusCode } from './common/constants';
import { SetResponse } from './common/decorator';
import { TransformInterceptor } from './common/interceptor';

@UseInterceptors(TransformInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @SetResponse(ResMessage.CORE_HELLO, ResStatusCode.OK)
  @MessagePattern('getCoreHello')
  getApiHello(): string {
    return this.appService.getCoreHello();
  }
}
