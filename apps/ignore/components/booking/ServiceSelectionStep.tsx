import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { SelectedService } from "../NewBookingFlow";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
}

interface ServiceSelectionStepProps {
  selectedServices: SelectedService[];
  onServicesChange: (services: SelectedService[]) => void;
}

export function ServiceSelectionStep({ selectedServices, onServicesChange }: ServiceSelectionStepProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data - substituir por dados reais
  const mockServices: Service[] = [
    {
      id: '1',
      name: 'Corte de Cabelo Masculino',
      description: 'Corte moderno e estiloso',
      duration: 45,
      price: 45.00,
      category: 'Cabelo'
    },
    {
      id: '2', 
      name: 'Barba Completa',
      description: 'Aparar e modelar a barba',
      duration: 30,
      price: 25.00,
      category: 'Barba'
    },
    {
      id: '3',
      name: 'Sobrancelha',
      description: 'Limpeza e design de sobrancelhas',
      duration: 20,
      price: 15.00,
      category: 'Estética'
    },
    {
      id: '4',
      name: 'Relaxamento',
      description: 'Procedimento químico para alisar',
      duration: 120,
      price: 80.00,
      category: 'Cabelo'
    },
    {
      id: '5',
      name: 'Tratamento Capilar',
      description: 'Hidratação profunda',
      duration: 60,
      price: 35.00,
      category: 'Tratamento'
    },
    {
      id: '6',
      name: 'Escova Progressiva',
      description: 'Alisamento temporário',
      duration: 180,
      price: 120.00,
      category: 'Cabelo'
    }
  ];

  const categories = Array.from(new Set(mockServices.map(service => service.category)));
  const filteredServices = selectedCategory 
    ? mockServices.filter(service => service.category === selectedCategory)
    : mockServices;

  const getServiceQuantity = (serviceId: string) => {
    const service = selectedServices.find(s => s.id === serviceId);
    return service ? service.quantity : 0;
  };

  const isSelected = (serviceId: string) => {
    return getServiceQuantity(serviceId) > 0;
  };

  const handleQuantityChange = (service: Service, newQuantity: number) => {
    const existingServiceIndex = selectedServices.findIndex(s => s.id === service.id);
    
    if (newQuantity <= 0) {
      // Remove service if quantity is 0 or less
      if (existingServiceIndex !== -1) {
        const newServices = selectedServices.filter(s => s.id !== service.id);
        onServicesChange(newServices);
      }
    } else {
      if (existingServiceIndex !== -1) {
        // Update existing service quantity
        const newServices = [...selectedServices];
        newServices[existingServiceIndex] = {
          ...newServices[existingServiceIndex],
          quantity: newQuantity
        };
        onServicesChange(newServices);
      } else {
        // Add new service
        const newService: SelectedService = {
          id: service.id,
          name: service.name,
          duration: service.duration,
          price: service.price,
          category: service.category,
          quantity: newQuantity
        };
        onServicesChange([...selectedServices, newService]);
      }
    }
  };

  const handleServiceToggle = (service: Service) => {
    const currentQuantity = getServiceQuantity(service.id);
    const newQuantity = currentQuantity > 0 ? 0 : 1;
    handleQuantityChange(service, newQuantity);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl text-[#1a2b4c] mb-2">Selecione os serviços</h2>
        <p className="text-gray-600">Escolha um ou mais serviços que deseja agendar</p>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="text-sm text-gray-700">Filtrar por categoria:</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null 
              ? "bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white" 
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }
          >
            Todos
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white" 
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className={`border-2 rounded-lg p-4 transition-all ${
              isSelected(service.id)
                ? 'border-[#20b2aa] bg-[#20b2aa]/5'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-[#1a2b4c]">{service.name}</h4>
                  {isSelected(service.id) && (
                    <div className="w-5 h-5 bg-[#20b2aa] rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    {service.category}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {formatDuration(service.duration)}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg text-[#1a2b4c] mb-1">
                  {formatPrice(service.price)}
                </div>
                
                {isSelected(service.id) ? (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 p-0 border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(service, getServiceQuantity(service.id) - 1);
                      }}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="mx-2 min-w-[24px] text-center text-[#1a2b4c] font-medium">
                      {getServiceQuantity(service.id)}
                    </span>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 p-0 border-[#20b2aa] text-[#20b2aa] hover:bg-[#20b2aa]/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(service, getServiceQuantity(service.id) + 1);
                      }}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceToggle(service);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="bg-[#20b2aa]/10 border border-[#20b2aa]/20 rounded-lg p-4">
          <h4 className="text-[#1a2b4c] mb-2">Serviços selecionados:</h4>
          <div className="space-y-2">
            {selectedServices.map(service => (
              <div key={service.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span>{service.name}</span>
                  {service.quantity > 1 && (
                    <span className="bg-[#20b2aa] text-white px-2 py-0.5 rounded-full text-xs">
                      {service.quantity}x
                    </span>
                  )}
                </div>
                <span className="text-[#1a2b4c]">
                  {formatPrice(service.price * service.quantity)}
                </span>
              </div>
            ))}
            
            {selectedServices.length > 1 && (
              <div className="border-t border-[#20b2aa]/20 pt-2 flex justify-between items-center font-medium">
                <span>Total:</span>
                <span className="text-[#1a2b4c]">
                  {formatPrice(selectedServices.reduce((total, service) => total + (service.price * service.quantity), 0))}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}