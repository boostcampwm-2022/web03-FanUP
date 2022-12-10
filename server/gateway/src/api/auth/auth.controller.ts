import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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

  @Post('/artist')
  @UseGuards(JwtAuthGuard)
  async createArtist(@Req() { user }, @Body() body: CreateArtistDto) {
    return this.authService.createArtist({
      userId: user.id,
      ...body,
    });
  }

  @Get('/artist')
  async getAllArtist() {
    return this.authService.getAllArtist();
  }

  @Get('/artist/favorite')
  // @UseGuards(JwtAuthGuard)
  async getFavoriteArtist(@Req() { user }) {
    return this.authService.getFavoriteArtist(
      // userId: user.id,
      2,
    );
  }

  @Post('/artist/:artistId/favorite')
  // @UseGuards(JwtAuthGuard)
  async createFavoriteByArtistId(
    @Req() { user },
    @Param('artistId', ParseIntPipe) artistId: number,
  ) {
    console.log('asdf', user, artistId);
    return this.authService.createFavorite({
      // userId: user.id,
      userId: 2,
      artistId,
    });
  }

  @Delete('/artist/:artistId/favorite')
  // @UseGuards(JwtAuthGuard)
  async deleteFavoriteByArtistId(
    @Req() { user },
    @Param('artistId', ParseIntPipe) artistId: number,
  ) {
    return this.authService.deleteFavorite({
      // userId: user.id,
      userId: 2,
      artistId,
    });
  }
}
