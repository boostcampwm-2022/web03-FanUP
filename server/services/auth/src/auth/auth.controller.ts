import { Controller, Get, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AllRPCExceptionFilter } from 'src/common/exception/filter/rpc-exception.filter';

import { AuthService } from './auth.service';
import LoginDto from './dto/request-login.dto';

@UseFilters(new AllRPCExceptionFilter())
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @MessagePattern({ cmd: 'getAuthHello' })
  getAuthHello(): string {
    return this.authService.getAuthHello();
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }
}
