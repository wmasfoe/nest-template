import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, JwtUser } from '../types/auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('config.jwt.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtUser> {
    // payload包含JWT中的用户信息
    return {
      userId: payload.sub,
      name: payload.name,
      email: payload.email,
    };
  }
}
