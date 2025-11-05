'use client';

import { formatBusinessHours } from '@/utils/helpers/business-hours.helper';
import { Badge, Button, Card, Separator } from '@repo/ui';
import { Calendar, Clock, MapPin, Phone, Star } from 'lucide-react';
import type { Service } from '../../search.types';
import { ImageCarousel } from '../image-carousel';

interface ServicePreviewProps {
  service: Service | null;
  onStartBooking?: (service: Service) => void;
}

export function ServicePreview({
  service,
  onStartBooking,
}: ServicePreviewProps) {
  if (!service) {
    return (
      <Card className="p-8 h-fit flex items-center justify-center border-gray-200">
        <div className="text-center text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Selecione um serviço para ver os detalhes</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-fit border-gray-200 shadow-lg pt-0">
      <div className="space-y-6">
        {/* Header com carousel de imagens */}
        <div className="space-y-4">
          <ImageCarousel
            images={service.images}
            alt={service.name}
            className="w-full rounded-b-none!"
            showCounter={service.images.length > 1}
            showFullscreenButton={service.images.length > 1}
            aspectRatio={4 / 2}
          />

          <div className="space-y-2 px-6">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {service.name}
              </h3>
              <Badge className="bg-black text-white">{service.price}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{service.rating}</span>
              </div>
              <span className="text-sm text-gray-500">
                ({service.reviewCount} avaliações)
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Descrição */}
        <div className="space-y-2 px-6">
          <h4 className="font-semibold text-gray-900">Sobre a loja</h4>
          <p className="text-gray-600 leading-relaxed">{service.description}</p>
        </div>

        <Separator />

        {/* Informações de contato */}
        <div className="space-y-3 px-6">
          <h4 className="font-semibold text-gray-900">Informações</h4>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{service.phone}</span>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <span>
                {service.address}, {service.city} - {service.state}
              </span>
              <span>{service.zipCode}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>
                {formatBusinessHours(
                  service.openTime,
                  service.closeTime,
                  service.businessDays,
                )}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Avaliações em destaque */}
        <div className="space-y-3 px-6">
          <h4 className="font-semibold text-gray-900">Avaliações Recentes</h4>

          <div className="space-y-3">
            {service.reviews?.slice(0, 3).map((review) => (
              <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500">Usuário Anônimo</span>
                <p className="text-xs text-gray-600">{review.comment}</p>
              </div>
            ))}

            {!service.reviews?.length && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-xs text-gray-500">
                  Nenhuma avaliação encontrada para esta loja
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="px-6">
          {/* Botão de ação principal */}
          <Button
            className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-xl"
            size="lg"
            onClick={() => onStartBooking?.(service)}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Ver Agenda e Agendar
          </Button>
        </div>
      </div>
    </Card>
  );
}
