export type TInvoiceStatus =
  | 'paid'
  | 'pending'
  | 'failed'
  | 'uncollectible'
  | 'open'
  | 'draft';

export type TPaymentHistoryItem = {
  id: string;
  invoiceNumber: string;
  date: Date;
  amount: number;
  status: TInvoiceStatus;
  pdfUrl: string;
};

export type TPaymentHistoryCardConfig = {
  paymentHistory: TPaymentHistoryItem[];
  delay?: number;
};
