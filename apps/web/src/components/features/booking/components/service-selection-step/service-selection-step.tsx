import { Badge, Button } from '@repo/ui';
import { Check, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ISelectedService, IService } from '../../booking.types';

interface ServiceSelectionStepProps {
  selectedServices: ISelectedService[];
  onServicesChange: (services: ISelectedService[]) => void;
}

export function ServiceSelectionStep({
  selectedServices,
  onServicesChange,
}: ServiceSelectionStepProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data - substituir por dados reais
  const mockServices: IService[] = [
    {
      id: '1',
      name: 'Corte de Cabelo Masculino',
      description: 'Corte moderno e estiloso',
      duration: 45,
      price: 45.0,
      category: 'Cabelo',
    },
    {
      id: '2',
      name: 'Barba Completa',
      description: 'Aparar e modelar a barba',
      duration: 30,
      price: 25.0,
      category: 'Barba',
    },
    {
      id: '3',
      name: 'Sobrancelha',
      description: 'Limpeza e design de sobrancelhas',
      duration: 20,
      price: 15.0,
      category: 'Estética',
    },
    {
      id: '4',
      name: 'Relaxamento',
      description: 'Procedimento químico para alisar',
      duration: 120,
      price: 80.0,
      category: 'Cabelo',
    },
    {
      id: '5',
      name: 'Tratamento Capilar',
      description: 'Hidratação profunda',
      duration: 60,
      price: 35.0,
      category: 'Tratamento',
    },
    {
      id: '6',
      name: 'Escova Progressiva',
      description: 'Alisamento temporário',
      duration: 180,
      price: 120.0,
      category: 'Cabelo',
    },
  ];

  const categories = Array.from(
    new Set(mockServices.map((service) => service.category)),
  );
  const filteredServices = selectedCategory
    ? mockServices.filter((service) => service.category === selectedCategory)
    : mockServices;

  const getServiceQuantity = (serviceId: string) => {
    const service = selectedServices.find((s) => s.id === serviceId);
    return service ? service.quantity : 0;
  };

  const isSelected = (serviceId: string) => {
    return getServiceQuantity(serviceId) > 0;
  };

  const handleQuantityChange = (service: IService, newQuantity: number) => {
    const existingServiceIndex = selectedServices.findIndex(
      (s) => s.id === service.id,
    );
    const oldQuantity = getServiceQuantity(service.id);

    if (newQuantity <= 0) {
      // Remove service if quantity is 0 or less
      if (existingServiceIndex !== -1) {
        const newServices = selectedServices.filter((s) => s.id !== service.id);
        onServicesChange(newServices);
        toast.info(`${service.name} removido`);
      }
    } else {
      if (existingServiceIndex !== -1) {
        // Update existing service quantity
        const newServices = [...selectedServices];
        (newServices[existingServiceIndex] as ISelectedService).quantity =
          newQuantity;
        onServicesChange(newServices);

        if (newQuantity > oldQuantity) {
          toast.success(`Quantidade atualizada`);
        }
      } else {
        // Add new service
        const newService: ISelectedService = {
          ...service,
          quantity: newQuantity,
        };
        onServicesChange([...selectedServices, newService]);
        toast.success(`${service.name} adicionado`);
      }
    }
  };

  const handleServiceToggle = (service: IService) => {
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
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}min`
      : `${hours}h`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg sm:text-2xl text-[#1a2b4c] mb-1">
          Selecione os serviços
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Escolha um ou mais serviços que deseja agendar
        </p>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="text-sm text-gray-700">Filtrar por categoria:</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={
              selectedCategory === null
                ? 'bg-black hover:bg-gray-800 text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? 'bg-black hover:bg-gray-800 text-white'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`rounded-lg p-3 sm:p-4 transition-all bg-white cursor-pointer ${
              isSelected(service.id)
                ? 'shadow-md ring-1 ring-black/5'
                : 'shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex flex-col gap-3">
              {/* Header com título e check */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm sm:text-base text-[#1a2b4c]">
                      {service.name}
                    </h4>
                    {isSelected(service.id) && (
                      <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mb-2">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 text-xs"
                    >
                      {service.category}
                    </Badge>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {formatDuration(service.duration)}
                    </span>
                  </div>
                </div>

                {/* Preço - sempre visível */}
                <div className="text-right flex-shrink-0">
                  <div className="text-base sm:text-lg text-[#1a2b4c]">
                    {formatPrice(service.price)}
                  </div>
                </div>
              </div>

              {/* Controles de quantidade - linha separada no mobile */}
              <div className="flex justify-end">
                {isSelected(service.id) ? (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 sm:w-9 sm:h-9 p-0 border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(
                          service,
                          getServiceQuantity(service.id) - 1,
                        );
                      }}
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>

                    <span className="mx-1 sm:mx-2 min-w-[20px] sm:min-w-[24px] text-center text-sm sm:text-base text-[#1a2b4c] font-medium">
                      {getServiceQuantity(service.id)}
                    </span>

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 sm:w-9 sm:h-9 p-0 border-black text-black hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(
                          service,
                          getServiceQuantity(service.id) + 1,
                        );
                      }}
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceToggle(service);
                    }}
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Adicionar
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
