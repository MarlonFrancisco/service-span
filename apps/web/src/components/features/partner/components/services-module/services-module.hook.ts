import { useState } from 'react';
import { toast } from 'sonner';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

interface ServiceFormData {
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string;
  isActive: boolean;
}

interface CategoryFormData {
  name: string;
  description: string;
  color: string;
}

const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Corte Feminino',
    description:
      'Corte de cabelo feminino com acabamento profissional e lavagem incluída',
    duration: 60,
    price: 65,
    category: 'Cabelo',
    isActive: true,
  },
  {
    id: '2',
    name: 'Corte Masculino',
    description: 'Corte de cabelo masculino tradicional com máquina e tesoura',
    duration: 30,
    price: 35,
    category: 'Cabelo',
    isActive: true,
  },
  {
    id: '3',
    name: 'Escova',
    description:
      'Escova modeladora para cabelos médios e longos com finalização',
    duration: 45,
    price: 45,
    category: 'Cabelo',
    isActive: true,
  },
  {
    id: '4',
    name: 'Barba',
    description: 'Aparar e modelar barba com navalha e acabamento',
    duration: 30,
    price: 25,
    category: 'Barba',
    isActive: true,
  },
  {
    id: '5',
    name: 'Limpeza de Pele',
    description: 'Limpeza profunda facial completa com extração e máscara',
    duration: 90,
    price: 120,
    category: 'Estética',
    isActive: false,
  },
];

const INITIAL_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Cabelo',
    description: 'Serviços de corte e tratamento capilar',
    color: 'purple',
  },
  {
    id: '2',
    name: 'Barba',
    description: 'Serviços de barbear e modelagem',
    color: 'blue',
  },
  {
    id: '3',
    name: 'Estética',
    description: 'Tratamentos faciais e corporais',
    color: 'pink',
  },
  {
    id: '4',
    name: 'Manicure',
    description: 'Cuidados com unhas',
    color: 'red',
  },
  {
    id: '5',
    name: 'Massagem',
    description: 'Terapias e relaxamento',
    color: 'green',
  },
];

export function useServicesModule() {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    description: '',
    duration: '',
    price: '',
    category: '',
    isActive: true,
  });

  const [categoryFormData, setCategoryFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    color: 'blue',
  });

  const toggleServiceStatus = (serviceId: string) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? { ...service, isActive: !service.isActive }
          : service,
      ),
    );
    toast.success('Status atualizado com sucesso!');
  };

  const deleteService = (serviceId: string) => {
    setServices(services.filter((service) => service.id !== serviceId));
    toast.success('Serviço excluído com sucesso!');
  };

  const handleAddService = () => {
    if (
      !formData.name ||
      !formData.category ||
      !formData.duration ||
      !formData.price
    ) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const newService: Service = {
      id: String(Date.now()),
      name: formData.name,
      description: formData.description,
      duration: Number(formData.duration),
      price: Number(formData.price),
      category: formData.category,
      isActive: formData.isActive,
    };

    setServices([...services, newService]);
    setIsAddModalOpen(false);
    resetForm();
    toast.success('Serviço criado com sucesso!');
  };

  const handleUpdateService = () => {
    if (!editingService) return;

    setServices(
      services.map((service) =>
        service.id === editingService.id
          ? {
              ...service,
              name: formData.name,
              description: formData.description,
              duration: Number(formData.duration),
              price: Number(formData.price),
              category: formData.category,
            }
          : service,
      ),
    );

    setEditingService(null);
    resetForm();
    toast.success('Serviço atualizado com sucesso!');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      duration: '',
      price: '',
      category: '',
      isActive: true,
    });
  };

  const handleEditService = (service: Service) => {
    setFormData({
      name: service.name,
      description: service.description,
      duration: String(service.duration),
      price: String(service.price),
      category: service.category,
      isActive: service.isActive,
    });
    setEditingService(service);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingService(null);
    resetForm();
  };

  const addCategory = () => {
    if (!categoryFormData.name.trim()) {
      toast.error('Digite um nome para a categoria');
      return;
    }

    if (
      categories.some(
        (cat) => cat.name.toLowerCase() === categoryFormData.name.toLowerCase(),
      )
    ) {
      toast.error('Já existe uma categoria com este nome');
      return;
    }

    const newCategory: Category = {
      id: String(Date.now()),
      name: categoryFormData.name.trim(),
      description: categoryFormData.description.trim(),
      color: categoryFormData.color,
    };

    setCategories([...categories, newCategory]);
    setCategoryFormData({ name: '', description: '', color: 'blue' });
    toast.success('Categoria criada com sucesso!');
  };

  const handleEditCategory = (category: Category) => {
    setCategoryFormData({
      name: category.name,
      description: category.description || '',
      color: category.color || 'blue',
    });
    setEditingCategory(category);
  };

  const updateCategory = () => {
    if (!editingCategory) return;

    if (!categoryFormData.name.trim()) {
      toast.error('Digite um nome para a categoria');
      return;
    }

    if (
      categories.some(
        (cat) =>
          cat.id !== editingCategory.id &&
          cat.name.toLowerCase() === categoryFormData.name.trim().toLowerCase(),
      )
    ) {
      toast.error('Já existe uma categoria com este nome');
      return;
    }

    const oldCategoryName = editingCategory.name;
    const newCategoryName = categoryFormData.name.trim();

    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id
          ? {
              ...cat,
              name: newCategoryName,
              description: categoryFormData.description.trim(),
              color: categoryFormData.color,
            }
          : cat,
      ),
    );

    if (oldCategoryName !== newCategoryName) {
      setServices(
        services.map((service) =>
          service.category === oldCategoryName
            ? { ...service, category: newCategoryName }
            : service,
        ),
      );
    }

    setEditingCategory(null);
    setCategoryFormData({ name: '', description: '', color: 'blue' });
    toast.success('Categoria atualizada com sucesso!');
  };

  const cancelEditCategory = () => {
    setEditingCategory(null);
    setCategoryFormData({ name: '', description: '', color: 'blue' });
  };

  const deleteCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return;

    const isUsed = services.some(
      (service) => service.category === category.name,
    );

    if (isUsed) {
      toast.error('Não é possível excluir uma categoria em uso');
      return;
    }

    setCategories(categories.filter((cat) => cat.id !== categoryId));
    toast.success('Categoria excluída com sucesso!');
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleQuickAddService = (categoryName: string) => {
    setFormData({
      ...formData,
      category: categoryName,
    });
    setIsAddModalOpen(true);
  };

  // Computed values
  const totalServices = services.length;
  const activeServices = services.filter((s) => s.isActive).length;

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return {
    // State
    services,
    categories,
    isAddModalOpen,
    setIsAddModalOpen,
    editingService,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    editingCategory,
    expandedCategories,
    formData,
    setFormData,
    categoryFormData,
    setCategoryFormData,

    // Service actions
    toggleServiceStatus,
    deleteService,
    handleAddService,
    handleUpdateService,
    handleEditService,
    handleCloseModal,
    handleQuickAddService,

    // Category actions
    addCategory,
    handleEditCategory,
    updateCategory,
    cancelEditCategory,
    deleteCategory,
    toggleCategory,

    // Computed
    totalServices,
    activeServices,
    filteredServices,
  };
}
