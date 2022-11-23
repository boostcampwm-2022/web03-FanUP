import { Controller, Get, Inject } from '@nestjs/common';

import { CoreService } from './core.service';

@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  getApiHello() {
    return this.coreService.getApiHello();
  }
}
