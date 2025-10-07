'use client';

import { BookingFlow } from '@/components/features/booking';

export default function BookingPage() {
  // Mock business data - em produção viria de uma API baseada no serviceId
  const mockBusinessData = {
    businessName: 'Salão Elegance',
    businessAddress: 'Rua das Flores, 123 - Jardim Paulista',
    businessPhone: '(11) 99999-9999',
    businessImages: [
      'https://images.unsplash.com/photo-1750263160581-d332256293bb?w=400&h=300&fit=crop',
    ],
    businessImageUrl:
      'https://images.unsplash.com/photo-1750263160581-d332256293bb?w=400&h=300&fit=crop',
    businessRating: 4.8,
    businessReviewCount: 127,
    businessCategory: 'Salão de Beleza',
    businessDescription:
      'Salão especializado em tratamentos capilares e estéticos com profissionais altamente qualificados.',
  };

  return <BookingFlow {...mockBusinessData} />;
}
