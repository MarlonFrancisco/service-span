import { useState } from "react";
import { Plus, MapPin, Clock, Users, Settings, Edit, Pause, Play, Camera, Images } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MultiImageUpload } from "./MultiImageUpload";
import { Separator } from "./ui/separator";

interface StoreImage {
  id: string;
  url: string;
  file?: File;
  isMain?: boolean;
}

interface Store {
  id: string;
  name: string;
  address: string;
  description: string;
  imageUrl: string;
  images?: StoreImage[];
  status: 'active' | 'paused';
  workingHours: string;
  staff: number;
  monthlyBookings: number;
}

interface StoresModuleProps {
  stores: any[];
}

export function StoresModule({ stores: initialStores }: StoresModuleProps) {
  const [stores, setStores] = useState<Store[]>([
    {
      id: '1',
      name: 'Loja Centro',
      address: 'Rua das Flores, 123 - Centro',
      description: 'Nosso salon principal no coração da cidade, oferecendo serviços completos de beleza e bem-estar.',
      imageUrl: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc1OTI3MzYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc1OTI3MzYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
          isMain: true
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGNoYWlyc3xlbnwxfHx8fDE3NTkyNzM2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
          isMain: false
        }
      ],
      status: 'active',
      workingHours: '08:00 - 18:00',
      staff: 3,
      monthlyBookings: 87
    },
    {
      id: '2',
      name: 'Loja Shopping',
      address: 'Shopping Center, Loja 45 - 2º Piso',
      description: 'Unidade moderna no shopping com maior fluxo de clientes e horário estendido.',
      imageUrl: 'https://images.unsplash.com/photo-1726255294274-831cb82858ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3NTkyNzM2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1726255294274-831cb82858ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3NTkyNzM2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
          isMain: true
        }
      ],
      status: 'active',
      workingHours: '10:00 - 22:00',
      staff: 5,
      monthlyBookings: 142
    },
    {
      id: '3',
      name: 'Loja Zona Sul',
      address: 'Av. Principal, 567 - Zona Sul',
      description: 'Barbearia especializada em cortes masculinos e cuidados com a barba.',
      imageUrl: 'https://images.unsplash.com/photo-1667539916609-c706d5b7ed65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5MjM0MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        {
          id: '4',
          url: 'https://images.unsplash.com/photo-1667539916609-c706d5b7ed65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5MjM0MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
          isMain: true
        }
      ],
      status: 'paused',
      workingHours: '09:00 - 19:00',
      staff: 2,
      monthlyBookings: 34
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [newStoreImages, setNewStoreImages] = useState<StoreImage[]>([]);
  const [editingStoreImages, setEditingStoreImages] = useState<StoreImage[]>([]);

  const toggleStoreStatus = (storeId: string) => {
    setStores(stores.map(store => 
      store.id === storeId 
        ? { ...store, status: store.status === 'active' ? 'paused' : 'active' }
        : store
    ));
  };

  const handleEditStore = (store: Store) => {
    setEditingStore(store);
    setEditingStoreImages(store.images || []);
  };

  const handleCloseEditModal = () => {
    setEditingStore(null);
    setEditingStoreImages([]);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewStoreImages([]);
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#1a2b4c]">Suas Unidades</h2>
          <p className="text-gray-600 text-sm">Gerencie todas as suas filiais em um só lugar</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Nova Loja
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[#1a2b4c] flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Nova Loja
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Nome da Loja</Label>
                  <Input placeholder="Ex: Loja Centro" />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descreva sua loja, especialidades e diferenciais..." />
                </div>
                <div>
                  <Label>Endereço Completo</Label>
                  <Textarea placeholder="Rua, número, bairro, cidade..." />
                </div>
                <div>
                  <Label>Horário de Funcionamento</Label>
                  <Input placeholder="Ex: 08:00 - 18:00" />
                </div>
              </div>

              <Separator />

              <div>
                <Label className="flex items-center gap-2 mb-4">
                  <Images className="h-4 w-4" />
                  Fotos da Loja (até 5 imagens)
                </Label>
                <MultiImageUpload
                  images={newStoreImages}
                  onChange={setNewStoreImages}
                  maxImages={5}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCloseAddModal}>
                  Cancelar
                </Button>
                <Button className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
                  Criar Loja
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <Card key={store.id} className="relative overflow-hidden">
            {/* Store Image */}
            <div className="relative h-40 bg-gray-100">
              <ImageWithFallback 
                src={store.imageUrl}
                alt={`Foto da ${store.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEditStore(store)}
                  className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleStoreStatus(store.id)}
                  className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                >
                  {store.status === 'active' ? 
                    <Pause className="h-4 w-4" /> : 
                    <Play className="h-4 w-4" />
                  }
                </Button>
              </div>

              {/* Image count indicator */}
              {store.images && store.images.length > 1 && (
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="text-xs">
                    <Images className="h-3 w-3 mr-1" />
                    {store.images.length}
                  </Badge>
                </div>
              )}
              
              <div className="absolute top-2 left-2">
                <Badge variant={store.status === 'active' ? 'default' : 'secondary'}>
                  {store.status === 'active' ? 'Ativa' : 'Pausada'}
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-[#1a2b4c] text-lg">{store.name}</CardTitle>
              <p className="text-sm text-gray-600">{store.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#20b2aa] mt-0.5" />
                <p className="text-sm text-gray-600">{store.address}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#1a2b4c]" />
                <p className="text-sm text-gray-600">{store.workingHours}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#1a2b4c]" />
                <p className="text-sm text-gray-600">{store.staff} profissionais</p>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Agendamentos do mês</span>
                  <span className="text-sm text-[#1a2b4c]">{store.monthlyBookings}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleEditStore(store)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurações da Loja
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Store Modal */}
      <Dialog open={!!editingStore} onOpenChange={handleCloseEditModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#1a2b4c] flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações - {editingStore?.name}
            </DialogTitle>
          </DialogHeader>
          {editingStore && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="text-sm text-[#1a2b4c]">Informações Básicas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nome da Loja</Label>
                    <Input defaultValue={editingStore.name} />
                  </div>
                  <div>
                    <Label>Horário de Funcionamento</Label>
                    <Input defaultValue={editingStore.workingHours} />
                  </div>
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea defaultValue={editingStore.description} />
                </div>
                <div>
                  <Label>Endereço</Label>
                  <Textarea defaultValue={editingStore.address} />
                </div>
              </div>

              <Separator />

              {/* Store Images */}
              <div>
                <Label className="flex items-center gap-2 mb-4">
                  <Images className="h-4 w-4" />
                  Fotos da Loja (até 5 imagens)
                </Label>
                <MultiImageUpload
                  images={editingStoreImages}
                  onChange={setEditingStoreImages}
                  maxImages={5}
                />
              </div>

              <Separator />

              {/* Staff Section */}
              <div className="space-y-4">
                <h4 className="text-sm text-[#1a2b4c] flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Profissionais Associados
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm">Maria Silva</p>
                      <p className="text-xs text-gray-500">Cabeleireira</p>
                    </div>
                    <Button size="sm" variant="outline">Editar</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm">João Santos</p>
                      <p className="text-xs text-gray-500">Barbeiro</p>
                    </div>
                    <Button size="sm" variant="outline">Editar</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm">Ana Costa</p>
                      <p className="text-xs text-gray-500">Esteticista</p>
                    </div>
                    <Button size="sm" variant="outline">Editar</Button>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Profissional
                </Button>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={handleCloseEditModal}>
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