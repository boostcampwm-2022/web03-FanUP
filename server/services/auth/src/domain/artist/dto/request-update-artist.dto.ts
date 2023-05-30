import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class RequestUpdateArtistDto {
  @IsNumber()
  @Type(() => Number)
  artistId: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  profileUrl?: string;
}
