import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuthHello() {
    return this.authService.getAuthHello();
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@Req() req) {
    return this.authService.getUserInfo(req.user.id);
  }
}
