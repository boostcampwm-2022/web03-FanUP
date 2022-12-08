import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from 'src/auth/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // jwt 보증을 passport 모듈에 위임. 만료된 JWT인경우 request거부, 401 response
      secretOrKey: '1234', // TODO: env 처리
    });
  }

  private validate(token: string): Promise<User | never> {
    return this.jwtService.validateUser(token);
  }
}
