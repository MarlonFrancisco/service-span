'use client';

import { useCallback, useMemo } from 'react';
import type { TInvoiceStatus } from './payment-history-card.types';

export const usePaymentHistoryCard = () => {
  const getStatusBadge = useCallback((status: TInvoiceStatus) => {
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
  }, []);

  const downloadPDF = useCallback((pdfUrl: string, invoiceNumber: string) => {
    if (!pdfUrl) return;

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `fatura-${invoiceNumber}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const formatDate = useCallback((date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }, []);

  return useMemo(
    () => ({
      getStatusBadge,
      downloadPDF,
      formatDate,
    }),
    [getStatusBadge, downloadPDF, formatDate],
  );
};
