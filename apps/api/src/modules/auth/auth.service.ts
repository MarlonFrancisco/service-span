import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateAuthCode } from '@repo/api';
import { SMSService } from '../sms';
import { UsersService } from '../users';
import { LoginFirstStepDto } from './dto/login-first-step.dto';
import { RegisterDto } from './dto/register.dto';
import { ValidationCodeDto } from './dto/validation-code.dto';

export interface JwtPayload {
  sub: string;
  email: string;
  [key: string]: any;
}

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly smsService: SMSService,
  ) {}

  async generateAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });
  }

  async generateRefreshToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
  }

  async generateTokens(payload: JwtPayload): Promise<TokenResponse> {
    const [access_token, refresh_token] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      access_token,
      refresh_token,
      expires_in: 24 * 60 * 60, // 1 dia em segundos (igual ao token)
    };
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token);
  }

  async createOtpCode(body: LoginFirstStepDto) {
    const user = await this.userService.findByOne({
      email: body.email,
      telephone: body.telephone,
    });
    const authCode = generateAuthCode();
    let isNewUser = user?.email && user?.telephone ? false : true;

    if (!user) {
      await this.userService.create({
        ...body,
        authCode: authCode.code,
        authCodeExpiresAt: authCode.expiresIn,
      });
      isNewUser = true;
    } else {
      await this.userService.update(user.id, {
        authCode: authCode.code,
        authCodeExpiresAt: authCode.expiresIn,
      });
    }

    if (body.telephone) {
      await this.smsService.sendOTP(body.telephone, authCode.code);
    }

    if (body.email) {
      //await this.smsService.sendOTP(body.email, authCode.code);
    }

    return { isNewUser };
  }

  async validateCode(body: ValidationCodeDto) {
    const user = await this.userService.findByOne({
      email: body.email,
      telephone: body.telephone,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.authCode !== body.code) {
      throw new UnauthorizedException('Invalid code');
    }

    if (user.authCodeExpiresAt < new Date()) {
      throw new UnauthorizedException('Code expired');
    }

    const tokens = await this.generateTokens({
      sub: user.id,
      email: user.email,
      telephone: user.telephone,
    });

    return tokens;
  }

  async register(body: RegisterDto, token: string) {
    const tokenPayload = await this.verifyToken(token);
    await this.userService.update(tokenPayload.sub, body);
  }
}
