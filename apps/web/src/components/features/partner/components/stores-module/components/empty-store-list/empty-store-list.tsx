import { useStoresAdmin } from '@/store/admin/stores/stores.hook';
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@repo/ui';
import { Plus, Store } from 'lucide-react';

export const EmptyStoreList = () => {
  const { setIsAddModalOpen } = useStoresAdmin();

  return (
    <Empty className="border-3 border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Store size={60} className="text-gray-500" />
        </EmptyMedia>
        <EmptyTitle className="text-xl">Nenhuma loja cadastrada</EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription className="text-lg">
          Você ainda não cadastrou nenhuma loja. Clique no botão abaixo para
          adicionar sua primeira loja.
        </EmptyDescription>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddModalOpen({ isOpen: true })}>
            <Plus />
            Adicionar Nova Loja
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};
