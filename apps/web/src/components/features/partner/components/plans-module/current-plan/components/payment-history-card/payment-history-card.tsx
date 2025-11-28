'use client';

import { useSubscriptionQuery } from '@/hooks/use-query/use-subscription-query';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { Calendar, Download, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { usePaymentHistoryCard } from './payment-history-card.hook';

interface PaymentHistoryCardProps {
  delay?: number;
}

export function PaymentHistoryCard({ delay = 0.2 }: PaymentHistoryCardProps) {
  const { currentPlan } = useSubscriptionQuery();
  const { downloadPDF, getStatusBadge, formatDate } = usePaymentHistoryCard();

  const paymentHistory = currentPlan?.invoices || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Histórico de Pagamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentHistory.map((payment) => {
              const statusConfig = getStatusBadge(payment.status);
              return (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg border border-gray-200">
                      <Calendar className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        {payment.invoiceNumber}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatDate(payment.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-900">R$ {payment.amount}</span>
                    <Badge variant="outline" className={statusConfig.className}>
                      {statusConfig.label}
                    </Badge>
                    <button
                      onClick={() =>
                        downloadPDF(payment.pdfUrl, payment.invoiceNumber)
                      }
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Baixar PDF da fatura"
                    >
                      <Download className="h-4 w-4 text-gray-600 hover:text-gray-900" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
