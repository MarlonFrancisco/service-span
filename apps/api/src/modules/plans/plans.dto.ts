import Stripe from 'stripe';

export class PlanDto {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  popular: boolean;
  features: string[];

  constructor(plan: Stripe.Product, price: number) {
    this.id = plan.id;
    this.name = plan.name;
    this.description = plan.description;
    this.priceMonthly = price;
    this.popular = plan.metadata.IS_RECOMMENDED === 'true';
    this.features = plan.marketing_features.map((feature) => feature.name);
  }
}
