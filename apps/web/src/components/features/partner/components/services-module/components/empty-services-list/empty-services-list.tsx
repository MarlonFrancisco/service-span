'use client';

import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@repo/ui';
import { Package, Plus } from 'lucide-react';

interface EmptyServicesListProps {
  searchQuery?: string;
  filterCategory?: string;
  onAddService: () => void;
}

export function EmptyServicesList({
  searchQuery = '',
  filterCategory = 'all',
  onAddService,
}: EmptyServicesListProps) {
  const isFiltered = searchQuery || filterCategory !== 'all';

  return (
    <Empty className="min-h-[400px] flex items-center justify-center">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Package size={60} className="text-gray-500" />
        </EmptyMedia>
        <EmptyTitle className="text-xl">
          {isFiltered ? 'Nenhum serviço encontrado' : 'Nenhum serviço cadastrado'}
        </EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription className="text-lg">
          {isFiltered
            ? 'Tente ajustar os filtros ou fazer uma nova busca'
            : 'Comece adicionando seu primeiro serviço'}
        </EmptyDescription>
        {!isFiltered && (
          <Button
            onClick={onAddService}
            className="mt-6 bg-gray-900 hover:bg-gray-800 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Primeiro Serviço
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}
