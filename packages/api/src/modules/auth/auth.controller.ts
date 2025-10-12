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
import { Request, Response } from 'express';
import { getAccessTokenFromCookie } from '../../utils/helpers/auth.helpers';
import { AuthService } from './auth.service';
import { LoginFirstStepDto } from './dto/login-first-step.dto';
import { RegisterDto } from './dto/register.dto';
import { ValidationCodeDto } from './dto/validation-code.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias em milissegundos
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
}
