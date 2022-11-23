import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(readonly config: ConfigService) {
    super({
      clientID: config.get('KAKAO_CLIENT_ID'),
      callbackURL: config.get('KAKAO_CALLBACK_URL'),
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { provider, id, displayName, _json } = profile;
    console.log(profile);
    return {
      provider: provider,
      providerId: id,
      name: displayName,
      email: _json.kakao_account.email,
    };
  }
}
