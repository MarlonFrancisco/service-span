import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-session')
  async createPayment(
    @Body({ transform: (value) => value.priceId }) priceId: string,
  ) {
    return this.paymentService.createPayment(priceId);
  }

  @Get('plans')
  async getPlans() {
    return this.paymentService.getPlans();
  }
}
