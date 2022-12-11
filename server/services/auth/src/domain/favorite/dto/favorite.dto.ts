import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export default class FavoriteDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  artistId: number;
}
