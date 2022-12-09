import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class ReqeustCreateUserDto {
  @IsNotEmpty()
  @IsString()
  public provider: string;

  @IsNotEmpty()
  @IsString()
  public providerId: string;

  @IsOptional()
  public nickname: string | null;

  @IsOptional()
  public email: string | null;
}
