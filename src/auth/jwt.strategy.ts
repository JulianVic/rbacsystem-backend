import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://myinstance1-crzbwj.us1.zitadel.cloud/oauth/v2/keys',
      }),
      issuer: 'https://myinstance1-crzbwj.us1.zitadel.cloud',
      algorithms: ['RS256'],
      audience: '300384420517489408'
    });
  }

  async validate(payload: any) {
    console.log('Validating payload:', payload);
    if (!payload.sub) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}