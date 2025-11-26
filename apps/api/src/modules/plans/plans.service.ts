import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe';
import { PlanDto } from './plans.dto';

@Injectable()
export class PlansService {
  constructor(private readonly stripe: StripeService) {}

  async findAll(paymentCustomerId?: string) {
    const subscriptions = await this.stripe.subscriptions.list({
      customer: paymentCustomerId,
      limit: 1,
    });

    const responseProducts = await this.stripe.products.list({
      active: true,
    });
    const responsePrices = await this.stripe.prices.list({ active: true });

    const plans = responsePrices.data
      .map((price) => {
        const product = responseProducts.data.find(
          (product) => product.id === price.product,
        );

        if (!product) return undefined;

        return { product, price };
      })
      .filter((item) => item)
      .sort((a, b) => {
        const aOrder = parseInt(a.product.metadata.DISPLAY_ORDER || '0');
        const bOrder = parseInt(b.product.metadata.DISPLAY_ORDER || '0');
        return aOrder - bOrder;
      })
      .map(
        ({ product, price }) => PlanDto.fromStripe(product, price, subscriptions.data),
      );

    return plans.reduce(
      (acc, plan) => {
        acc[plan.interval].push(plan);

        return acc;
      },
      { month: [], year: [] },
    );
  }
}
