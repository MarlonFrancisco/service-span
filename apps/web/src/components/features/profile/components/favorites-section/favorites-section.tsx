'use client';

import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { NotFound } from '@/components/ui/not-found/not-found';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Separator,
} from '@repo/ui';
import { Heart, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useFavoritesSection } from './favorites-section.hook';

export const FavoritesSection = () => {
  const {
    favorites,
    selectedFavorite,
    setSelectedFavorite,
    handleRemoveFavorite,
    handleSchedule,
  } = useFavoritesSection();

  const router = useRouter();

  if (favorites.length === 0) {
    return (
      <NotFound
        title="Nenhum favorito encontrado"
        description="Você ainda não tem nenhum favorito. Clique no botão abaixo para explorar os estabelecimentos disponíveis."
        actionLabel="Explorar estabelecimentos"
        onAction={() => router.push('/')}
        icon={Heart}
        className="min-h-auto"
      />
    );
  }

  return (
    <>
      <motion.div
        key="favorites"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite, index) => (
            <motion.div
              key={favorite.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <Card className="border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500 py-0">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src={favorite.store.gallery[0]?.url ?? ''}
                      alt={favorite.store.name ?? ''}
                      fill
                      sizes="(min-width: 768px) 300px, 200px"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Favorite button */}
                    <button
                      onClick={() => handleRemoveFavorite(favorite.id)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                    >
                      <Heart className="h-4 w-4 fill-current text-red-600" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                          {favorite.store.name}
                        </h4>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {favorite.store.description}
                      </p>
                    </div>

                    {/* Info */}
                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">
                          {favorite.store.address}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="flex-shrink-0">
                          {favorite.store.city} - {favorite.store.state}
                        </span>
                      </div>
                      <div className="text-gray-900">
                        {favorite.store.telephone}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedFavorite(favorite)}
                        className="flex-1 border-gray-300 hover:bg-gray-50"
                      >
                        Ver mais
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gray-900 hover:bg-gray-800"
                        onClick={() => handleSchedule(favorite)}
                      >
                        Agendar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Favorite Details Modal */}
      <Dialog
        open={!!selectedFavorite}
        onOpenChange={() => setSelectedFavorite(undefined)}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900">
              Detalhes do estabelecimento
            </DialogTitle>
          </DialogHeader>
          {selectedFavorite && (
            <div className="space-y-6">
              <div className="relative h-64 -mx-6 mt-4 mb-6">
                <ImageWithFallback
                  src={selectedFavorite.store.gallery[0]?.url ?? ''}
                  alt={selectedFavorite.store.name ?? ''}
                  fill
                  sizes="(min-width: 768px) 300px, 200px"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white mb-1">
                        {selectedFavorite.store.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleRemoveFavorite(selectedFavorite.id)}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart className="h-5 w-5 fill-current text-red-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-gray-900 mb-2">Sobre</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedFavorite.store.description}
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500 mb-1">Localização</div>
                    <div className="flex items-center gap-2 text-gray-900">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {selectedFavorite.store.address}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Distância</div>
                    <div className="text-gray-900">
                      {selectedFavorite.store.city} -{' '}
                      {selectedFavorite.store.state}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-gray-500 mb-1">Preço</div>
                  <div className="text-gray-900">
                    {selectedFavorite.store.telephone}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-gray-500">
                    {selectedFavorite.store.reviews?.length ?? 0} avaliações
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedFavorite(undefined)}
                >
                  Fechar
                </Button>
                <Button
                  className="flex-1 bg-gray-900 hover:bg-gray-800"
                  onClick={() => {
                    setSelectedFavorite(undefined);
                    toast.success('Redirecionando para agendamento...');
                  }}
                >
                  Agendar agora
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
