import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';

interface JwtPayload {
  id: number;
  artistId: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // TODO: 나중 ㅋㅋ
    });
  }

  async validate({ id }: JwtPayload) {
    const user = await firstValueFrom(this.authService.getUserInfo(id));
    console.log(user);
    return { id: user.id, artistId: user.artistId };
  }
}
