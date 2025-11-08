'use client';

import { Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MetricsNotFound } from '../components/metrics-not-found';

export function GeneralMetricsNotFound() {
  const router = useRouter();

  return (
    <MetricsNotFound
      title="Nenhuma métrica disponível"
      description="Ainda não há dados de métricas para exibir. Registre suas lojas para ver suas estatísticas aqui."
      actionLabel="Ir para Lojas"
      onAction={() => router.push('/partner/stores')}
      icon={Activity}
    />
  );
}
