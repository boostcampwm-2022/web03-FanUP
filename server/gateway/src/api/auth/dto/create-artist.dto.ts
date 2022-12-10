import { IsOptional, IsString } from 'class-validator';

export default class CreateArtistDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  profileUrl: string;
}
