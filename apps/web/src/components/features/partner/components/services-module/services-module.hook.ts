import { useCallback, useState } from 'react';
import type {
  TService,
  TStore,
  TUseServicesModuleReturn,
} from './services-module.types';

const MOCK_STORE: TStore = {
  id: '1',
  name: 'Loja 1',
  address: 'Rua 1, 123',
};

const MOCK_SERVICES: TService[] = [
  {
    id: '1',
    name: 'Corte Feminino',
    description: 'Corte de cabelo feminino com acabamento',
    duration: 60,
    price: 65,
    category: 'Cabelo',
    isActive: true,
  },
  {
    id: '2',
    name: 'Corte Masculino',
    description: 'Corte de cabelo masculino tradicional',
    duration: 30,
    price: 35,
    category: 'Cabelo',
    isActive: true,
  },
  {
    id: '3',
    name: 'Escova',
    description: 'Escova modeladora para cabelos médios e longos',
    duration: 45,
    price: 45,
    category: 'Cabelo',
    isActive: true,
  },
  {
    id: '4',
    name: 'Barba',
    description: 'Aparar e modelar barba com navalha',
    duration: 30,
    price: 25,
    category: 'Barba',
    isActive: true,
  },
  {
    id: '5',
    name: 'Limpeza de Pele',
    description: 'Limpeza profunda facial completa',
    duration: 90,
    price: 120,
    category: 'Estética',
    isActive: false,
  },
];

const MOCK_CATEGORIES = ['Cabelo', 'Barba', 'Estética', 'Manicure', 'Massagem'];

export const useServicesModule = (): TUseServicesModuleReturn => {
  const [services, setServices] = useState<TService[]>(MOCK_SERVICES);
  const [categories, setCategories] = useState<string[]>(MOCK_CATEGORIES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<TService | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [activeStore] = useState<TStore>(MOCK_STORE);

  const toggleServiceStatus = useCallback((serviceId: string) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId
          ? { ...service, isActive: !service.isActive }
          : service,
      ),
    );
  }, []);

  const deleteService = useCallback((serviceId: string) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== serviceId),
    );
  }, []);

  const addCategory = useCallback((categoryName: string) => {
    const trimmedName = categoryName.trim();
    if (trimmedName) {
      setCategories((prevCategories) => {
        if (!prevCategories.includes(trimmedName)) {
          return [...prevCategories, trimmedName];
        }
        return prevCategories;
      });
    }
  }, []);

  const deleteCategory = useCallback(
    (categoryName: string) => {
      const isUsed = services.some(
        (service) => service.category === categoryName,
      );
      if (!isUsed) {
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat !== categoryName),
        );
      }
    },
    [services],
  );

  const handleOpenAddModal = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setIsAddModalOpen(false);
  }, []);

  const handleEditService = useCallback((service: TService) => {
    setEditingService(service);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditingService(null);
  }, []);

  const handleOpenCategoryModal = useCallback(() => {
    setIsCategoryModalOpen(true);
  }, []);

  const handleCloseCategoryModal = useCallback(() => {
    setIsCategoryModalOpen(false);
  }, []);

  return {
    services,
    categories,
    isAddModalOpen,
    editingService,
    isCategoryModalOpen,
    activeStore,
    toggleServiceStatus,
    deleteService,
    addCategory,
    deleteCategory,
    handleOpenAddModal,
    handleCloseAddModal,
    handleEditService,
    handleCloseEditModal,
    handleOpenCategoryModal,
    handleCloseCategoryModal,
  };
};
