import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AllGlobalExceptionsFilter } from 'src/common/exception/filter/global-exception.filter';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
// import CreateArtistDto from './dto/create-artist.dto';
import LoginDto from './dto/login.dto';

@UseFilters(AllGlobalExceptionsFilter)
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
  getUserInfo(@Req() { user }) {
    return this.authService.getUserInfo(user.id);
  }

  // @Post('/artist')
  // @UseGuards(JwtAuthGuard)
  // async createArtist(@Req() { user }, @Body() body: CreateArtistDto) {
  //   return this.authService.createArtist({
  //     userId: user.id,
  //     ...body,
  //   });
  // }
}
