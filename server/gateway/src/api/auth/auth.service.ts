import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../../common/constants/microservices';
import LoginDto from './dto/login.dto';
import UpdateUserDto from './dto/update-user.dto';

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
    return this.authClient.send({ cmd: 'getUserInfo' }, userId);
  }

  public updateUserInfo(userId: number, updateUserDto: UpdateUserDto) {
    return this.authClient.send(
      { cmd: 'updateUserInfo' },
      { userId, ...updateUserDto },
    );
  }

  public createArtist(createArtistDto) {
    return this.authClient.send({ cmd: 'createArtist' }, createArtistDto);
  }

  public updateArtist(updateArtistDto) {
    return this.authClient.send({ cmd: 'updateArtist' }, updateArtistDto);
  }

  public getAllArtist(userId: number) {
    return this.authClient.send({ cmd: 'getAllArtist' }, userId);
  }

  public getAllSubscriber(artistId: number) {
    return this.authClient.send({ cmd: 'getAllSubscriber' }, artistId);
  }

  public getFavoriteArtist(userId: number) {
    return this.authClient.send({ cmd: 'getFavoriteArtist' }, userId);
  }

  public createFavorite(createFavoriteDto) {
    return this.authClient.send({ cmd: 'createFavorite' }, createFavoriteDto);
  }

  public deleteFavorite(deleteFavoriteDto) {
    return this.authClient.send({ cmd: 'deleteFavorite' }, deleteFavoriteDto);
  }
}
