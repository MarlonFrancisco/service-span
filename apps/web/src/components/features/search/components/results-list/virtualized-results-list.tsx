'use client';

import useSearchStore from '@/store/search/search.store';
import { IStoreSearchListItem } from '@/store/search/search.types';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { ServiceCard } from '../service-card';

interface VirtualizedResultsListProps {
  stores: IStoreSearchListItem[];
}

export function VirtualizedResultsList({
  stores,
}: VirtualizedResultsListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const selectedStore = useSearchStore((state) => state.selectedStore);
  const setSelectedStore = useSearchStore((state) => state.setSelectedStore);

  const virtualizer = useVirtualizer({
    count: stores.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 380,
    gap: 0,
    overscan: 10,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {stores.length} serviços encontrados
          </h2>
          <p className="text-gray-600 mt-1">
            Profissionais verificados próximos a você
          </p>
        </div>
      </div>

      {/* Virtualized Container */}
      <div
        ref={parentRef}
        className="h-[850px] overflow-y-auto rounded-lg border border-gray-200 pt-4"
      >
        <div
          style={{
            height: `${totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualItems.map((virtualItem) => {
            const store = stores[virtualItem.index];
            if (!store) return null;

            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                  paddingLeft: '16px',
                  paddingRight: '16px',
                }}
              >
                <ServiceCard
                  store={store}
                  isSelected={selectedStore?.id === store.id}
                  onClick={() => setSelectedStore(store)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
