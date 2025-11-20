import type Stripe from 'stripe';

export class PlanDto {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  popular: boolean;
  features: string[];
  interval: 'month' | 'year';
  discount: number;
  trialPeriodDays: number;

  constructor(
    plan: Stripe.Product,
    price: Stripe.Price,
    subscriptions: Stripe.Subscription[],
  ) {
    const hasSubscription = subscriptions.length > 0;

    this.id = plan.id;
    this.priceId = price.id;
    this.name = plan.name;
    this.description = plan.description;
    this.price = price.unit_amount;
    this.popular = plan.metadata.IS_RECOMMENDED === 'true';
    this.features = plan.marketing_features.map((feature) => feature.name);
    this.interval = price.recurring?.interval as 'month' | 'year';
    this.discount = parseInt(price.metadata.discount || '0');
    this.trialPeriodDays = hasSubscription
      ? 0
      : parseInt(plan.metadata.TRIAL_PERIOD_DAYS || '0');
  }
}
