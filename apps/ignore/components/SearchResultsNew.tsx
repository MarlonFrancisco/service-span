import { useState } from "react";
import { AirbnbHeader } from "./AirbnbHeader";
import { FiltersModal } from "./FiltersModal";
import { ResultsList } from "./ResultsList";
import { ServicePreview } from "./ServicePreview";
import { AuthModal, UserType } from "./AuthModal";
import { Footer } from "./Footer";

interface Service {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  price: string;
  imageUrl: string;
  images?: string[];
  description: string;
  phone: string;
  address: string;
}

interface SearchResultsProps {
  onBackToHome: () => void;
  onStartBooking: (service: Service) => void;
  onGoToDashboard?: () => void;
  onGoToProfile?: () => void;
  onNavigate: (page: 'terms' | 'privacy' | 'help' | 'contact') => void;
}

export function SearchResultsNew({
  onBackToHome,
  onStartBooking,
  onGoToDashboard,
  onGoToProfile,
  onNavigate,
}: SearchResultsProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleLoginSuccess = (selectedUserType: UserType) => {
    setUserType(selectedUserType);
    setIsLoggedIn(true);

    if (selectedUserType === "provider" && onGoToDashboard) {
      onGoToDashboard();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  const handleSearch = () => {
    // Lógica de busca pode ser implementada aqui
    console.log("Search triggered");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <AirbnbHeader
        onGoToDashboard={onGoToDashboard}
        onGoToProfile={onGoToProfile}
        onSearch={handleSearch}
        showSearchBar={true}
        showFilters={true}
      />

      {/* Modern Layout */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-12 gap-12 min-h-[calc(100vh-180px)]">
          {/* Results Column */}
          <div className="col-span-12 lg:col-span-7">
            <div className="fade-in">
              <ResultsList
                selectedServiceId={selectedService?.id || null}
                onServiceSelect={setSelectedService}
              />
            </div>
          </div>

          {/* Preview Column */}
          <div className="hidden lg:block col-span-5">
            <div className="sticky top-28">
              <div className="slide-up">
                <ServicePreview
                  service={selectedService}
                  onStartBooking={onStartBooking}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <Footer onNavigate={onNavigate} />
    </div>
  );
}