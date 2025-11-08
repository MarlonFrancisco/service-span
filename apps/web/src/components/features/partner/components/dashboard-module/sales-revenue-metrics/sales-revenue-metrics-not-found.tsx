'use client';

import { DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MetricsNotFound } from '../components/metrics-not-found';

export function SalesRevenueMetricsNotFound() {
  const router = useRouter();

  return (
    <MetricsNotFound
      title="Nenhuma métrica de vendas"
      description="Ainda não há dados de receita para exibir. Registre agendamentos para acompanhar performance, ticket médio, taxa de conversão e metas."
      actionLabel="Ir para Agendamentos"
      onAction={() => router.push('/partner/agenda')}
      icon={DollarSign}
    />
  );
}
