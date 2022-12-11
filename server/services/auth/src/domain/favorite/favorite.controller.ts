import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Favorite } from '@prisma/client';
import FavoriteDto from './dto/favorite.dto';
import { FavoriteService } from './favorite.service';

@Controller()
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @MessagePattern({ cmd: 'createFavorite' })
  async createFavorite(@Payload() favoriteDto: FavoriteDto): Promise<string> {
    return this.favoriteService.create(favoriteDto);
  }

  @MessagePattern({ cmd: 'deleteFavorite' })
  async deleteFavorite(@Payload() favoriteDto: FavoriteDto): Promise<string> {
    return this.favoriteService.delete(favoriteDto);
  }
}
