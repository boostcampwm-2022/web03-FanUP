import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello() {
    return this.authService.getAuthHello();
  }
}
