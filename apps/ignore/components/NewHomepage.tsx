import { useState } from 'react';
import {
  Search,
  MapPin,
  Clock,
  Star,
  Sparkles,
  TrendingUp,
  Shield,
  Users,
  ArrowRight,
  Calendar,
  Heart,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Footer } from './Footer';
import { Header } from './Header';

// Mock data for popular services
const popularServices = [
  {
    id: '1',
    name: 'Salão Elegance',
    category: 'Salão de Beleza',
    rating: 4.8,
    reviewCount: 127,
    price: 'R$ 80',
    imageUrl:
      'https://images.unsplash.com/photo-1750263160581-d332256293bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMG1vZGVybnxlbnwxfHx8fDE3NTk0MDUxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isFavorite: false,
    nextSlot: 'Hoje 14:30',
  },
  {
    id: '2',
    name: 'Barbearia Classic',
    category: 'Barbearia',
    rating: 4.6,
    reviewCount: 89,
    price: 'R$ 45',
    imageUrl:
      'https://images.unsplash.com/photo-1667539916609-c706d5b7ed65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5MzQ0MTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isFavorite: true,
    nextSlot: 'Amanhã 09:00',
  },
  {
    id: '3',
    name: 'Spa Wellness',
    category: 'Spa',
    rating: 4.9,
    reviewCount: 156,
    price: 'R$ 120',
    imageUrl:
      'https://images.unsplash.com/photo-1737352777897-e22953991a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwdGhlcmFweXxlbnwxfHx8fDE3NTkzMjkxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isFavorite: false,
    nextSlot: 'Seg 10:00',
  },
  {
    id: '4',
    name: 'Nail Studio',
    category: 'Manicure',
    rating: 4.7,
    reviewCount: 94,
    price: 'R$ 35',
    imageUrl:
      'https://images.unsplash.com/photo-1613457492120-4fcfbb7c3a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwc2Fsb24lMjBtYW5pY3VyZXxlbnwxfHx8fDE3NTkzMzUyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isFavorite: false,
    nextSlot: 'Hoje 16:45',
  },
];

const featuredCategories = [
  { name: 'Salão de Beleza', count: '1.2K+', icon: '💄' },
  { name: 'Barbearia', count: '890', icon: '✂️' },
  { name: 'Spa & Massagem', count: '450', icon: '🧘‍♀️' },
  { name: 'Odontologia', count: '320', icon: '🦷' },
  { name: 'Personal Trainer', count: '760', icon: '💪' },
  { name: 'Estética', count: '540', icon: '✨' },
];

const stats = [
  {
    label: 'Agendamentos hoje',
    value: '2.4K',
    icon: Calendar,
    color: 'text-blue-600',
  },
  {
    label: 'Profissionais ativos',
    value: '3.2K',
    icon: Users,
    color: 'text-green-600',
  },
  { label: 'Cidades', value: '150+', icon: MapPin, color: 'text-purple-600' },
  { label: 'Avaliação', value: '4.9', icon: Star, color: 'text-yellow-600' },
];

interface NewHomepageProps {
  onGoToDashboard: () => void;
  onGoToProfile: () => void;
  onSearch: () => void;
  onNavigate: (page: 'terms' | 'privacy' | 'help' | 'contact') => void;
}

export function NewHomepage({
  onGoToDashboard,
  onGoToProfile,
  onSearch,
  onNavigate,
}: NewHomepageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearch = () => {
    onSearch();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onGoToDashboard={onGoToDashboard}
        onGoToProfile={onGoToProfile}
        showSearchToggle={false}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-40">
          <div className="text-center fade-in">
            <Badge className="mb-6 bg-black text-white px-4 py-2 rounded-full border-0">
              <Sparkles className="h-3 w-3 mr-2" />
              Novo: Agendamento por IA
            </Badge>
            <h1 className="text-5xl md:text-7xl font-semibold text-black mb-8 text-balance leading-[1.1]">
              Agende seus
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                serviços favoritos
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto text-balance">
              Encontre e agende com os melhores profissionais perto de você.
              Simples, rápido e confiável.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-4xl mx-auto mb-16 slide-up">
              <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-200 p-2">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                  <div className="md:col-span-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Que serviço você está procurando?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-0 bg-gray-50 h-14 pl-12 text-base rounded-xl focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-4">
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger className="border-0 bg-gray-50 h-14 rounded-xl focus:bg-white transition-colors">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <SelectValue placeholder="Onde você está?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sp">São Paulo, SP</SelectItem>
                        <SelectItem value="rj">Rio de Janeiro, RJ</SelectItem>
                        <SelectItem value="mg">Belo Horizonte, MG</SelectItem>
                        <SelectItem value="rs">Porto Alegre, RS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Button
                      onClick={handleSearch}
                      className="w-full h-14 bg-black hover:bg-gray-800 text-white rounded-xl font-medium transition-all hover:scale-105"
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Buscar
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-in">
              {featuredCategories.map((category, index) => (
                <button
                  key={index}
                  className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {category.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {category.count} opções
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-semibold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-24 px-6 bg-gray-50">
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
            {popularServices.map((service, index) => (
              <Card
                key={service.id}
                className="group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
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

      {/* Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6">
              Por que usar o ServiceSnap?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A plataforma que conecta você aos melhores profissionais com total
              segurança e praticidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-50 rounded-2xl group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Agendamento instantâneo
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Reserve seus horários em segundos, com confirmação automática e
                lembretes inteligentes.
              </p>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-purple-50 rounded-2xl group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Profissionais verificados
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Todos os prestadores passam por verificação rigorosa de
                documentos e qualificações.
              </p>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-50 rounded-2xl group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Qualidade garantida
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sistema de avaliações transparente com feedback real de milhares
                de clientes satisfeitos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-3xl p-12 md:p-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                Conte-nos sobre seu projeto
              </h2>
              <Button
                className="bg-white text-black hover:bg-gray-100 px-6 py-2 text-sm font-medium rounded-full mb-12"
                onClick={handleSearch}
              >
                Diga Olá!
              </Button>
            </div>

            <div className="text-white">
              <h3 className="text-lg font-medium mb-8">Nossos escritórios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                <div>
                  <h4 className="font-medium mb-2">São Paulo</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    1 Centro, Cidade
                    <br />
                    1200, Sudoeste, São Paulo
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Rio de Janeiro</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    04 Lage Ave
                    <br />
                    7740 Barra, Rio de Janeiro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
