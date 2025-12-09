'use client';

import { Skeleton } from '@repo/ui';

function StoreCardSkeleton() {
  return (
    <div className="space-y-3">
      {/* Imagem quadrada - Estilo Airbnb */}
      <Skeleton className="aspect-square w-full rounded-xl" />

      {/* Conteúdo */}
      <div className="space-y-2">
        {/* Título e Rating */}
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Localização */}
        <Skeleton className="h-4 w-1/2" />

        {/* Serviços */}
        <Skeleton className="h-4 w-2/3" />

        {/* Preço */}
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
}

export function ResultsListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header - Estilo Airbnb */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-72" />
      </div>

      {/* Grid de Cards - Estilo Airbnb */}
      <div className="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <StoreCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
