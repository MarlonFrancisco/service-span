import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe';

@Injectable()
export class PaymentService {
  constructor(private readonly stripe: StripeService) {}

  async createPayment(priceId: string) {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3001?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3001',
    });

    return {
      url: session.url,
    };
  }
}
