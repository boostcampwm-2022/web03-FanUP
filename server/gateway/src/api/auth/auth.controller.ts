import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AllGlobalExceptionsFilter } from 'src/common/exception/filter/global-exception.filter';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import CreateArtistDto from './dto/create-artist.dto';
import LoginDto from './dto/login.dto';
import UpdateUserDto from './dto/update-user.dto';

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

  @Patch('/user')
  @UseGuards(JwtAuthGuard)
  async updateUserInfo(@Req() { user }, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUserInfo(user.id, updateUserDto);
  }

  @Post('/artist')
  @UseGuards(JwtAuthGuard)
  async createArtist(@Req() { user }, @Body() body: CreateArtistDto) {
    return this.authService.createArtist({
      userId: user.id,
      ...body,
    });
  }

  @Get('/artist')
  @UseGuards(JwtAuthGuard)
  async getAllArtist(@Req() { user }) {
    return this.authService.getAllArtist(user.id);
  }

  @Get('/artist/favorite')
  @UseGuards(JwtAuthGuard)
  async getFavoriteArtist(@Req() { user }) {
    return this.authService.getFavoriteArtist(user.id);
  }

  @Post('/artist/:artistId/favorite')
  @UseGuards(JwtAuthGuard)
  async createFavoriteByArtistId(
    @Req() { user },
    @Param('artistId', ParseIntPipe) artistId: number,
  ) {
    console.log('asdf', user, artistId);
    return this.authService.createFavorite({
      userId: user.id,
      artistId,
    });
  }

  @Delete('/artist/:artistId/favorite')
  @UseGuards(JwtAuthGuard)
  async deleteFavoriteByArtistId(
    @Req() { user },
    @Param('artistId', ParseIntPipe) artistId: number,
  ) {
    return this.authService.deleteFavorite({
      userId: user.id,
      artistId,
    });
  }
}
