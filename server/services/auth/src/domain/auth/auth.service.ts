import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { firstValueFrom, map } from 'rxjs';
import { CustomRpcException } from '../../common/exception/custom-rpc-exception';

import { UserService } from 'src/domain/user/user.service';
import RequestLoginDto from './dto/request-login.dto';
import { JwtService } from './jwt.service';

interface UserInfo {
  providerId: string;
  provider: string;
  nickname: string;
  email: string | null;
  profileUrl: string | null;
}
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  profile: User;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public getAuthHello(): string {
    return 'Auth server is running!';
  }

  public async getUserInfo(userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }

  public async verifyUser(token: string) {
    const payload: any = await this.jwtService.verify(token);
    console.log(payload);
    return await this.userService.findOne(payload.id);
  }

  public async login(loginDto: RequestLoginDto): Promise<LoginResponse> {
    const { provider, accessToken } = loginDto;

    // get user info from provider
    let userInfo: UserInfo;
    try {
      if (provider === 'google') {
        userInfo = await this.getGoogleProfile(accessToken);
      } else if (provider === 'kakao') {
        userInfo = await this.getKakaoProfile(accessToken);
      } else throw new Error();
    } catch (err) {
      throw new CustomRpcException(
        err.message ? 'Invalid AccessToken' : 'Invalid Provider',
        HttpStatus.BAD_REQUEST,
      );
    }

    // check if user exists
    let user = await this.userService.findOneByProviderInfo(
      userInfo.provider,
      userInfo.providerId,
    );
    if (!user) {
      user = await this.userService.create(userInfo);
    } else {
      user = await this.userService.updateProfileUrl(
        user.id,
        userInfo.profileUrl,
      );
    }

    return {
      accessToken: this.jwtService.generateToken(user),
      refreshToken: this.jwtService.generateRefreshToken(user),
      profile: user,
    };
  }

  private async getGoogleProfile(accessToken: string): Promise<UserInfo> {
    const { sub, name, email, picture } = await firstValueFrom(
      this.httpService
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(map(async (response) => response.data)),
    );

    return {
      providerId: sub,
      provider: 'google',
      nickname: name,
      email,
      profileUrl: picture,
    };
  }

  private async getKakaoProfile(accessToken: string): Promise<UserInfo> {
    const { id, properties, kakao_account } = await firstValueFrom(
      this.httpService
        .get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(map(async (response) => response.data)),
    );
    return {
      providerId: String(id),
      provider: 'kakao',
      nickname: properties.nickname,
      email: kakao_account.email,
      profileUrl: properties.profile_image,
    };
  }
}
