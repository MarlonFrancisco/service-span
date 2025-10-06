import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui';
import { Clock, DollarSign, Edit, Trash2 } from 'lucide-react';
import type { TServiceCardConfig } from './service-card.types';

export const ServiceCard = ({
  service,
  onEdit,
  onDelete,
  onToggleStatus,
}: TServiceCardConfig) => {
  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-[#1a2b4c] text-base">
              {service.name}
            </CardTitle>
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
              onClick={() => onEdit(service)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(service.id)}
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
          variant={service.isActive ? 'outline' : 'default'}
          size="sm"
          className="w-full"
          onClick={() => onToggleStatus(service.id)}
        >
          {service.isActive ? 'Desativar' : 'Ativar'} Serviço
        </Button>
      </CardContent>
    </Card>
  );
};
