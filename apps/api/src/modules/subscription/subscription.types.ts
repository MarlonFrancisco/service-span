export interface IWebhookPayload {
  type:
    | 'invoice.payment_succeeded'
    | 'invoice.payment_failed'
    | 'customer.subscription.deleted'
    | 'customer.subscription.updated'
    | 'customer.subscription.created';
  id: string;
  object: string;
  created: number;
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string | null;
    idempotency_key: string | null;
  } | null;
  data:
    | ICustomerSubscriptionCreatedEvent
    | ICustomerSubscriptionUpdatedEvent
    | ICustomerSubscriptionDeletedEvent;
}

export type TSubscriptionStatus =
  | 'incomplete'
  | 'incomplete_expired'
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'paused'
  | 'draft'
  | 'open'
  | 'paid';

interface ICustomerSubscriptionObject {
  id: string; // ex: "sub_1234"
  object: 'subscription';
  application: string | null;
  application_fee_percent: number | null;
  automatic_tax: {
    enabled: boolean;
  };
  billing_cycle_anchor: number;
  billing_thresholds: null | object;
  cancel_at: number | null;
  cancel_at_period_end: boolean;
  canceled_at: number | null;
  collection_method: 'charge_automatically' | 'send_invoice';
  created: number;
  current_period_end: number;
  current_period_start: number;
  customer: string; // ex: "cus_1234"
  days_until_due: number | null;
  default_payment_method: string | null;
  default_source: string | null;
  default_tax_rates: any[];
  description: string | null;
  discount: null | object;
  ended_at: number | null;
  items: {
    object: 'list';
    data: Array<{
      id: string; // ex: "si_1234"
      object: 'subscription_item';
      billing_thresholds: null | object;
      created: number;
      metadata: Record<string, string>;
      price: {
        id: string; // ex: "price_1234"
        object: 'price';
        active: boolean;
        currency: string;
        product: string; // ex: "prod_1234"
        unit_amount: number;
        // ...outros campos de price
      };
      quantity: number;
      subscription: string;
      tax_rates: any[];
      current_period_start: number;
      current_period_end: number;
    }>;
    has_more: boolean;
    total_count: number;
    url: string;
  };
  latest_invoice: string; // ex: "in_1234"
  livemode: boolean;
  metadata: Record<string, string>;
  next_pending_invoice_item_invoice: number | null;
  pause_collection: null | object;
  pending_invoice_item_interval: null | object;
  pending_setup_intent: null | string;
  pending_update: null | object;
  schedule: null | string;
  start_date: number;
  status: TSubscriptionStatus;
  trial_end: number | null;
  trial_start: number | null;
}

export interface ICustomerSubscriptionCreatedEvent {
  object: ICustomerSubscriptionObject;
}

export interface ICustomerSubscriptionUpdatedEvent {
  object: ICustomerSubscriptionObject;
  previous_attributes: {
    id: string;
    // Contém apenas os atributos que mudaram
    // Por exemplo, em caso de upgrade/downgrade:
    items?: {
      data: [
        {
          price: {
            id: string;
            product: string;
          };
        },
      ];
    };
    // ou em caso de mudança de status:
    status?: TSubscriptionStatus;
  };
}

export interface ICustomerSubscriptionDeletedEvent {
  object: ICustomerSubscriptionObject & {
    canceled_at: number;
    status: TSubscriptionStatus;
  };
}
