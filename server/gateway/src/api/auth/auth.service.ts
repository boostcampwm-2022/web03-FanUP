import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../../common/constants/microservices';
import LoginDto from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MICRO_SERVICES.AUTH.NAME)
    private readonly authClient: ClientProxy, // todo: ClientProxy, TCP 차이 알아보기
  ) {}

  public getAuthHello() {
    return this.authClient.send({ cmd: 'getAuthHello' }, {});
  }

  public login(loginDto: LoginDto) {
    return this.authClient.send({ cmd: 'login' }, loginDto);
  }

  public getUserInfo(userId: number) {
    console.log('getUserInfo', userId);
    return this.authClient.send({ cmd: 'getUserInfo' }, userId);
  }

  public createArtist(createArtistDto) {
    console.log('createArtist', createArtistDto);
    return this.authClient.send({ cmd: 'createArtist' }, createArtistDto);
  }
}
