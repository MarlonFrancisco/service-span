'use client';

import { Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MetricsNotFound } from '../shared/metrics-not-found';

export function OperationalMetricsNotFound() {
  const router = useRouter();

  return (
    <MetricsNotFound
      title="Nenhuma métrica operacional"
      description="Ainda não há dados operacionais para exibir. Registre agendamentos para acompanhar performance, eficiência e ocupação."
      actionLabel="Ir para Agendamentos"
      onAction={() => router.push('/partner/agenda')}
      icon={Zap}
    />
  );
}
