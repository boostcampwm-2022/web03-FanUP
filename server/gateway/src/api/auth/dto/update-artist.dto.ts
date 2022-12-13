import { IsOptional, IsString } from 'class-validator';

export default class UpdateArtistDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  profileUrl: string;
}
