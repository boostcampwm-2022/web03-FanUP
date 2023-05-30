import { IsString } from 'class-validator';

class RequestLoginDto {
  @IsString()
  provider: string;

  @IsString()
  accessToken: string;
}

export default RequestLoginDto;
