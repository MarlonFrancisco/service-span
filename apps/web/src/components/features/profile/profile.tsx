import { Header } from '@/components/layout';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui';
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  ChevronRight,
  Clock,
  Edit3,
  Heart,
  LogOut,
  MapPin,
  MessageCircle,
  MoreVertical,
  Phone,
  Settings,
  Shield,
  Star,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState<
    'bookings' | 'favorites' | 'settings'
  >('bookings');
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data
  const userProfile = {
    name: 'Marcos Almeida',
    email: 'marcos.almeida@email.com',
    phone: '(11) 98765-4321',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    location: 'São Paulo, SP',
    memberSince: 'Janeiro 2024',
    totalBookings: 42,
    upcomingBookings: 2,
    points: 850,
    verified: {
      email: true,
      phone: true,
    },
  };

  const upcomingBookings = [
    {
      id: '1',
      businessName: 'Studio Hair Premium',
      service: 'Corte + Barba',
      professional: 'Carlos Silva',
      date: '2024-10-20',
      time: '14:30',
      duration: '1h 30min',
      price: 85,
      address: 'Rua Augusta, 1234 - Jardins, São Paulo',
      phone: '(11) 3456-7890',
      image:
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop',
      category: 'Beleza',
      status: 'confirmed',
    },
    {
      id: '2',
      businessName: 'Fitness Club Pro',
      service: 'Personal Training',
      professional: 'Ana Santos',
      date: '2024-10-22',
      time: '08:00',
      duration: '1h',
      price: 120,
      address: 'Av. Paulista, 2000 - Bela Vista, São Paulo',
      phone: '(11) 2345-6789',
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      category: 'Fitness',
      status: 'confirmed',
    },
  ];

  const pastBookings = [
    {
      id: '3',
      businessName: 'Spa Relax Premium',
      service: 'Massagem Terapêutica',
      date: '2024-09-15',
      price: 180,
      rating: 5,
      review:
        'Excelente experiência! Ambiente muito tranquilo e profissionais super atenciosos.',
      image:
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop',
    },
    {
      id: '4',
      businessName: 'Clínica Dental Care',
      service: 'Limpeza + Consulta',
      date: '2024-09-01',
      price: 200,
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop',
    },
  ];

  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Studio Hair Premium',
      category: 'Beleza',
      rating: 4.9,
      reviews: 234,
      image:
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop',
      location: 'Jardins, São Paulo',
      price: 'A partir de R$ 80',
      description:
        'Salão de beleza especializado em cortes modernos e tratamentos capilares.',
      distance: '1.2 km',
    },
    {
      id: '2',
      name: 'Fitness Club Pro',
      category: 'Fitness',
      rating: 4.8,
      reviews: 189,
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      location: 'Paulista, São Paulo',
      price: 'A partir de R$ 120',
      description: 'Academia completa com personal trainers qualificados.',
      distance: '2.5 km',
    },
    {
      id: '3',
      name: 'Spa Relax Premium',
      category: 'Bem-estar',
      rating: 5.0,
      reviews: 156,
      image:
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop',
      location: 'Vila Madalena, São Paulo',
      price: 'A partir de R$ 180',
      description:
        'Spa completo com massagens, tratamentos faciais e corporais.',
      distance: '3.8 km',
    },
    {
      id: '4',
      name: 'Clínica Dental Care',
      category: 'Saúde',
      rating: 4.7,
      reviews: 298,
      image:
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop',
      location: 'Pinheiros, São Paulo',
      price: 'A partir de R$ 150',
      description: 'Clínica odontológica com tecnologia de ponta.',
      distance: '1.8 km',
    },
    {
      id: '5',
      name: 'Yoga & Zen Studio',
      category: 'Bem-estar',
      rating: 4.9,
      reviews: 167,
      image:
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
      location: 'Vila Olímpia, São Paulo',
      price: 'A partir de R$ 60',
      description: 'Estúdio de yoga com aulas para todos os níveis.',
      distance: '2.1 km',
    },
    {
      id: '6',
      name: 'Barbearia Clássica',
      category: 'Beleza',
      rating: 4.8,
      reviews: 412,
      image:
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
      location: 'Moema, São Paulo',
      price: 'A partir de R$ 65',
      description: 'Barbearia tradicional com serviços premium.',
      distance: '4.2 km',
    },
  ]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploadingPhoto(true);
      setTimeout(() => {
        setIsUploadingPhoto(false);
        toast.success('Foto atualizada com sucesso!');
      }, 1500);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    toast.success('Agendamento cancelado com sucesso!');
    setBookingToCancel(null);
  };

  const handleRemoveFavorite = (favoriteId: string) => {
    setFavorites(favorites.filter((f) => f.id !== favoriteId));
    toast.success('Removido dos favoritos');
  };

  const selectedBookingData = upcomingBookings.find(
    (b) => b.id === selectedBooking,
  );
  const bookingToCancelData = upcomingBookings.find(
    (b) => b.id === bookingToCancel,
  );
  const selectedFavoriteData = favorites.find((f) => f.id === selectedFavorite);

  return (
    <Header>
      <div>
        {/* Enhanced Hero Header */}
        <div className="relative border-b border-gray-200 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Left: Avatar & Profile Info */}
                <div className="w-full lg:w-auto">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    {/* Avatar with enhanced upload */}
                    <TooltipProvider>
                      <div className="relative group flex-shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                        <Avatar className="relative w-28 h-28 sm:w-32 sm:h-32 border-4 border-white shadow-2xl ring-1 ring-gray-100">
                          <AvatarImage src={userProfile.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700">
                            MA
                          </AvatarFallback>
                        </Avatar>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isUploadingPhoto}
                              className="absolute bottom-0 right-0 w-11 h-11 bg-gray-900 rounded-full flex items-center justify-center shadow-xl hover:bg-gray-800 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ring-4 ring-white"
                            >
                              {isUploadingPhoto ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Camera className="h-4 w-4 text-white" />
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Alterar foto do perfil</p>
                          </TooltipContent>
                        </Tooltip>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </div>
                    </TooltipProvider>

                    {/* Name & Meta Info */}
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-2 mb-1">
                            <h1 className="text-gray-900">
                              {userProfile.name}
                            </h1>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mb-3 text-gray-600">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5" />
                              <span className="text-sm">
                                {userProfile.location}
                              </span>
                            </div>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm">
                              Membro desde {userProfile.memberSince}
                            </span>
                          </div>

                          {/* Verification badges with animation */}
                          <div className="flex flex-wrap gap-2">
                            {userProfile.verified.email && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-gray-300 transition-all group"
                              >
                                <CheckCircle className="h-3 w-3 text-green-600 group-hover:scale-110 transition-transform" />
                                <span className="text-xs text-gray-700">
                                  Email
                                </span>
                              </motion.div>
                            )}
                            {userProfile.verified.phone && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-gray-300 transition-all group"
                              >
                                <CheckCircle className="h-3 w-3 text-green-600 group-hover:scale-110 transition-transform" />
                                <span className="text-xs text-gray-700">
                                  Telefone
                                </span>
                              </motion.div>
                            )}
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.4 }}
                              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-gray-300 transition-all group"
                            >
                              <Shield className="h-3 w-3 text-blue-600 group-hover:scale-110 transition-transform" />
                              <span className="text-xs text-gray-700">
                                ID Verificado
                              </span>
                            </motion.div>
                          </div>
                        </div>

                        {/* Actions Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-gray-100 flex-shrink-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                              <Edit3 className="h-4 w-4 mr-2" />
                              Editar perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              Configurações
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <LogOut className="h-4 w-4 mr-2" />
                              Sair
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Enhanced Stats Grid */}
                <div className="w-full lg:flex-1">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {/* Total Bookings */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      onClick={() => setActiveTab('bookings')}
                      className="group relative bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition-all text-left overflow-hidden"
                    >
                      <div className="absolute top-3 right-3 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                        <Calendar className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="relative">
                        <motion.div
                          className="text-gray-900 mb-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          {userProfile.totalBookings}
                        </motion.div>
                        <div className="text-gray-600 pr-12">Agendamentos</div>
                      </div>
                    </motion.button>

                    {/* Upcoming */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={() => setActiveTab('bookings')}
                      className="group relative bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition-all text-left overflow-hidden"
                    >
                      <div className="absolute top-3 right-3 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                        <Clock className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="relative">
                        <motion.div
                          className="text-gray-900 mb-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          {upcomingBookings.length}
                        </motion.div>
                        <div className="text-gray-600 pr-12">Próximos</div>
                      </div>
                    </motion.button>

                    {/* Favorites */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => setActiveTab('favorites')}
                      className="group relative bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition-all text-left overflow-hidden"
                    >
                      <div className="absolute top-3 right-3 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                        <Heart className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="relative">
                        <motion.div
                          className="text-gray-900 mb-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          {favorites.length}
                        </motion.div>
                        <div className="text-gray-600 pr-12">Favoritos</div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Tabs with Sliding Indicator */}
          <div className="mb-8">
            <div className="hidden md:block border-b border-gray-200">
              <div className="relative">
                <div className="flex gap-8 px-1">
                  {[
                    {
                      id: 'bookings' as const,
                      label: 'Agendamentos',
                      icon: Calendar,
                      count: upcomingBookings.length,
                    },
                    {
                      id: 'favorites' as const,
                      label: 'Favoritos',
                      icon: Heart,
                      count: favorites.length,
                    },
                    {
                      id: 'settings' as const,
                      label: 'Privacidade',
                      icon: Shield,
                    },
                  ].map((tab, index) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center gap-2.5 px-1 py-4 transition-colors group ${
                          isActive
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        />
                        <span className="whitespace-nowrap">{tab.label}</span>
                        {tab.count !== undefined && tab.count > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full transition-colors ${
                              isActive
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                            }`}
                          >
                            {tab.count}
                          </motion.span>
                        )}

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                            transition={{
                              type: 'spring',
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Tabs (Alternative Design) */}
            <div className="md:hidden mt-4">
              <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl">
                {[
                  {
                    id: 'bookings' as const,
                    label: 'Agendamentos',
                    shortLabel: 'Agenda',
                    icon: Calendar,
                    count: upcomingBookings.length,
                  },
                  {
                    id: 'favorites' as const,
                    label: 'Favoritos',
                    shortLabel: 'Favoritos',
                    icon: Heart,
                    count: favorites.length,
                  },
                  {
                    id: 'settings' as const,
                    label: 'Privacidade',
                    shortLabel: 'Privacidade',
                    icon: Shield,
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg transition-all ${
                        isActive ? 'bg-white shadow-sm' : 'hover:bg-gray-50'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative">
                        <Icon
                          className={`h-5 w-5 transition-colors ${
                            isActive ? 'text-gray-900' : 'text-gray-500'
                          }`}
                        />
                        {tab.count !== undefined && tab.count > 0 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 text-white rounded-full flex items-center justify-center">
                            <span className="text-[10px]">{tab.count}</span>
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-xs transition-colors ${
                          isActive ? 'text-gray-900' : 'text-gray-600'
                        }`}
                      >
                        {tab.shortLabel}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'bookings' && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 pb-12"
              >
                {/* Upcoming - Enhanced Cards */}
                {upcomingBookings.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-gray-900 mb-1">
                          Próximos agendamentos
                        </h3>
                        <p className="text-gray-600">
                          Seus compromissos confirmados
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-gray-300 px-3 py-1"
                      >
                        {upcomingBookings.length}{' '}
                        {upcomingBookings.length === 1
                          ? 'agendamento'
                          : 'agendamentos'}
                      </Badge>
                    </div>
                    <div className="space-y-5">
                      {upcomingBookings.map((booking, index) => {
                        const daysUntil = Math.ceil(
                          (new Date(booking.date).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        );
                        const isToday = daysUntil === 0;
                        const isTomorrow = daysUntil === 1;

                        return (
                          <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                          >
                            <Card className="border-gray-200 overflow-hidden hover:border-gray-300 py-0">
                              <CardContent className="p-0">
                                <div className="flex flex-col lg:flex-row">
                                  {/* Enhanced Image Section */}
                                  <div className="relative lg:w-80 xl:w-96 h-64 lg:h-auto overflow-hidden flex-shrink-0">
                                    <img
                                      src={booking.image}
                                      alt={booking.businessName}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                    {/* Category Badge */}
                                    <Badge className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 border-0 shadow-lg hover:bg-white transition-colors">
                                      {booking.category}
                                    </Badge>
                                  </div>

                                  {/* Enhanced Content Section */}
                                  <div className="flex-1 p-6 lg:p-8">
                                    {/* Header with Actions */}
                                    <div className="flex items-start justify-between gap-4 mb-6">
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                                          {booking.businessName}
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                          {booking.service}
                                        </p>

                                        {/* Professional Info */}
                                        <div className="flex items-center gap-2 mb-4">
                                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Users className="h-4 w-4 text-gray-600" />
                                          </div>
                                          <div className="text-sm text-gray-900">
                                            {booking.professional}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Price Tag */}
                                      <div className="ml-4 text-right flex-shrink-0">
                                        <div className="text-xs text-gray-500 mb-1">
                                          Total
                                        </div>
                                        <div className="text-gray-900">
                                          <span className="text-sm">
                                            R$ {booking.price}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Timeline Info Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                      <div className="relative pl-12">
                                        <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                          <Calendar className="h-4 w-4 text-gray-600" />
                                        </div>
                                        <div className="text-xs text-gray-500 mb-1">
                                          Data
                                        </div>
                                        <div className="text-sm text-gray-900">
                                          {new Date(
                                            booking.date,
                                          ).toLocaleDateString('pt-BR', {
                                            weekday: 'short',
                                            day: '2-digit',
                                            month: 'short',
                                          })}
                                        </div>
                                      </div>

                                      <div className="relative pl-12">
                                        <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                          <Clock className="h-4 w-4 text-gray-600" />
                                        </div>
                                        <div className="text-xs text-gray-500 mb-1">
                                          Horário
                                        </div>
                                        <div className="text-sm text-gray-900">
                                          {booking.time} • {booking.duration}
                                        </div>
                                      </div>

                                      <div className="relative pl-12">
                                        <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                          <MapPin className="h-4 w-4 text-gray-600" />
                                        </div>
                                        <div className="text-xs text-gray-500 mb-1">
                                          Local
                                        </div>
                                        <div className="text-sm text-gray-900 line-clamp-1">
                                          {booking.address.split(',')[0]}
                                        </div>
                                      </div>

                                      <div className="relative pl-12">
                                        <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                          <Phone className="h-4 w-4 text-gray-600" />
                                        </div>
                                        <div className="text-xs text-gray-500 mb-1">
                                          Contato
                                        </div>
                                        <div className="text-sm text-gray-900">
                                          {booking.phone}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Actions Bar */}
                                    <div className="flex gap-2 pt-6 border-t border-gray-100">
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          setSelectedBooking(booking.id)
                                        }
                                        className="flex-1 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors group/btn"
                                      >
                                        <span>Ver detalhes</span>
                                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          setBookingToCancel(booking.id)
                                        }
                                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                                      >
                                        <X className="h-4 w-4 mr-2" />
                                        Cancelar
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Past bookings - Enhanced */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-gray-900 mb-1">Histórico</h3>
                      <p className="text-gray-600">
                        Seus agendamentos concluídos
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {pastBookings.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <Card className="border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-500 overflow-hidden py-0">
                          <CardContent className="p-0">
                            {/* Image with overlay */}
                            <div className="relative h-52 overflow-hidden">
                              <img
                                src={booking.image}
                                alt={booking.businessName}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                              {/* Status Badge */}
                              <Badge className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 border-0 shadow-lg">
                                <Check className="h-3 w-3 mr-1" />
                                Concluído
                              </Badge>

                              {/* Rating Badge (if exists) */}
                              {booking.rating && (
                                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg">
                                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                  <span className="text-white">
                                    {booking.rating}.0
                                  </span>
                                </div>
                              )}

                              {/* Quick action on hover */}
                              <div className="absolute inset-x-0 bottom-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <Button
                                  size="sm"
                                  className="w-full bg-white hover:bg-gray-100 text-gray-900 shadow-lg"
                                >
                                  <Calendar className="h-3.5 w-3.5 mr-2" />
                                  Reservar novamente
                                </Button>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-gray-900 mb-1 truncate group-hover:text-gray-700 transition-colors">
                                    {booking.businessName}
                                  </h4>
                                  <p className="text-gray-600 mb-3">
                                    {booking.service}
                                  </p>
                                </div>
                                <div className="ml-3 text-right flex-shrink-0">
                                  <div className="text-sm text-gray-900">
                                    R$ {booking.price}
                                  </div>
                                </div>
                              </div>

                              {/* Star Rating (full display) */}
                              {booking.rating && (
                                <div className="flex items-center gap-1.5 mb-3">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 transition-colors ${
                                        i < booking.rating
                                          ? 'fill-gray-900 text-gray-900'
                                          : 'fill-gray-200 text-gray-200'
                                      }`}
                                    />
                                  ))}
                                </div>
                              )}

                              {/* Review */}
                              {booking.review ? (
                                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                                  "{booking.review}"
                                </p>
                              ) : (
                                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                  <p className="text-gray-600 text-center">
                                    <MessageCircle className="h-4 w-4 inline mr-1.5" />
                                    Avalie este serviço
                                  </p>
                                </div>
                              )}

                              {/* Footer */}
                              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-gray-500">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>
                                    {new Date(booking.date).toLocaleDateString(
                                      'pt-BR',
                                      {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                      },
                                    )}
                                  </span>
                                </div>

                                {!booking.rating && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                                  >
                                    <Star className="h-3.5 w-3.5 mr-1.5" />
                                    Avaliar
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'favorites' && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pb-12"
              >
                {favorites.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-gray-900 mb-3">
                      Nenhum favorito ainda
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Salve seus estabelecimentos favoritos para acessá-los
                      rapidamente
                    </p>
                    <Button className="bg-gray-900 hover:bg-gray-800">
                      Explorar serviços
                    </Button>
                  </div>
                ) : (
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
                              <img
                                src={favorite.image}
                                alt={favorite.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                              {/* Favorite button */}
                              <button
                                onClick={() =>
                                  handleRemoveFavorite(favorite.id)
                                }
                                className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                              >
                                <Heart className="h-4 w-4 fill-current text-red-600" />
                              </button>

                              {/* Rating badge */}
                              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                                <Star className="h-4 w-4 fill-gray-900 text-gray-900" />
                                <span className="text-gray-900">
                                  {favorite.rating}
                                </span>
                                <span className="text-gray-500">
                                  ({favorite.reviews})
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                              <div className="mb-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h4 className="text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                                    {favorite.name}
                                  </h4>
                                  <Badge
                                    variant="outline"
                                    className="border-gray-300 text-gray-600 flex-shrink-0"
                                  >
                                    {favorite.category}
                                  </Badge>
                                </div>
                                <p className="text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                                  {favorite.description}
                                </p>
                              </div>

                              {/* Info */}
                              <div className="space-y-2 mb-5">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                  <span className="truncate">
                                    {favorite.location}
                                  </span>
                                  <span className="text-gray-400">•</span>
                                  <span className="flex-shrink-0">
                                    {favorite.distance}
                                  </span>
                                </div>
                                <div className="text-gray-900">
                                  {favorite.price}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    setSelectedFavorite(favorite.id)
                                  }
                                  className="flex-1 border-gray-300 hover:bg-gray-50"
                                >
                                  Ver mais
                                </Button>
                                <Button
                                  size="sm"
                                  className="flex-1 bg-gray-900 hover:bg-gray-800"
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
                )}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pb-12"
              >
                <Card className="border-gray-200 py-0">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center">
                        <Shield className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 mb-1">
                          Privacidade e dados
                        </h3>
                        <p className="text-gray-600">
                          Gerencie suas informações pessoais
                        </p>
                      </div>
                    </div>

                    <Separator className="mb-8" />

                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-5 hover:bg-red-50 rounded-xl transition-all group border border-transparent hover:border-red-200">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                            <Trash2 className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="text-left">
                            <div className="text-red-600 mb-1">
                              Excluir conta
                            </div>
                            <div className="text-gray-600">
                              Remover permanentemente sua conta e dados
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-red-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                      </button>
                    </div>

                    <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Shield className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-gray-900 mb-2">
                            Seus dados estão seguros
                          </div>
                          <div className="text-gray-700 leading-relaxed">
                            Protegemos suas informações com criptografia de
                            ponta a ponta e nunca as compartilhamos sem sua
                            permissão.
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Favorite Details Modal */}
        <Dialog
          open={!!selectedFavorite}
          onOpenChange={() => setSelectedFavorite(null)}
        >
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                Detalhes do estabelecimento
              </DialogTitle>
            </DialogHeader>
            {selectedFavoriteData && (
              <div className="space-y-6">
                <div className="relative h-64 -mx-6 -mt-6 mb-6">
                  <img
                    src={selectedFavoriteData.image}
                    alt={selectedFavoriteData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white mb-1">
                          {selectedFavoriteData.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-white/90 text-gray-900 border-0">
                            {selectedFavoriteData.category}
                          </Badge>
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-white/90 rounded-full">
                            <Star className="h-3 w-3 fill-gray-900 text-gray-900" />
                            <span className="text-gray-900">
                              {selectedFavoriteData.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleRemoveFavorite(selectedFavoriteData.id)
                        }
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
                      {selectedFavoriteData.description}
                    </p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-500 mb-1">Localização</div>
                      <div className="flex items-center gap-2 text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {selectedFavoriteData.location}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Distância</div>
                      <div className="text-gray-900">
                        {selectedFavoriteData.distance}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="text-gray-500 mb-1">Preço</div>
                    <div className="text-gray-900">
                      {selectedFavoriteData.price}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-gray-500">
                      {selectedFavoriteData.reviews} avaliações
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedFavorite(null)}
                  >
                    Fechar
                  </Button>
                  <Button
                    className="flex-1 bg-gray-900 hover:bg-gray-800"
                    onClick={() => {
                      setSelectedFavorite(null);
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

        {/* Cancel Booking Modal */}
        <Dialog
          open={!!bookingToCancel}
          onOpenChange={() => setBookingToCancel(null)}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                Cancelar agendamento
              </DialogTitle>
            </DialogHeader>
            {bookingToCancelData && (
              <div className="space-y-6">
                {/* Warning Alerts */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-orange-900 mb-1">
                        Tem certeza que deseja cancelar este agendamento?
                      </div>
                      <div className="text-orange-700">
                        Esta ação não poderá ser desfeita.
                      </div>
                    </div>
                  </div>

                  {/* 24h Policy Alert */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-blue-900 mb-1">
                        Política de cancelamento
                      </div>
                      <div className="text-blue-700 leading-relaxed">
                        Cancelamentos devem ser realizados com pelo menos 24
                        horas de antecedência. Cancelamentos tardios podem estar
                        sujeitos a taxas.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex gap-4">
                    <img
                      src={bookingToCancelData.image}
                      alt={bookingToCancelData.businessName}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 mb-1 truncate">
                        {bookingToCancelData.businessName}
                      </h4>
                      <p className="text-gray-600 mb-2">
                        {bookingToCancelData.service}
                      </p>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-3 w-3" />
                        {new Date(bookingToCancelData.date).toLocaleDateString(
                          'pt-BR',
                          {
                            day: 'numeric',
                            month: 'long',
                          },
                        )}{' '}
                        às {bookingToCancelData.time}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-900">
                        R$ {bookingToCancelData.price}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setBookingToCancel(null)}
                  >
                    Manter agendamento
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleCancelBooking(bookingToCancelData.id)}
                  >
                    Cancelar agendamento
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Booking Details Modal */}
        <Dialog
          open={!!selectedBooking}
          onOpenChange={() => setSelectedBooking(null)}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                Detalhes do agendamento
              </DialogTitle>
            </DialogHeader>
            {selectedBookingData && (
              <div className="space-y-6">
                <img
                  src={selectedBookingData.image}
                  alt={selectedBookingData.businessName}
                  className="w-full h-48 object-cover rounded-lg -mx-6 -mt-6 mb-6"
                />
                <div>
                  <h3 className="text-gray-900 mb-1">
                    {selectedBookingData.businessName}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedBookingData.service}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-gray-900">
                          {new Date(
                            selectedBookingData.date,
                          ).toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div className="text-gray-900">
                        {selectedBookingData.time} •{' '}
                        {selectedBookingData.duration}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div className="text-gray-900">
                        {selectedBookingData.address}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div className="text-gray-900">
                        {selectedBookingData.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Profissional</span>
                  <span className="text-gray-900">
                    {selectedBookingData.professional}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Valor total</span>
                  <span className="text-gray-900">
                    R$ {selectedBookingData.price}
                  </span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Header>
  );
};
