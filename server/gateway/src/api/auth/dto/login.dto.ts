import { IsString } from 'class-validator';

export default class LoginDto {
  @IsString()
  provider: string;

  @IsString()
  accessToken: string;
}
