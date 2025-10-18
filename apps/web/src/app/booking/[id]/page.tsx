'use client';

import { BookingFlow } from '@/components/features/booking';

export default function BookingPage() {
  // Mock business data - em produção viria de uma API baseada no serviceId
  const mockBusinessData = {
    businessName: 'Salão Elegance',
    businessAddress: 'Rua das Flores, 123 - Jardim Paulista',
    businessPhone: '(11) 99999-9999',
    businessImages: [
      'https://images.unsplash.com/photo-1611211235015-e2e3a7d09e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc1OTc2MDI0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1629881544138-c45fc917eb81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwY2hhaXJzfGVufDF8fHx8MTc1OTc5NDQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk2NzM0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1662519951774-e8f89ea1200a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB0cmVhdG1lbnQlMjByb29tfGVufDF8fHx8MTc1OTczNDU5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1648854735238-da5c2eb316c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwc2Fsb24lMjBtb2Rlcm58ZW58MXx8fHwxNzU5Nzk0NDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1726255294274-831cb82858ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3NTk3OTQ0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1626383137804-ff908d2753a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGhhaXJ8ZW58MXx8fHwxNzU5MTkyMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg2Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGNoYWlyc3xlbnwxfHx8fDE3NTkyNzM2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    businessRating: 4.8,
    businessReviewCount: 127,
    businessCategory: 'Salão de Beleza',
    businessDescription:
      'Salão especializado em tratamentos capilares e estéticos com profissionais altamente qualificados.',
  };

  return <BookingFlow {...mockBusinessData} />;
}
