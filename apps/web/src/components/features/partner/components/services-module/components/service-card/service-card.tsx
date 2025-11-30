'use client';
import { usePartnerStore } from '@/store';
import { IService } from '@/types/api/service.types';
import { formatStorePrice } from '@repo/shared/formatters';
import { Badge, Button, Card, CardContent, useIsMobile } from '@repo/ui';
import { Clock, DollarSign, Edit, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useServiceCard } from './service-card.hook';

export function ServiceCard({ service }: { service: IService }) {
  const isMobile = useIsMobile();
  const { activeStore } = usePartnerStore();
  const { handleEdit, handleDelete, handleToggleStatus } = useServiceCard({
    service,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`border border-gray-200 hover:shadow-md transition-all duration-200 ${
          !service.isActive ? 'opacity-60' : ''
        }`}
      >
        <CardContent className="p-4 sm:p-4">
          {/* Header: Name, Category & Status */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 line-clamp-1 mb-2">
                {service.name}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="border-gray-300 text-xs">
                  {service.category?.name}
                </Badge>
                <Badge
                  className={
                    service.isActive
                      ? 'bg-green-50 text-green-700 border-green-200 text-xs'
                      : 'bg-gray-100 text-gray-600 border-gray-200 text-xs'
                  }
                >
                  {service.isActive ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Description */}
          {service.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {service.description}
            </p>
          )}

          {/* Info Inline */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span>{service.duration}min</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span>
                {formatStorePrice(
                  service.price,
                  activeStore.currency,
                  activeStore.country,
                )}
              </span>
            </div>
          </div>

          {/* Actions - Mobile vs Desktop */}
          {isMobile ? (
            // Mobile: Larger touch-friendly buttons in vertical layout
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={handleEdit}
                  className="h-10 border-gray-300 text-gray-700 hover:bg-gray-50 justify-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="h-10 border-gray-300 text-red-600 hover:bg-red-50 hover:border-red-300 justify-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
              <Button
                variant={service.isActive ? 'outline' : 'default'}
                className={`w-full h-10 ${
                  !service.isActive
                    ? 'bg-gray-900 hover:bg-gray-800 text-white'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={handleToggleStatus}
              >
                {service.isActive ? 'Desativar Serviço' : 'Ativar Serviço'}
              </Button>
            </div>
          ) : (
            // Desktop: Compact horizontal layout
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleEdit}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 px-2"
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDelete}
                className="text-gray-600 hover:text-red-600 hover:bg-red-50 h-8 px-2"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>

              <div className="ml-auto">
                <Button
                  variant={service.isActive ? 'outline' : 'default'}
                  size="sm"
                  className={`h-8 text-xs ${
                    !service.isActive
                      ? 'bg-gray-900 hover:bg-gray-800 text-white'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={handleToggleStatus}
                >
                  {service.isActive ? 'Desativar' : 'Ativar'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
