import { Controller, Get, Query } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { OptionalAuth } from '../auth/decorators/optional-auth.decorator';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  /**
   * Get available subscription plans
   * @param paymentCustomerId - Stripe customer ID (from auth token)
   * @param currency - Filter by currency (ISO 4217 code, defaults to BRL)
   * @returns Plans grouped by interval with currency information
   */
  @Get()
  @OptionalAuth()
  async getPlans(
    @CurrentUser('paymentCustomerId') paymentCustomerId?: string,
    @Query('currency') currency?: string,
  ) {
    return this.plansService.findAll(paymentCustomerId, currency);
  }
}
