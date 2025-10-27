import type { ICategory } from '@/types/api/service.types';

export const MOCK_CATEGORIES: ICategory[] = [
  {
    id: '1',
    name: 'Cabelo',
    description: 'Serviços de corte e tratamento capilar',
    color: 'purple',
  },
  {
    id: '2',
    name: 'Barba',
    description: 'Serviços de barbear e modelagem',
    color: 'blue',
  },
  {
    id: '3',
    name: 'Estética',
    description: 'Tratamentos faciais e corporais',
    color: 'pink',
  },
  {
    id: '4',
    name: 'Manicure',
    description: 'Cuidados com unhas',
    color: 'red',
  },
  {
    id: '5',
    name: 'Massagem',
    description: 'Terapias e relaxamento',
    color: 'green',
  },
];
