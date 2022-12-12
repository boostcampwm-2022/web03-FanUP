import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import UpdateUserDto from './dto/request-update-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'updateUserInfo' })
  updateUserInfo(@Payload() updateUserDto: UpdateUserDto) {
    console.log('hihi');
    return this.userService.updateNickname(updateUserDto);
  }
}
