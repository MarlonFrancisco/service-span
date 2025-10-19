import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe';
import { PlanDto } from './plans.dto';

@Injectable()
export class PlansService {
  constructor(private readonly stripe: StripeService) {}

  async findAll() {
    const responseProducts = await this.stripe.products.list({
      active: true,
    });
    const responsePrices = await this.stripe.prices.list({ active: true });

    const plans = responseProducts.data
      .sort((a, b) => {
        const aOrder = parseInt(a.metadata.DISPLAY_ORDER);
        const bOrder = parseInt(b.metadata.DISPLAY_ORDER);
        return aOrder - bOrder;
      })
      .map((product) => {
        const price = responsePrices.data.find(
          (price) => price.product === product.id,
        );
        return new PlanDto(product, price);
      });

    return plans;
  }
}
