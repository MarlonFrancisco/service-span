import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { OptionalAuth } from '../auth/decorators/optional-auth.decorator';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  @OptionalAuth()
  async getPlans(@CurrentUser('paymentCustomerId') paymentCustomerId?: string) {
    return this.plansService.findAll(paymentCustomerId);
  }
}
