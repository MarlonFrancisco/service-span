import { Plus, Minus, Clock, DollarSign } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // em minutos
  price: number;
}

interface ServiceSelectionProps {
  services: Service[];
  selectedServices: { [key: string]: number };
  onServiceChange: (serviceId: string, quantity: number) => void;
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Corte Masculino",
    description: "Corte moderno com acabamento",
    duration: 45,
    price: 80
  },
  {
    id: "2", 
    name: "Barba",
    description: "Aparar e modelar barba",
    duration: 30,
    price: 50
  },
  {
    id: "3",
    name: "Lavagem + Corte",
    description: "Lavagem completa com corte",
    duration: 60,
    price: 120
  },
  {
    id: "4",
    name: "Tratamento Capilar",
    description: "Hidratação e nutrição dos fios",
    duration: 90,
    price: 180
  }
];

export function ServiceSelection({ selectedServices, onServiceChange }: ServiceSelectionProps) {
  const handleQuantityChange = (serviceId: string, change: number) => {
    const currentQuantity = selectedServices[serviceId] || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    onServiceChange(serviceId, newQuantity);
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Selecione os Serviços</h3>
        <p className="text-gray-600">Escolha um ou mais serviços para sua reserva</p>
      </div>

      <div className="space-y-3">
        {mockServices.map((service) => {
          const quantity = selectedServices[service.id] || 0;
          const isSelected = quantity > 0;

          return (
            <Card 
              key={service.id} 
              className={`p-4 transition-all ${
                isSelected ? 'border-black bg-black/5' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{service.name}</h4>
                    <Badge className="bg-black text-white ml-2">
                      R$ {service.price}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{service.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>R$ {service.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleQuantityChange(service.id, -1)}
                    disabled={quantity === 0}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-8 text-center text-sm">{quantity}</span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleQuantityChange(service.id, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}