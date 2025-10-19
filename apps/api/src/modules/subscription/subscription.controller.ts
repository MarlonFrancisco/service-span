import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import type { JwtPayload } from '../auth/auth.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubscriptionService } from './subscription.service';
import type { IWebhookPayload } from './subscription.types';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body({ transform: (value) => value.priceId }) priceId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.subscriptionService.create(
      priceId,
      user.sub,
      user.paymentCustomerId,
    );
  }

  @Post('webhook')
  async webhook(@Body() body: IWebhookPayload) {
    return this.subscriptionService.webhook(body);
  }
}
