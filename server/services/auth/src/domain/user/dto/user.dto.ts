import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
  constructor(user) {
    this.provider = user.provider;
    this.providerId = user.providerId;
    this.email = user.email;
    this.nickname = user.nickname;
  }
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
