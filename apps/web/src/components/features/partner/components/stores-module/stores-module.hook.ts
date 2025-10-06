import { useCallback, useState } from 'react';
import type {
  TStoreImage,
  TStoreWithImages,
  TUseStoresModuleReturn,
} from './stores-module.types';

const MOCK_STORES: TStoreWithImages[] = [
  {
    id: '1',
    name: 'Loja Centro',
    address: 'Rua das Flores, 123 - Centro',
    description:
      'Nosso salon principal no coração da cidade, oferecendo serviços completos de beleza e bem-estar.',
    imageUrl:
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc1OTI3MzYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc1OTI3MzYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
        isMain: true,
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGNoYWlyc3xlbnwxfHx8fDE3NTkyNzM2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        isMain: false,
      },
    ],
    status: 'active',
    workingHours: '08:00 - 18:00',
    staff: 3,
    monthlyBookings: 87,
  },
  {
    id: '2',
    name: 'Loja Shopping',
    address: 'Shopping Center, Loja 45 - 2º Piso',
    description:
      'Unidade moderna no shopping com maior fluxo de clientes e horário estendido.',
    imageUrl:
      'https://images.unsplash.com/photo-1726255294274-831cb82858ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3NTkyNzM2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1726255294274-831cb82858ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3NTkyNzM2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        isMain: true,
      },
    ],
    status: 'active',
    workingHours: '10:00 - 22:00',
    staff: 5,
    monthlyBookings: 142,
  },
  {
    id: '3',
    name: 'Loja Zona Sul',
    address: 'Av. Principal, 567 - Zona Sul',
    description:
      'Barbearia especializada em cortes masculinos e cuidados com a barba.',
    imageUrl:
      'https://images.unsplash.com/photo-1667539916609-c706d5b7ed65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5MjM0MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1667539916609-c706d5b7ed65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5MjM0MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        isMain: true,
      },
    ],
    status: 'paused',
    workingHours: '09:00 - 19:00',
    staff: 2,
    monthlyBookings: 34,
  },
];

export const useStoresModule = (): TUseStoresModuleReturn => {
  const [stores, setStores] = useState<TStoreWithImages[]>(MOCK_STORES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<TStoreWithImages | null>(
    null,
  );
  const [newStoreImages, setNewStoreImages] = useState<TStoreImage[]>([]);
  const [editingStoreImages, setEditingStoreImages] = useState<TStoreImage[]>(
    [],
  );

  const toggleStoreStatus = useCallback((storeId: string) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId
          ? {
              ...store,
              status: store.status === 'active' ? 'paused' : 'active',
            }
          : store,
      ),
    );
  }, []);

  const handleEditStore = useCallback((store: TStoreWithImages) => {
    setEditingStore(store);
    setEditingStoreImages(store.images || []);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditingStore(null);
    setEditingStoreImages([]);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setIsAddModalOpen(false);
    setNewStoreImages([]);
  }, []);

  return {
    stores,
    isAddModalOpen,
    editingStore,
    newStoreImages,
    editingStoreImages,
    toggleStoreStatus,
    handleEditStore,
    handleCloseEditModal,
    handleCloseAddModal,
    setNewStoreImages,
    setEditingStoreImages,
  };
};
