'use client';

import useSearchStore from '@/store/search/search.store';
import { IStoreSearchListItem } from '@/store/search/search.types';
import { cn } from '@repo/ui/index';
import { motion } from 'motion/react';
import { StoreCard } from '../store-card';

interface VirtualizedResultsListProps {
  stores: IStoreSearchListItem[];
}

export function VirtualizedResultsList({
  stores,
}: VirtualizedResultsListProps) {
  const selectedStore = useSearchStore((state) => state.selectedStore);
  const setSelectedStore = useSearchStore((state) => state.setSelectedStore);

  return (
    <div className="space-y-6">
      {/* Results Header - Estilo Airbnb */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
        <div>
          <p className="text-sm text-gray-600 mb-1">
            {stores.length > 100 ? 'Mais de 100' : stores.length} serviços
          </p>
          <h1 className="text-2xl md:text-[28px] font-semibold text-gray-900 leading-tight">
            Profissionais próximos a você
          </h1>
        </div>
      </div>

      {/* Grid de Cards - Estilo Airbnb */}
      <motion.div
        role="list"
        aria-label="Lista de serviços encontrados"
        className={cn(
          'grid gap-x-6 gap-y-10',
          // Responsivo: 1 coluna mobile, 2 colunas tablet/desktop (com preview lateral)
          'grid-cols-2 sm:grid-cols-3',
        )}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {stores.map((store, index) => (
          <motion.div
            key={store.id}
            role="listitem"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <StoreCard
              store={store}
              isSelected={selectedStore?.id === store.id}
              onClick={() => setSelectedStore(store)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Mensagem de fim da lista */}
      {stores.length > 0 && (
        <div className="text-center py-8 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Mostrando todos os {stores.length} resultados
          </p>
        </div>
      )}
    </div>
  );
}
