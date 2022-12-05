import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom, map } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import RequestLoginDto from './dto/request-login.dto';

interface UserInfo {
  providerId: string;
  provider: string;
  nickname: string;
  email: string | null;
  // picture: string | null;
}
export interface LoginResponse {
  status: number;
  error: string[] | null;
  data: any;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
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

  async validate(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (e) {
      return null;
    }
  }

  async login(loginDto: RequestLoginDto): Promise<LoginResponse> {
    const { provider, accessToken } = loginDto;

    // get user info from provider
    let userInfo: UserInfo;
    if (provider === 'google') {
      userInfo = await this.getGoogleProfile(accessToken);
    } else if (provider === 'kakao') {
      userInfo = await this.getKakaoProfile(accessToken);
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: ['Invalid provider'],
        data: null,
      };
    }

    // check if user exists
    let user = await this.userService.findOneByProviderInfo(
      userInfo.provider,
      userInfo.providerId,
    );
    if (!user) {
      user = await this.userService.create(userInfo);
    }

    return {
      status: HttpStatus.OK,
      error: null,
      data: {
        accessToken: await this.getAccessToken(user.id),
        refreshToken: await this.getRefreshToken(user.id),
        profile: user,
      },
    };
  }

  async getGoogleProfile(accessToken: string): Promise<UserInfo> {
    const { sub, name, email, picture } = await firstValueFrom(
      this.httpService
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          map(async (response) => {
            return response.data;
          }),
        ),
    );
    return {
      providerId: sub,
      provider: 'google',
      nickname: name,
      email,
      // picture,
    };
  }

  async getKakaoProfile(accessToken: string): Promise<UserInfo> {
    const { id, properties, kakao_account } = await firstValueFrom(
      this.httpService
        .get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          map(async (response) => {
            return response.data;
          }),
        ),
    );
    return {
      providerId: String(id),
      provider: 'kakao',
      nickname: properties.nickname,
      email: kakao_account.email,
      // picture: properties.profile_image,
    };
  }
}
