import type Stripe from 'stripe';
import { normalizeSubscriptionMetadata } from '../../../utils';

export class InvoiceDto {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed' | 'uncollectible' | 'open' | 'draft';
  invoiceNumber: string;
  pdfUrl: string | null;

  constructor(invoice: Stripe.Invoice) {
    this.id = invoice.id;
    this.date = new Date(invoice.created * 1000);
    // Use amount_paid se pago, caso contrário use total
    this.amount =
      (invoice.status === 'paid' ? invoice.amount_paid : invoice.total) / 100;
    this.status = invoice.status as any;
    this.invoiceNumber = invoice.number || '';
    this.pdfUrl = invoice.invoice_pdf;
  }
}

export class CurrentPlanDto {
  planId: string;
  planName: string;
  planDescription: string;
  price: number;
  billingPeriod: 'month' | 'year';
  marketingFeatures: string[];
  features: {
    PRO_LIMIT: number;
    RANK_TIER: 'TIER_1' | 'TIER_2' | 'TIER_3';
    SCHEDULE_LIMIT: number;
    SMS_REMINDER: boolean;
    UNIT_LIMIT: number;
    WHATSAPP_INTEGRATION: boolean;
    DASHBOARD_GENERAL_ACCESS: boolean;
    DASHBOARD_SALES_ACCESS: boolean;
    DASHBOARD_OPERATIONAL_ACCESS: boolean;
    DASHBOARD_CUSTOMERS_ACCESS: boolean;
  };
  subscriptionStatus: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  nextBillingDate: Date;
  invoices: InvoiceDto[];
  isActive: boolean;

  maxStores: number;
  maxUsers: number;
  rankTier: string;
  smsReminder: boolean;

  schedulesLength: number;
  storesLength: number;
  storeMembersLength: number;

  constructor(data: {
    product: Stripe.Product;
    price: Stripe.Price;
    subscription: Stripe.Subscription & {
      current_period_start?: number;
      current_period_end?: number;
    };
    invoices: Stripe.Invoice[];
    schedulesLength: number;
    storesLength: number;
    storeMembersLength: number;
    nextBillingDate: Date;
  }) {
    const {
      product,
      price,
      subscription,
      invoices,
      schedulesLength,
      storesLength,
      storeMembersLength,
      nextBillingDate,
    } = data;

    this.planId = product.id;
    this.planName = product.name;
    this.planDescription = product.description || '';
    this.price = (price.unit_amount || 0) / 100; // Converter de centavos para reais
    // Validar que interval é month ou year (pode ser week ou day)
    const interval = price.recurring?.interval || 'month';
    this.billingPeriod = (interval === 'year' ? 'year' : 'month') as
      | 'month'
      | 'year';
    // Extrair features registrados no Stripe (marketing_features)
    this.marketingFeatures = Array.isArray(product.marketing_features)
      ? product.marketing_features.map((f) => f.name || '')
      : [];
    this.features = normalizeSubscriptionMetadata(product.metadata);
    this.subscriptionStatus = subscription.status;
    this.currentPeriodStart = new Date(
      subscription.current_period_start * 1000,
    );
    this.currentPeriodEnd = new Date(subscription.current_period_end * 1000);
    this.cancelAtPeriodEnd = subscription.cancel_at_period_end;
    this.nextBillingDate = nextBillingDate;
    this.isActive = subscription.status === 'active';
    this.invoices = invoices.map((invoice) => new InvoiceDto(invoice));

    this.maxStores =
      product.metadata.UNIT_LIMIT === 'UNLIMITED'
        ? 0
        : parseInt(product.metadata.UNIT_LIMIT);
    this.maxUsers =
      product.metadata.PRO_LIMIT === 'UNLIMITED'
        ? 0
        : parseInt(product.metadata.PRO_LIMIT);

    this.rankTier = product.metadata.RANK_TIER;

    this.smsReminder = product.metadata.SMS_REMINDER === 'true';

    this.schedulesLength = schedulesLength;
    this.storesLength = storesLength;
    this.storeMembersLength = storeMembersLength;
  }
}
