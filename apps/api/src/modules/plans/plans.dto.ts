import type Stripe from 'stripe';

export class PlanDto {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  popular: boolean;
  features: string[];

  constructor(plan: Stripe.Product, price: Stripe.Price) {
    this.id = plan.id;
    this.priceId = price.id;
    this.name = plan.name;
    this.description = plan.description;
    this.price = price.unit_amount;
    this.popular = plan.metadata.IS_RECOMMENDED === 'true';
    this.features = plan.marketing_features.map((feature) => feature.name);
  }
}
