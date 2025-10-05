import { Footer } from '@/components/layout';
import { Header } from '@/components/layout/header/header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ResultsList, ServicePreview } from './components';
import type { Service } from './types/search.types';

export function SearchResults() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const router = useRouter();

  const handleStartBooking = (service: Service) => {
    // Navegar para a página de booking com o ID do serviço
    router.push(`/booking/${service.id}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Modern Layout */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 rounded-tl-[40px] rounded-tr-[40px] bg-background">
        <div className="grid grid-cols-12 gap-12 min-h-[calc(100vh-180px)] my-32">
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

        <Footer />
      </div>
    </div>
  );
}
