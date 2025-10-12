import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getAccessTokenFromCookie } from '../../../utils/helpers/auth.helpers';
import { JwtPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => getAccessTokenFromCookie(req.headers.cookie),
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secret-key',
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const contact = payload.email || payload.telephone;

    if (!payload.sub || !contact) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return payload;
  }
}
