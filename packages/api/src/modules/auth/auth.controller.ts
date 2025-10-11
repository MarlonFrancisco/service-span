import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginFirstStepDto } from './dto/login-first-step.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-session')
  async login(@Body() body: LoginFirstStepDto) {
    return null;
  }
}
