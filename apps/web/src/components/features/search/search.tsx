import { useState } from "react";
import { useRouter } from "next/navigation";
import { AirbnbHeader, ResultsList, ServicePreview, AuthModal, Footer } from "./components";
import type { SearchResultsProps, Service, UserType } from "./types/search.types";

export function SearchResults({
  onGoToDashboard,
  onGoToProfile,
  onNavigate,
}: SearchResultsProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const router = useRouter();

  const handleLoginSuccess = (selectedUserType: UserType) => {
    if (selectedUserType === "provider" && onGoToDashboard) {
      onGoToDashboard();
    }
  };

  const handleSearch = (filters: { location: string; service: string; date: string }) => {
    console.log("Search triggered with filters:", filters);
    // Aqui você pode usar os filtros para realizar a busca
  };

  const handleStartBooking = (service: Service) => {
    // Navegar para a página de booking com o ID do serviço
    router.push(`/booking/${service.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <AirbnbHeader
        onGoToDashboard={onGoToDashboard || (() => {})}
        onGoToProfile={onGoToProfile || (() => {})}
        onSearch={handleSearch}
        showSearchBar={true}
        showFilters={true}
        hasActiveFilters={false}
        onClearFilters={() => {}}
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
                  onStartBooking={handleStartBooking}
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
