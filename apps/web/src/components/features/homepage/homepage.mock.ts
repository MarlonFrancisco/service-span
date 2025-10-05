import { Calendar, MapPin, Star, Users } from 'lucide-react';

export const popularServices = [
  {
    id: '1',
    name: 'Salão Elegance',
    category: 'Salão de Beleza',
    rating: 4.8,
    reviewCount: 127,
    price: 'R$ 80',
    imageUrl:
      'https://images.unsplash.com/photo-1750263160581-d332256293bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMG1vZGVybnxlbnwxfHx8fDE3NTk0MDUxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isFavorite: false,
    nextSlot: 'Hoje 14:30',
  },
  {
    id: '2',
    name: 'Barbearia Classic',
    category: 'Barbearia',
    rating: 4.6,
    reviewCount: 89,
    price: 'R$ 45',
    imageUrl:
      'https://images.unsplash.com/photo-1667539916609-c706d5b7ed65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5MzQ0MTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isFavorite: true,
    nextSlot: 'Amanhã 09:00',
  },
  {
    id: '3',
    name: 'Spa Wellness',
    category: 'Spa',
    rating: 4.9,
    reviewCount: 156,
    price: 'R$ 120',
    imageUrl:
      'https://images.unsplash.com/photo-1737352777897-e22953991a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwdGhlcmFweXxlbnwxfHx8fDE3NTkzMjkxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isFavorite: false,
    nextSlot: 'Seg 10:00',
  },
  {
    id: '4',
    name: 'Nail Studio',
    category: 'Manicure',
    rating: 4.7,
    reviewCount: 94,
    price: 'R$ 35',
    imageUrl:
      'https://images.unsplash.com/photo-1613457492120-4fcfbb7c3a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwc2Fsb24lMjBtYW5pY3VyZXxlbnwxfHx8fDE3NTkzMzUyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isFavorite: false,
    nextSlot: 'Hoje 16:45',
  },
];

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
