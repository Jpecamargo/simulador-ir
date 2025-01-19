import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '1717a0da780dab849d7e14d02812bc48dea10c0bf944b78ae2b5904dc978c73b',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}