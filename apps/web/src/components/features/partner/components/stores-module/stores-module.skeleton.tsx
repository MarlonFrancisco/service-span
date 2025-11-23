import { Skeleton } from '@repo/ui';
import { StoreCardSkeleton } from './components/store-card/store-card.skeleton';

export const StoresModuleSkeleton = () => {
  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">Gestão de Lojas</h2>
          <p className="text-gray-600 text-sm">
            Gerencie suas unidades, equipes e configurações
          </p>
        </div>

        <Skeleton className="h-[44px] sm:h-[40px] w-full sm:w-[180px] bg-gray-200 shrink-0" />
      </div>

      {/* Stores List */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <StoreCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
