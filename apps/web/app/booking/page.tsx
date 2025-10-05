'use client';

import { useRouter } from 'next/navigation';
import { SearchResults } from '@/components/features/search';

export default function SearchPage() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleStartBooking = (service: any) => {
    // Navegar para o fluxo de agendamento com dados do serviço
    router.push(
      `/booking/${service.id}?serviceName=${encodeURIComponent(service.name)}&businessName=${encodeURIComponent(service.name)}`,
    );
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  const handleGoToProfile = () => {
    router.push('/profile');
  };

  const handleNavigate = (page: 'terms' | 'privacy' | 'help' | 'contact') => {
    router.push(`/${page}`);
  };

  return (
    <SearchResults
      onBackToHome={handleBackToHome}
      onStartBooking={handleStartBooking}
      onGoToDashboard={handleGoToDashboard}
      onGoToProfile={handleGoToProfile}
      onNavigate={handleNavigate}
    />
  );
}
