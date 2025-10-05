import { useState } from 'react';
import { ArrowLeft, Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { FiltersModal } from './FiltersModal';
import { ResultsList } from './ResultsList';
import { ServicePreview } from './ServicePreview';
import { UserMenuSimple } from './UserMenuSimple';
import { AuthModal, UserType } from './AuthModal';

interface Service {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  price: string;
  imageUrl: string;
  description: string;
  phone: string;
  address: string;
}

interface SearchResultsProps {
  onBackToHome: () => void;
  onStartBooking: (service: Service) => void;
  onGoToDashboard?: () => void;
  onGoToProfile?: () => void;
}

export function SearchResults({
  onBackToHome,
  onStartBooking,
  onGoToDashboard,
  onGoToProfile,
}: SearchResultsProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleLoginSuccess = (selectedUserType: UserType) => {
    setUserType(selectedUserType);
    setIsLoggedIn(true);

    if (selectedUserType === 'provider' && onGoToDashboard) {
      onGoToDashboard();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header com busca */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="mx-auto px-12 py-4">
          <div className="flex justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              className="text-gray-900 hover:bg-gray-100"
            >
              ServiceSnap
            </Button>

            <div className="flex gap-2 flex-1 max-w-2xl">
              <div className="flex-1 w-full relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Cabeleireiro em São Paulo..."
                  defaultValue="Cabeleireiro em São Paulo"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-black focus:ring-black/20 rounded-xl"
                />
              </div>

              <FiltersModal>
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </Button>
              </FiltersModal>
            </div>

            <div className="flex items-center gap-2">
              <UserMenuSimple
                isLoggedIn={isLoggedIn}
                userType={userType}
                onLogin={() => setIsAuthModalOpen(true)}
                onLogout={handleLogout}
                onGoToDashboard={onGoToDashboard}
                onGoToProfile={onGoToProfile}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Layout de duas colunas - inspirado no Airbnb */}
      <div className="mx-auto px-12 py-6">
        <div className="grid grid-cols-12 gap-8 min-h-[calc(100vh-200px)]">
          {/* Coluna Esquerda - Lista de Resultados (60%) */}
          <div className="col-span-7">
            <ResultsList
              selectedServiceId={selectedService?.id || null}
              onServiceSelect={setSelectedService}
            />
          </div>

          {/* Coluna Direita - Pré-visualização (40%) */}
          <div className="col-span-5">
            <div className="sticky top-32">
              <ServicePreview
                service={selectedService}
                onStartBooking={onStartBooking}
              />
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
