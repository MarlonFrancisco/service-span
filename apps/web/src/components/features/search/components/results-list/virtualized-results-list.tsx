'use client';

import useSearchStore from '@/store/search/search.store';
import { IStoreSearchListItem } from '@/store/search/search.types';
import { useIsMobile } from '@repo/ui';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { StoreCard } from '../store-card';

interface VirtualizedResultsListProps {
  stores: IStoreSearchListItem[];
}

export function VirtualizedResultsList({
  stores,
}: VirtualizedResultsListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const selectedStore = useSearchStore((state) => state.selectedStore);
  const setSelectedStore = useSearchStore((state) => state.setSelectedStore);
  const isMobile = useIsMobile();

  const virtualizer = useVirtualizer({
    count: stores.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isMobile ? 148 : 380),
    gap: isMobile ? 8 : 24,
    overscan: 10,
    paddingEnd: isMobile ? 8 : 24,
    paddingStart: isMobile ? 8 : 24,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Results Header */}
      <div className="flex justify-between items-center px-1">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {stores.length} serviços encontrados
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-0.5 md:mt-1">
            Profissionais verificados próximos a você
          </p>
        </div>
      </div>

      {/* Virtualized Container */}
      <div
        ref={parentRef}
        role="list"
        aria-label="Lista de serviços encontrados"
        className="h-[calc(100vh-220px)] md:h-[1200px] overflow-y-auto rounded-lg md:border md:border-gray-200 -mx-1 md:mx-0"
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
                role="listitem"
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                  paddingLeft: isMobile ? '8px' : '16px',
                  paddingRight: isMobile ? '8px' : '16px',
                }}
              >
                <StoreCard
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
