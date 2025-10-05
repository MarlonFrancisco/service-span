import { Button, Card, CardContent, Badge } from '@repo/ui';
import { ArrowRight, Heart, Calendar, Star } from 'lucide-react';
import { popularServices } from '../../homepage.mock';

export const Recomendations = () => {
  return (
    <section className="pb-24 px-6" id="service-snap-recomendations">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Populares hoje
            </h2>
            <p className="text-xl text-gray-600">
              Os serviços mais agendados nas últimas 24h
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2 border-gray-300 hover:bg-gray-50"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularServices.map((service) => (
            <Card
              key={service.id}
              className="recommendations-card group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden opacity-0"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/95 text-gray-900 border-0 font-medium">
                      {service.category}
                    </Badge>
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-white/95 rounded-full hover:bg-white transition-colors">
                    <Heart
                      className={`h-4 w-4 ${service.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-1 bg-white/95 px-2 py-1 rounded-lg">
                      <Calendar className="h-3 w-3 text-green-600" />
                      <span className="text-xs font-medium text-green-600">
                        {service.nextSlot}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {service.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({service.reviewCount})
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {service.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      A partir de {service.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-black hover:bg-gray-800 text-white"
                    >
                      Agendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
