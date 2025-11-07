import { Calendar, MapPin, Star, Users } from 'lucide-react';

export const featuredCategories = [
  { name: 'Salão de Beleza', count: '1.2K+', icon: '💄' },
  { name: 'Barbearia', count: '890', icon: '✂️' },
  { name: 'Spa & Massagem', count: '450', icon: '🧘‍♀️' },
  { name: 'Odontologia', count: '320', icon: '🦷' },
  { name: 'Personal Trainer', count: '760', icon: '💪' },
  { name: 'Estética', count: '540', icon: '✨' },
];

export const stats = [
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
