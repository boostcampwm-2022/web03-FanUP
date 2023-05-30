import { IsNumber, IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsNumber()
  userId: number;

  @IsString()
  nickname: string;
}
