import { IsNotEmpty, IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;
}
