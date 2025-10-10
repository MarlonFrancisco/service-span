import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  stripe: Stripe;

  constructor(private configService: ConfigService) {
    const stripeKey = this.configService.get('STRIPE_API_KEY');

    if (!stripeKey) {
      throw new Error('STRIPE_API_KEY not configured');
    }

    this.stripe = new Stripe(stripeKey);
  }

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

  async getPlans() {
    const plans = await this.stripe.plans.list();

    return plans;
  }
}
