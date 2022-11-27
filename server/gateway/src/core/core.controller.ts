import { Controller, Get } from '@nestjs/common';

import { CoreService } from './core.service';

@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  async getApiHello() {
    return await this.coreService.getApiHello();
  }

  @Get('/chat')
  async getAllchat() {
    return await this.coreService.getAllChatMessage();
  }
}
