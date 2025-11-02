export interface IPlan {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  popular: boolean;
  features: string[];
}

export interface IInvoice {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed' | 'uncollectible' | 'open' | 'draft';
  invoiceNumber: string;
  pdfUrl: string;
}

export interface IMySubscription {
  planId: string;
  planName: string;
  planDescription: string;
  price: number;
  billingPeriod: 'month' | 'year';
  features: string[];
  subscriptionStatus: 'active' | 'inactive';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  nextBillingDate: Date;
  invoices: IInvoice[];
  isActive: boolean;
  marketingFeatures: string[];
  schedulesLength: number;
  storesLength: number;
  storeMembersLength: number;
  maxStores: number;
  maxUsers: number;
  maxSchedules: number;
  rankTier: string;
  smsReminder: boolean;
}

export type IPlansResponse = IPlan[];
