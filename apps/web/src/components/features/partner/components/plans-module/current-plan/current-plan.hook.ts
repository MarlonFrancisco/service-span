'use client';

import { useSubscriptionQuery } from '@/hooks/use-query/use-subscription-query';
import { IInvoice } from '@/types/api/payment.types';

export function useCurrentPlan() {
  const { currentPlan, isGettingCurrentPlan } = useSubscriptionQuery();

  const getStatusBadge = (status: IInvoice['status']) => {
    const config = {
      paid: {
        label: 'Pago',
        className: 'bg-green-50 text-green-700 border-green-200',
      },
      pending: {
        label: 'Pendente',
        className: 'bg-orange-50 text-orange-700 border-orange-200',
      },
      failed: {
        label: 'Falhou',
        className: 'bg-red-50 text-red-700 border-red-200',
      },
      uncollectible: {
        label: 'Não coletável',
        className: 'bg-gray-50 text-gray-700 border-gray-200',
      },
      open: {
        label: 'Aberto',
        className: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      },
      draft: {
        label: 'Rascunho',
        className: 'bg-gray-50 text-gray-700 border-gray-200',
      },
    };
    return config[status];
  };

  const calculatePercentage = (current: number, max: number) => {
    if (max === 0) return 0;
    return Math.min((current / max) * 100, 100);
  };

  const isUnlimited = (max: number) => max === 0;

  const usagePercentage = calculatePercentage(
    currentPlan?.schedulesLength || 0,
    currentPlan?.maxSchedules || 0,
  );

  const storesUsagePercentage = calculatePercentage(
    currentPlan?.storesLength || 0,
    currentPlan?.maxStores || 0,
  );

  const usersUsagePercentage = calculatePercentage(
    currentPlan?.storeMembersLength || 0,
    currentPlan?.maxUsers || 0,
  );

  const downloadPDF = (pdfUrl: string, invoiceNumber: string) => {
    if (!pdfUrl) return;

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `fatura-${invoiceNumber}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    currentPlan,
    paymentHistory: currentPlan?.invoices || [],
    usagePercentage,
    storesUsagePercentage,
    usersUsagePercentage,
    isUnlimited,
    getStatusBadge,
    downloadPDF,
  };
}
