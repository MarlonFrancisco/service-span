import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { getAccessTokenFromCookie } from '../../utils';
import { AuthService } from './auth.service';
import { LoginFirstStepDto } from './dto/login-first-step.dto';
import { RegisterDto } from './dto/register.dto';
import { ValidationCodeDto } from './dto/validation-code.dto';
import { GoogleSSOService } from './google-sso.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleSSOService: GoogleSSOService,
  ) {}

  @Post('code')
  async createOtpCode(@Body() body: LoginFirstStepDto) {
    return this.authService.createOtpCode(body);
  }

  @HttpCode(201)
  @Post('validate-code')
  async login(
    @Body() body: ValidationCodeDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const tokens = await this.authService.validateCode(body);

      res.cookie('access_token', tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: tokens.expires_in * 1000, // converte para milissegundos
        path: '/',
      });
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  @HttpCode(201)
  @Post('register')
  @UseGuards(JwtAuthGuard)
  async register(@Body() body: RegisterDto, @Req() req: Request) {
    await this.authService.register(
      body,
      getAccessTokenFromCookie(req.headers.cookie),
    );
  }

  @Post('social/google')
  async googleLogin(
    @Body() body: { token: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokens, isNewUser } = await this.googleSSOService.login(body.token);

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: tokens.expires_in * 1000,
    });

    return { isNewUser };
  }
}
