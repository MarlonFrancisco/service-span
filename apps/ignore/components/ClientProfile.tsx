import { useState } from "react";
import {
  User,
  Star,
  Calendar,
  Settings,
  Camera,
  MapPin,
  CheckCircle,
  Edit,
  Filter,
  Heart,
  Clock,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Header } from "./Header";

interface ClientProfileProps {
  onBack: () => void;
}

type ActiveSection =
  | "about"
  | "favorites"
  | "bookings"
  | "settings";

export function ClientProfile({ onBack }: ClientProfileProps) {
  const [activeSection, setActiveSection] =
    useState<ActiveSection>("about");

  const menuItems = [
    {
      id: "about" as ActiveSection,
      icon: User,
      label: "Sobre Mim",
    },
    {
      id: "favorites" as ActiveSection,
      icon: Star,
      label: "Favoritos",
    },
    {
      id: "bookings" as ActiveSection,
      icon: Calendar,
      label: "Reservas",
    },
    {
      id: "settings" as ActiveSection,
      icon: Settings,
      label: "Configurações da Conta",
    },
  ];

  const mockFavorites = [
    {
      id: "1",
      name: "Salão Elegante",
      rating: 4.9,
      reviewCount: 127,
      address: "Rua das Flores, 123 - Centro",
      imageUrl:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop",
      category: "Beleza",
    },
    {
      id: "2",
      name: "Studio Fitness Pro",
      rating: 4.8,
      reviewCount: 89,
      address: "Av. Principal, 456 - Zona Sul",
      imageUrl:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      category: "Fitness",
    },
    {
      id: "3",
      name: "Clínica Dental Premium",
      rating: 5.0,
      reviewCount: 45,
      address: "Rua da Saúde, 789 - Bairro Nobre",
      imageUrl:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&h=200&fit=crop",
      category: "Saúde",
    },
  ];

  const mockBookings = [
    {
      id: "1",
      businessName: "Salão Elegante",
      service: "Corte + Escova",
      date: "2024-10-15",
      time: "14:30",
      price: 85,
      status: "confirmed",
      isPast: false,
    },
    {
      id: "2",
      businessName: "Studio Fitness Pro",
      service: "Personal Training",
      date: "2024-10-20",
      time: "08:00",
      price: 120,
      status: "confirmed",
      isPast: false,
    },
    {
      id: "3",
      businessName: "Spa Relax",
      service: "Massagem Relaxante",
      date: "2024-09-28",
      time: "16:00",
      price: 150,
      status: "completed",
      isPast: true,
    },
    {
      id: "4",
      businessName: "Clínica Dental Premium",
      service: "Limpeza + Consulta",
      date: "2024-09-15",
      time: "10:30",
      price: 200,
      status: "completed",
      isPast: true,
    },
  ];

  const futureBookings = mockBookings.filter(
    (booking) => !booking.isPast,
  );
  const pastBookings = mockBookings.filter(
    (booking) => booking.isPast,
  );

  const renderAboutSection = () => (
    <div className="space-y-12">
      {/* Profile Header */}
      <div className="text-center space-y-6">
        <div className="relative inline-block">
          <Avatar className="w-32 h-32">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" />
            <AvatarFallback className="text-3xl bg-[#1a2b4c] text-white">
              MA
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl">Olá, eu sou o Marcos</h1>
          <p className="text-gray-600">Membro desde 2024</p>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-3 gap-8 text-center">
        <div className="space-y-2">
          <div className="text-2xl">4.9</div>
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span className="text-sm text-gray-600">
              Avaliação
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl">42</div>
          <div className="text-sm text-gray-600">
            Agendamentos
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl">11</div>
          <div className="text-sm text-gray-600">
            Meses na plataforma
          </div>
        </div>
      </div>

      {/* Verification Badges */}
      <div className="space-y-4">
        <h2 className="text-xl">Confirmado pelo ServiceSnap</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-[#20b2aa]" />
            <span>E-mail</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-[#20b2aa]" />
            <span>Número de telefone</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-[#20b2aa]" />
            <span>Identidade</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-[#20b2aa]" />
            <span>Endereço</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-4">
        <h2 className="text-xl">Sobre o Marcos</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Mora em
                </span>
              </div>
              <p>São Paulo, SP</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Meu trabalho
                </span>
              </div>
              <p>Designer Gráfico</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Fala
                </span>
              </div>
              <p>Português, Inglês, Espanhol</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Membro desde
                </span>
              </div>
              <p>Janeiro de 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFavoritesSection = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Listas de desejos</h1>
          <p className="text-gray-600">
            Empresas e serviços salvos por você
          </p>
        </div>
        <Select defaultValue="recent">
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">
              Mais Recentes
            </SelectItem>
            <SelectItem value="nearest">
              Mais Próximos
            </SelectItem>
            <SelectItem value="rating">
              Melhor Avaliação
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFavorites.map((favorite) => (
          <Card
            key={favorite.id}
            className="border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <CardContent className="p-0">
              <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                <img
                  src={favorite.imageUrl}
                  alt={favorite.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <Button
                  size="sm"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white p-0 text-red-500 shadow-sm"
                  variant="ghost"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </Button>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="font-medium">
                        {favorite.rating}
                      </span>
                      <span className="text-gray-500">
                        ({favorite.reviewCount})
                      </span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900">
                    {favorite.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {favorite.address}
                  </p>
                  <Badge
                    variant="secondary"
                    className="text-xs mt-2"
                  >
                    {favorite.category}
                  </Badge>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-[#1a2b4c] hover:bg-[#1a2b4c]/90"
                  >
                    Ver Agenda
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
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
  );

  const renderBookingsSection = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl mb-2">Reservas</h1>
        <p className="text-gray-600">
          Acompanhe suas reservas futuras e passadas
        </p>
      </div>

      {/* Future Bookings */}
      {futureBookings.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl">
            Reservas futuras ({futureBookings.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureBookings.map((booking) => (
              <Card
                key={booking.id}
                className="border border-gray-200 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#20b2aa]/10 to-[#1a2b4c]/10 rounded-t-lg flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-[#20b2aa]" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-medium text-lg">
                        {booking.businessName}
                      </h3>
                      <p className="text-gray-600">
                        {booking.service}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(
                          booking.date,
                        ).toLocaleDateString("pt-BR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        às {booking.time}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#20b2aa]/10 text-[#20b2aa] border-[#20b2aa]/20">
                        Confirmado
                      </Badge>
                      <p className="font-medium">
                        R$ {booking.price}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        Reagendar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Past Bookings */}
      <div className="space-y-6">
        <h2 className="text-xl">
          Onde você já esteve ({pastBookings.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastBookings.map((booking) => (
            <Card
              key={booking.id}
              className="border border-gray-200 hover:shadow-md transition-shadow"
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                  <Clock className="w-12 h-12 text-gray-400" />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-medium">
                      {booking.businessName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {booking.service}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(
                        booking.date,
                      ).toLocaleDateString("pt-BR", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="text-xs"
                    >
                      Concluído
                    </Badge>
                    <p className="text-sm font-medium">
                      R$ {booking.price}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-[#1a2b4c] hover:bg-[#1a2b4c]/90 text-xs"
                    >
                      Avaliar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                    >
                      Reagendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl mb-2">
          Configurações da conta
        </h1>
        <p className="text-gray-600">
          Gerencie suas preferências e configurações
        </p>
      </div>

      <div className="space-y-8">
        {/* Notifications */}
        <div>
          <h2 className="text-xl mb-6">Notificações</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base">
                    Lembretes de agendamento
                  </h3>
                  <p className="text-sm text-gray-600">
                    Receba notificações antes dos seus
                    agendamentos
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base">
                    Promoções e ofertas
                  </h3>
                  <p className="text-sm text-gray-600">
                    Receba e-mails sobre promoções especiais
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div>
          <h2 className="text-xl mb-6">Privacidade</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base">Desativar conta</h3>
                  <p className="text-sm text-gray-600">
                    Desativar temporariamente sua conta
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Desativar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "about":
        return renderAboutSection();
      case "favorites":
        return renderFavoritesSection();
      case "bookings":
        return renderBookingsSection();
      case "settings":
        return renderSettingsSection();
      default:
        return renderAboutSection();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onGoToDashboard={() => {}} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}