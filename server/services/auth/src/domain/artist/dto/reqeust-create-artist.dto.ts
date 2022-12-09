import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class requestCreateArtistDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  profileUrl: string;
}
