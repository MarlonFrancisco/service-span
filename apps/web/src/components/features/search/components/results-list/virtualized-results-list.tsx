'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import type { Service } from '../../search.types';
import { ServiceCard } from '../service-card';

interface VirtualizedResultsListProps {
  services: Service[];
  selectedServiceId: string | null;
  onServiceSelect: (service: Service) => void;
}

export function VirtualizedResultsList({
  services,
  selectedServiceId,
  onServiceSelect,
}: VirtualizedResultsListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: services.length,
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
            {services.length} serviços encontrados
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
            const service = services[virtualItem.index];
            if (!service) return null;

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
                  {...service}
                  images={service.images}
                  isSelected={selectedServiceId === service.id}
                  onClick={() => onServiceSelect(service)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
