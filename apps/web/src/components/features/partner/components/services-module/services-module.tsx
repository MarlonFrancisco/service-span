'use client';
import {
  Alert,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '@repo/ui';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Edit,
  Filter,
  Folder,
  Package,
  Plus,
  Search,
  Settings,
  Tags,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  isActive: boolean;
  bookingsThisMonth?: number;
  revenue?: number;
  imageUrl?: string;
  maxBookingsPerDay?: number;
  tags?: string[];
}

interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

export function ServicesModule() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Corte Feminino',
      description:
        'Corte de cabelo feminino com acabamento profissional e lavagem incluída',
      duration: 60,
      price: 65,
      category: 'Cabelo',
      isActive: true,
      bookingsThisMonth: 34,
      revenue: 2210,
      maxBookingsPerDay: 8,
      tags: ['Popular', 'Feminino'],
    },
    {
      id: '2',
      name: 'Corte Masculino',
      description:
        'Corte de cabelo masculino tradicional com máquina e tesoura',
      duration: 30,
      price: 35,
      category: 'Cabelo',
      isActive: true,
      bookingsThisMonth: 52,
      revenue: 1820,
      maxBookingsPerDay: 12,
      tags: ['Popular', 'Masculino'],
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
      bookingsThisMonth: 28,
      revenue: 1260,
      maxBookingsPerDay: 10,
    },
    {
      id: '4',
      name: 'Barba',
      description: 'Aparar e modelar barba com navalha e acabamento',
      duration: 30,
      price: 25,
      category: 'Barba',
      isActive: true,
      bookingsThisMonth: 41,
      revenue: 1025,
      maxBookingsPerDay: 15,
      tags: ['Masculino'],
    },
    {
      id: '5',
      name: 'Limpeza de Pele',
      description: 'Limpeza profunda facial completa com extração e máscara',
      duration: 90,
      price: 120,
      category: 'Estética',
      isActive: false,
      bookingsThisMonth: 0,
      revenue: 0,
      maxBookingsPerDay: 4,
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([
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
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form state for add/edit service
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
    category: '',
    maxBookingsPerDay: '',
    isActive: true,
  });

  // Category form state
  const [categoryFormData, setCategoryFormData] = useState({
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
      maxBookingsPerDay: formData.maxBookingsPerDay
        ? Number(formData.maxBookingsPerDay)
        : undefined,
      bookingsThisMonth: 0,
      revenue: 0,
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
              maxBookingsPerDay: formData.maxBookingsPerDay
                ? Number(formData.maxBookingsPerDay)
                : undefined,
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
      maxBookingsPerDay: '',
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
      maxBookingsPerDay: service.maxBookingsPerDay
        ? String(service.maxBookingsPerDay)
        : '',
      isActive: service.isActive,
    });
    setEditingService(service);
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

    // Check for duplicate names (excluding the current category being edited)
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

    // Update category
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

    // Update services that use this category
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

  // Calculate overview stats
  const totalServices = services.length;
  const activeServices = services.filter((s) => s.isActive).length;
  const totalBookings = services.reduce(
    (acc, s) => acc + (s.bookingsThisMonth || 0),
    0,
  );
  const totalRevenue = services.reduce((acc, s) => acc + (s.revenue || 0), 0);

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'bg-purple-50 text-purple-600',
      blue: 'bg-blue-50 text-blue-600',
      pink: 'bg-pink-50 text-pink-600',
      red: 'bg-red-50 text-red-600',
      green: 'bg-green-50 text-green-600',
      orange: 'bg-orange-50 text-orange-600',
      yellow: 'bg-yellow-50 text-yellow-600',
      gray: 'bg-gray-100 text-gray-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Total de Serviços
                  </p>
                  <p className="text-3xl text-gray-900">{totalServices}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Serviços Ativos</p>
                  <p className="text-3xl text-gray-900">{activeServices}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Agendamentos/mês</p>
                  <p className="text-3xl text-gray-900">{totalBookings}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Receita Mensal</p>
                  <p className="text-3xl text-gray-900">
                    R$ {totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Header with Actions */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setIsCategoryModalOpen(true)}
          className="border-gray-300"
        >
          <Tags className="h-4 w-4 mr-2" />
          Categorias
        </Button>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-black hover:bg-gray-800 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Serviço
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar serviços..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services by Category */}
      <AnimatePresence mode="wait">
        {filterCategory === 'all' ? (
          // Show all categories
          categories.map((category) => {
            const categoryServices = filteredServices.filter(
              (service) => service.category === category.name,
            );

            if (categoryServices.length === 0) return null;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg ${getColorClass(category.color || 'blue')} flex items-center justify-center`}
                  >
                    <Folder className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {categoryServices.length}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onEdit={handleEditService}
                      onDelete={deleteService}
                      onToggleStatus={toggleServiceStatus}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })
        ) : (
          // Show filtered category only
          <motion.div
            key={filterCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={handleEditService}
                  onDelete={deleteService}
                  onToggleStatus={toggleServiceStatus}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredServices.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">Nenhum serviço encontrado</h3>
            <p className="text-gray-600 text-sm">
              {searchQuery || filterCategory !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Comece adicionando seu primeiro serviço'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Service Modal */}
      <Dialog
        open={isAddModalOpen || !!editingService}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddModalOpen(false);
            setEditingService(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-gray-900">
              {editingService ? 'Editar Serviço' : 'Novo Serviço'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-900 mb-3">
                  Informações Básicas
                </h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="serviceName">
                      Nome do Serviço <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="serviceName"
                      placeholder="Ex: Corte Feminino"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="serviceDescription">Descrição</Label>
                    <Textarea
                      id="serviceDescription"
                      placeholder="Descreva os detalhes do serviço..."
                      rows={3}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="serviceCategory">
                      Categoria <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger id="serviceCategory">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded ${getColorClass(category.color || 'blue')}`}
                              />
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Pricing and Duration */}
              <div>
                <h4 className="text-sm text-gray-900 mb-3">Preço e Duração</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="serviceDuration">
                      Duração (minutos) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="serviceDuration"
                      type="number"
                      placeholder="60"
                      min="5"
                      step="5"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tempo estimado do serviço
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="servicePrice">
                      Preço (R$) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="servicePrice"
                      type="number"
                      placeholder="65.00"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Valor cobrado pelo serviço
                    </p>
                  </div>
                </div>
              </div>

              {/* Capacity and Availability */}
              <div>
                <h4 className="text-sm text-gray-900 mb-3">Disponibilidade</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="maxBookings">
                      Máximo de agendamentos por dia
                    </Label>
                    <Input
                      id="maxBookings"
                      type="number"
                      placeholder="10"
                      min="1"
                      value={formData.maxBookingsPerDay}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxBookingsPerDay: e.target.value,
                        })
                      }
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Limite diário de agendamentos (opcional)
                    </p>
                  </div>

                  {!editingService && (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <Label
                          htmlFor="serviceActive"
                          className="cursor-pointer"
                        >
                          Serviço ativo
                        </Label>
                        <p className="text-xs text-gray-600 mt-1">
                          O serviço estará disponível para agendamento
                        </p>
                      </div>
                      <Switch
                        id="serviceActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isActive: checked })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Info Alert */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Campos marcados com <span className="text-red-500">*</span> são
                obrigatórios
              </AlertDescription>
            </Alert>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingService(null);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-black hover:bg-gray-800 text-white"
                onClick={
                  editingService ? handleUpdateService : handleAddService
                }
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {editingService ? 'Salvar Alterações' : 'Criar Serviço'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Category Management Modal */}
      <Dialog
        open={isCategoryModalOpen}
        onOpenChange={(open) => {
          setIsCategoryModalOpen(open);
          if (!open) {
            setEditingCategory(null);
            setCategoryFormData({ name: '', description: '', color: 'blue' });
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <Tags className="h-5 w-5" />
              Gerenciar Categorias
            </DialogTitle>
          </DialogHeader>

          <Tabs
            defaultValue="list"
            className="w-full"
            value={editingCategory ? 'edit' : undefined}
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="list" disabled={!!editingCategory}>
                Categorias Atuais
              </TabsTrigger>
              <TabsTrigger value="add" disabled={!!editingCategory}>
                {editingCategory ? 'Editar Categoria' : 'Adicionar Nova'}
              </TabsTrigger>
            </TabsList>

            {/* List Categories */}
            <TabsContent value="list" className="space-y-4 mt-6">
              <div className="space-y-3">
                {categories.map((category) => {
                  const serviceCount = services.filter(
                    (service) => service.category === category.name,
                  ).length;

                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`w-10 h-10 rounded-lg ${getColorClass(category.color || 'blue')} flex items-center justify-center flex-shrink-0`}
                        >
                          <Folder className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-gray-900">{category.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {serviceCount}{' '}
                              {serviceCount === 1 ? 'serviço' : 'serviços'}
                            </Badge>
                          </div>
                          {category.description && (
                            <p className="text-sm text-gray-600">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditCategory(category)}
                          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteCategory(category.id)}
                          disabled={serviceCount > 0}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {categories.length === 0 && (
                <div className="text-center py-12">
                  <Tags className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">
                    Nenhuma categoria criada
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Adicione sua primeira categoria na aba ao lado
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Add/Edit Category */}
            <TabsContent value="add" className="space-y-4 mt-6">
              {editingCategory && (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Editando categoria: <strong>{editingCategory.name}</strong>
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="categoryName">
                    Nome da Categoria <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="categoryName"
                    placeholder="Ex: Tratamentos Faciais"
                    value={categoryFormData.name}
                    onChange={(e) =>
                      setCategoryFormData({
                        ...categoryFormData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="categoryDescription">Descrição</Label>
                  <Textarea
                    id="categoryDescription"
                    placeholder="Descreva o tipo de serviços desta categoria..."
                    rows={3}
                    value={categoryFormData.description}
                    onChange={(e) =>
                      setCategoryFormData({
                        ...categoryFormData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="categoryColor">Cor da Categoria</Label>
                  <Select
                    value={categoryFormData.color}
                    onValueChange={(value) =>
                      setCategoryFormData({ ...categoryFormData, color: value })
                    }
                  >
                    <SelectTrigger id="categoryColor">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        'blue',
                        'purple',
                        'pink',
                        'red',
                        'orange',
                        'yellow',
                        'green',
                        'gray',
                      ].map((color) => (
                        <SelectItem key={color} value={color}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded ${getColorClass(color)}`}
                            />
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {!editingCategory && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      As categorias ajudam a organizar seus serviços e facilitar
                      a busca dos clientes
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  {editingCategory ? (
                    <>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={cancelEditCategory}
                      >
                        Cancelar
                      </Button>
                      <Button
                        className="flex-1 bg-black hover:bg-gray-800 text-white"
                        onClick={updateCategory}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Salvar Alterações
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      onClick={addCategory}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Categoria
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Edit Category Tab (dynamically shown) */}
            {editingCategory && (
              <TabsContent value="edit" className="space-y-4 mt-6">
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Editando categoria: <strong>{editingCategory.name}</strong>
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="editCategoryName">
                      Nome da Categoria <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="editCategoryName"
                      placeholder="Ex: Tratamentos Faciais"
                      value={categoryFormData.name}
                      onChange={(e) =>
                        setCategoryFormData({
                          ...categoryFormData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="editCategoryDescription">Descrição</Label>
                    <Textarea
                      id="editCategoryDescription"
                      placeholder="Descreva o tipo de serviços desta categoria..."
                      rows={3}
                      value={categoryFormData.description}
                      onChange={(e) =>
                        setCategoryFormData({
                          ...categoryFormData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="editCategoryColor">Cor da Categoria</Label>
                    <Select
                      value={categoryFormData.color}
                      onValueChange={(value) =>
                        setCategoryFormData({
                          ...categoryFormData,
                          color: value,
                        })
                      }
                    >
                      <SelectTrigger id="editCategoryColor">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          'blue',
                          'purple',
                          'pink',
                          'red',
                          'orange',
                          'yellow',
                          'green',
                          'gray',
                        ].map((color) => (
                          <SelectItem key={color} value={color}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded ${getColorClass(color)}`}
                              />
                              {color.charAt(0).toUpperCase() + color.slice(1)}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Alterar o nome da categoria irá atualizar automaticamente
                      todos os serviços vinculados
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={cancelEditCategory}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="flex-1 bg-black hover:bg-gray-800 text-white"
                      onClick={updateCategory}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Service Card Component
function ServiceCard({
  service,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}) {
  const popularityLevel =
    (service.bookingsThisMonth || 0) >= 30
      ? 'high'
      : (service.bookingsThisMonth || 0) >= 15
        ? 'medium'
        : 'low';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`relative border-gray-200 h-full hover:shadow-lg transition-all duration-300 pt-0 ${
          !service.isActive ? 'opacity-60' : ''
        }`}
      >
        {/* Image/Icon Header */}
        <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
              <Package className="h-8 w-8 text-gray-900" />
            </div>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              className={
                service.isActive
                  ? 'bg-green-50 text-green-700 border-green-200 shadow-sm'
                  : 'bg-gray-100 text-gray-600 border-gray-200'
              }
            >
              {service.isActive ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>

          {/* Popularity Indicator */}
          {service.isActive && popularityLevel === 'high' && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-orange-50 text-orange-700 border-orange-200 shadow-sm flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Popular
              </Badge>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              {service.category}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-gray-900 text-lg mb-2">
                {service.name}
              </CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">
                {service.description || 'Sem descrição'}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Price and Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Clock className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Duração</p>
                <p className="text-sm text-gray-900">{service.duration}min</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <DollarSign className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Preço</p>
                <p className="text-sm text-gray-900">
                  R$ {service.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          {service.isActive && (
            <div className="space-y-2 p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
              <h4 className="text-xs text-gray-700 uppercase tracking-wide">
                Desempenho
              </h4>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Agendamentos/mês
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900">
                      {service.bookingsThisMonth || 0}
                    </span>
                    {popularityLevel === 'high' && (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Receita gerada</span>
                  <span className="text-sm text-gray-900">
                    R$ {(service.revenue || 0).toLocaleString()}
                  </span>
                </div>

                {service.maxBookingsPerDay && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Capacidade/dia
                    </span>
                    <span className="text-sm text-gray-900">
                      {service.maxBookingsPerDay} agendamentos
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {service.tags && service.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {service.tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs border-gray-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(service)}
                className="border-gray-300 hover:bg-gray-50"
              >
                <Edit className="h-3 w-3 mr-1" />
                Editar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(service.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Excluir
              </Button>
            </div>

            <Button
              variant={service.isActive ? 'outline' : 'default'}
              size="sm"
              className={`w-full ${
                !service.isActive
                  ? 'bg-black hover:bg-gray-800 text-white'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onToggleStatus(service.id)}
            >
              {service.isActive ? 'Desativar Serviço' : 'Ativar Serviço'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
