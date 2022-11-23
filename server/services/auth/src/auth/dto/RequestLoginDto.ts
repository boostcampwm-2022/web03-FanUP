import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RequestLoginDto {
  @IsNotEmpty()
  @IsString()
  public provider: string;

  @IsNotEmpty()
  @IsString()
  public providerId: string;

  @IsOptional()
  public nickname: string;

  @IsOptional()
  public email: string;
}
