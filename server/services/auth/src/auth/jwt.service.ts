import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: Jwt,
  ) {}

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID from decode()
  public async validateUser(decoded: any): Promise<User> {
    return this.userService.findOne(decoded.id);
  }

  // Generate JWT Token
  public generateToken(user: User): string {
    return this.jwt.sign({ id: user.id, artistId: user.artistId });
  }

  public generateRefreshToken(user: User): string {
    return this.jwt.sign(
      { id: user.id },
      { secret: '1234refresh', expiresIn: '1w' }, // TODO: env 처리
    );
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async verify(token: string): Promise<any> {
    try {
      return this.jwt.verify(token);
    } catch (err) {
      return null;
    }
  }
}
