import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  profile: {
    email: string;
    name: string;
    hd: string;
    picture: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  getAuthHello(): string {
    return 'Auth server is running!';
  }

  async getAccessToken(userId: number): Promise<string> {
    return this.jwtService.sign({ userId });
  }

  async getRefreshToken(userId: number): Promise<string> {
    return this.jwtService.sign(
      { userId },
      { secret: '1234refresh', expiresIn: '1w' }, // TODO: env 처리
    );
  }

  async login(req: Request, res: Response): Promise<any> {
    const loginUser = new UserDto(req.user);

    let user = null;
    try {
      user = await this.userService.findOneByProviderInfo(
        loginUser.provider,
        loginUser.providerId,
      );
    } catch (e) {
      user = await this.userService.create(loginUser);
    }

    res.cookie('accessToken', await this.getAccessToken(user.id));
    res.cookie('refreshToken', await this.getRefreshToken(user.id));
    res.redirect(this.configService.get('DOMAIN_URL'));
  }
}
