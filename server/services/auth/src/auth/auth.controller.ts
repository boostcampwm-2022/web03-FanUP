import { Controller, Get, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from '@prisma/client';
import { AllRPCExceptionFilter } from 'src/common/exception/filter/rpc-exception.filter';

import { AuthService } from './auth.service';
import LoginDto from './dto/request-login.dto';
import { JwtService } from './jwt.service';

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

  @MessagePattern({ cmd: 'getUserInfo' })
  async getUserInfo(@Payload() userId: number): Promise<User> {
    return this.authService.getUserInfo(userId);
  }

  @MessagePattern({ cmd: 'verifyUser' })
  async verifyUser(@Payload() token: string) {
    return await this.authService.verifyUser(token);
  }
}
