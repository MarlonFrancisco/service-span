import { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface DiscoveryItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  price: string;
  imageUrl: string;
  isFavorite: boolean;
}

interface DiscoverySectionProps {
  title: string;
  items: DiscoveryItem[];
  onItemClick?: (item: DiscoveryItem) => void;
}

export function DiscoverySection({
  title,
  items,
  onItemClick,
}: DiscoverySectionProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  const handleItemClick = (item: DiscoveryItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            className="group cursor-pointer border-0 shadow-none hover:shadow-lg transition-all duration-200"
            onClick={() => handleItemClick(item)}
          >
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <Button
                variant="ghost"
                size="sm"
                className={`absolute top-3 right-3 w-8 h-8 rounded-full p-0 ${
                  favorites.includes(item.id) || item.isFavorite
                    ? 'bg-white text-red-500 hover:bg-white'
                    : 'bg-white/80 text-gray-600 hover:bg-white'
                }`}
                onClick={(e) => toggleFavorite(item.id, e)}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(item.id) || item.isFavorite
                      ? 'fill-current'
                      : ''
                  }`}
                />
              </Button>
            </div>

            <div className="pt-3 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 truncate">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-sm text-gray-500">
                {item.reviewCount} avaliações
              </p>

              <div className="pt-1">
                <span className="font-semibold text-gray-900">
                  {item.price}
                </span>
                <span className="text-gray-600 text-sm"> por sessão</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
