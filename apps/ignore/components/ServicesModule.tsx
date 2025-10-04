import { useState } from "react";
import { Plus, Edit, Trash2, Clock, DollarSign, Tags, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Store {
  id: string;
  name: string;
  address: string;
}

interface ServicesModuleProps {
  activeStore: Store;
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  isActive: boolean;
}

export function ServicesModule({ activeStore }: ServicesModuleProps) {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Corte Feminino',
      description: 'Corte de cabelo feminino com acabamento',
      duration: 60,
      price: 65,
      category: 'Cabelo',
      isActive: true
    },
    {
      id: '2',
      name: 'Corte Masculino',
      description: 'Corte de cabelo masculino tradicional',
      duration: 30,
      price: 35,
      category: 'Cabelo',
      isActive: true
    },
    {
      id: '3',
      name: 'Escova',
      description: 'Escova modeladora para cabelos médios e longos',
      duration: 45,
      price: 45,
      category: 'Cabelo',
      isActive: true
    },
    {
      id: '4',
      name: 'Barba',
      description: 'Aparar e modelar barba com navalha',
      duration: 30,
      price: 25,
      category: 'Barba',
      isActive: true
    },
    {
      id: '5',
      name: 'Limpeza de Pele',
      description: 'Limpeza profunda facial completa',
      duration: 90,
      price: 120,
      category: 'Estética',
      isActive: false
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState(['Cabelo', 'Barba', 'Estética', 'Manicure', 'Massagem']);

  const toggleServiceStatus = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  const deleteService = (serviceId: string) => {
    setServices(services.filter(service => service.id !== serviceId));
  };

  const addCategory = (categoryName: string) => {
    if (categoryName.trim() && !categories.includes(categoryName.trim())) {
      setCategories([...categories, categoryName.trim()]);
    }
  };

  const deleteCategory = (categoryName: string) => {
    // Check if category is being used by any service
    const isUsed = services.some(service => service.category === categoryName);
    if (!isUsed) {
      setCategories(categories.filter(cat => cat !== categoryName));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#1a2b4c]">Serviços - {activeStore.name}</h2>
          <p className="text-gray-600 text-sm">Configure os serviços oferecidos nesta unidade</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-[#1a2b4c]">Novo Serviço</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Nome do Serviço</Label>
                  <Input placeholder="Ex: Corte Feminino" />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descrição detalhada do serviço..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Duração (min)</Label>
                    <Input type="number" placeholder="60" />
                  </div>
                  <div>
                    <Label>Preço (R$)</Label>
                    <Input type="number" placeholder="65.00" />
                  </div>
                </div>
                <div>
                  <Label>Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
                    Criar Serviço
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Tags className="h-4 w-4 mr-2" />
                Gerenciar Categorias
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Category Management Modal */}
      <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1a2b4c] flex items-center gap-2">
              <Tags className="h-5 w-5" />
              Gerenciar Categorias
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">Categorias Atuais</TabsTrigger>
              <TabsTrigger value="add">Adicionar Nova</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="space-y-4">
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {categories.map((category) => {
                  const isUsed = services.some(service => service.category === category);
                  const serviceCount = services.filter(service => service.category === category).length;
                  
                  return (
                    <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm text-[#1a2b4c]">{category}</div>
                        <div className="text-xs text-gray-500">
                          {serviceCount} serviço{serviceCount !== 1 ? 's' : ''}
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteCategory(category)}
                        disabled={isUsed}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="add" className="space-y-4">
              <div>
                <Label>Nome da Nova Categoria</Label>
                <Input 
                  placeholder="Ex: Tratamentos Faciais" 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const target = e.target as HTMLInputElement;
                      addCategory(target.value);
                      target.value = '';
                    }
                  }}
                />
              </div>
              
              <Button 
                size="sm" 
                className="w-full bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white"
                onClick={(e) => {
                  const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                  if (input) {
                    addCategory(input.value);
                    input.value = '';
                  }
                }}
              >
                Adicionar Categoria
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Services by Category */}
      {categories.map(category => {
        const categoryServices = services.filter(service => service.category === category);
        
        if (categoryServices.length === 0) return null;
        
        return (
          <div key={category} className="space-y-4">
            <h3 className="text-[#1a2b4c] text-lg border-b border-gray-200 pb-2">
              {category}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryServices.map((service) => (
                <Card key={service.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-[#1a2b4c] text-base">{service.name}</CardTitle>
                        <Badge 
                          variant={service.isActive ? 'default' : 'secondary'}
                          className="mt-1"
                        >
                          {service.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingService(service)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteService(service.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">{service.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#20b2aa]" />
                        <span className="text-sm text-gray-600">{service.duration}min</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#1a2b4c]">R$ {service.price}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant={service.isActive ? "outline" : "default"}
                      size="sm" 
                      className="w-full"
                      onClick={() => toggleServiceStatus(service.id)}
                    >
                      {service.isActive ? 'Desativar' : 'Ativar'} Serviço
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* Edit Service Modal */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1a2b4c]">
              Editar Serviço - {editingService?.name}
            </DialogTitle>
          </DialogHeader>
          {editingService && (
            <div className="space-y-4">
              <div>
                <Label>Nome do Serviço</Label>
                <Input defaultValue={editingService.name} />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea defaultValue={editingService.description} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Duração (min)</Label>
                  <Input type="number" defaultValue={editingService.duration} />
                </div>
                <div>
                  <Label>Preço (R$)</Label>
                  <Input type="number" defaultValue={editingService.price} />
                </div>
              </div>
              <div>
                <Label>Categoria</Label>
                <Select defaultValue={editingService.category}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEditingService(null)}>
                  Cancelar
                </Button>
                <Button className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}