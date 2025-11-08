'use client';

import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MetricsNotFound } from '../components/metrics-not-found';

export function CustomerMetricsNotFound() {
  const router = useRouter();

  return (
    <MetricsNotFound
      title="Nenhuma métrica de clientes"
      description="Ainda não há dados sobre seus clientes. Registre agendamentos para acompanhar métricas de retenção, lifetime value e comportamento."
      actionLabel="Ir para Clientes"
      onAction={() => router.push('/partner/agenda')}
      icon={Users}
    />
  );
}
