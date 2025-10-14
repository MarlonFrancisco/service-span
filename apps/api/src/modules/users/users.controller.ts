import { Controller, Get, UseGuards } from '@nestjs/common';
import type { JwtPayload } from '../auth/auth.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: JwtPayload) {
    return await this.usersService.findById(user.sub, [
      'email',
      'firstName',
      'lastName',
      'telephone',
      'createdAt',
    ]);
  }
}
