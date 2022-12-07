import { IsString } from 'class-validator';

class LoginDto {
  @IsString()
  provider: string;

  @IsString()
  accessToken: string;
}

export default LoginDto;
