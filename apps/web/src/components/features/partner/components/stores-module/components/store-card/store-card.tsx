import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui';
import {
  Clock,
  Edit,
  Images,
  MapPin,
  Pause,
  Play,
  Settings,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import type { TStoreCardConfig } from './store-card.types';

export const StoreCard = ({
  store,
  onEdit,
  onToggleStatus,
}: TStoreCardConfig) => {
  return (
    <Card className="relative overflow-hidden py-0 pb-6">
      {/* Store Image */}
      <div className="relative h-80 bg-gray-100">
        <Image
          src={store.imageUrl}
          alt={`Foto da ${store.name}`}
          width={200}
          height={100}
          objectFit="contain"
          objectPosition="top"
          className="w-full h-full object-cover"
        />

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(store)}
            className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onToggleStatus(store.id)}
            className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
          >
            {store.status === 'active' ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Image Count */}
        {store.images && store.images.length > 1 && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="text-xs">
              <Images className="h-3 w-3 mr-1" />
              {store.images.length}
            </Badge>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant={store.status === 'active' ? 'default' : 'secondary'}>
            {store.status === 'active' ? 'Ativa' : 'Pausada'}
          </Badge>
        </div>
      </div>

      {/* Store Info */}
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
            <span className="text-sm text-[#1a2b4c]">
              {store.monthlyBookings}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onEdit(store)}
        >
          <Settings className="h-4 w-4 mr-2" />
          Configurações da Loja
        </Button>
      </CardContent>
    </Card>
  );
};
