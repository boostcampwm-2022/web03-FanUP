import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';

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
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  getHello(): string {
    return 'Auth server is running!';
  }

  async getRefreshToken(userId: number): Promise<string> {
    return this.jwtService.sign(
      { userId },
      { secret: '1234refresh', expiresIn: '1w' }, // TODO: env 처리
    );
  }

  async getAccessToken(userId: number): Promise<string> {
    return this.jwtService.sign({ userId });
  }

  async googleLogin(accessCode: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
          params: {
            id_token: accessCode,
          },
        })
        .pipe(
          map(async (response) => {
            return response.data;
          }),
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw error;
          }),
        ),
    );
    console.log(data);

    return data;

    // let user = null;
    // try {
    //   user = await this.userService.findOneByEmail(email);
    // } catch (e) {
    //   user = await this.userService.create({
    //     email,
    //     name,
    //   });
    // }

    // return {
    //   token: await this.getToken(user.id),
    //   refreshToken: await this.getRefreshToken(user.id),
    //   profile: { email, name, hd, picture },
    // };
  }
}
