'use client';

import useSearchStore from '@/store/search/search.store';
import { formatBusinessHours } from '@/utils/helpers/business-hours.helper';
import { Badge, Button, Card, Separator } from '@repo/ui';
import { Calendar, Clock, MapPin, Phone, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ImageCarousel } from '../image-carousel';

export function ServicePreview() {
  const selectedStore = useSearchStore((state) => state.selectedStore);
  const router = useRouter();

  if (!selectedStore) {
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
            images={selectedStore.images}
            alt={selectedStore.name}
            className="w-full rounded-b-none!"
            showCounter={selectedStore.images.length > 1}
            showFullscreenButton={selectedStore.images.length > 1}
            aspectRatio={4 / 2}
          />

          <div className="space-y-2 px-6">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedStore.name}
              </h3>
              <Badge className="bg-black text-white">
                {selectedStore.price}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{selectedStore.rating}</span>
              </div>
              <span className="text-sm text-gray-500">
                ({selectedStore.reviewCount} avaliações)
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Descrição */}
        <div className="space-y-2 px-6">
          <h4 className="font-semibold text-gray-900">Sobre a loja</h4>
          <p className="text-gray-600 leading-relaxed">
            {selectedStore.description}
          </p>
        </div>

        <Separator />

        {/* Informações de contato */}
        <div className="space-y-3 px-6">
          <h4 className="font-semibold text-gray-900">Informações</h4>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{selectedStore.phone}</span>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <span>
                {selectedStore.address}, {selectedStore.city} -{' '}
                {selectedStore.state}
              </span>
              <span>{selectedStore.zipCode}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>
                {formatBusinessHours(
                  selectedStore.openTime,
                  selectedStore.closeTime,
                  selectedStore.businessDays,
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
            {selectedStore.reviews?.slice(0, 3).map((review) => (
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

            {!selectedStore.reviews?.length && (
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
            onClick={() => router.push(`/booking/${selectedStore.id}`)}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Ver Agenda e Agendar
          </Button>
        </div>
      </div>
    </Card>
  );
}
