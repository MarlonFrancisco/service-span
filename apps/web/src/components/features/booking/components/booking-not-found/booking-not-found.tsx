'use client';

import { NotFound } from '@/components/ui/not-found';
import { Store } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BookingNotFound() {
  const router = useRouter();

  return (
    <NotFound
      icon={Store}
      title="Estabelecimento não encontrado"
      description="O estabelecimento que você está procurando não existe ou foi removido. Verifique o link ou explore outros estabelecimentos disponíveis."
      actionLabel="Explorar estabelecimentos"
      onAction={() => router.push('/')}
    />
  );
}
