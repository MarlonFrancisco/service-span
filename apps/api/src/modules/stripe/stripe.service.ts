import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService extends Stripe {
  constructor(private readonly configService: ConfigService) {
    const stripeKey = configService.get<string>('STRIPE_API_KEY');

    if (!stripeKey) {
      throw new Error('STRIPE_API_KEY not configured');
    }

    super(stripeKey);
  }
}
