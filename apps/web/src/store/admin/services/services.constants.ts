import type { ICategory, IService } from './services.types';

export const INITIAL_FORM_DATA = {
  name: '',
  description: '',
  duration: '',
  price: '',
  category: '',
  maxBookingsPerDay: '',
  isActive: true,
};

export const INITIAL_CATEGORY_FORM_DATA = {
  name: '',
  description: '',
  color: 'blue',
};

// Mock data - substituir por API
export const MOCK_SERVICES: IService[] = [
  {
    id: '1',
    name: 'Corte Feminino',
    description:
      'Corte de cabelo feminino com acabamento profissional e lavagem incluída',
    duration: 60,
    price: 65,
    category: 'Cabelo',
    isActive: true,
    bookingsThisMonth: 34,
    revenue: 2210,
    maxBookingsPerDay: 8,
    tags: ['Popular', 'Feminino'],
  },
  {
    id: '2',
    name: 'Corte Masculino',
    description: 'Corte de cabelo masculino tradicional com máquina e tesoura',
    duration: 30,
    price: 35,
    category: 'Cabelo',
    isActive: true,
    bookingsThisMonth: 52,
    revenue: 1820,
    maxBookingsPerDay: 12,
    tags: ['Popular', 'Masculino'],
  },
  {
    id: '3',
    name: 'Escova',
    description:
      'Escova modeladora para cabelos médios e longos com finalização',
    duration: 45,
    price: 45,
    category: 'Cabelo',
    isActive: true,
    bookingsThisMonth: 28,
    revenue: 1260,
    maxBookingsPerDay: 10,
  },
  {
    id: '4',
    name: 'Barba',
    description: 'Aparar e modelar barba com navalha e acabamento',
    duration: 30,
    price: 25,
    category: 'Barba',
    isActive: true,
    bookingsThisMonth: 41,
    revenue: 1025,
    maxBookingsPerDay: 15,
    tags: ['Masculino'],
  },
  {
    id: '5',
    name: 'Limpeza de Pele',
    description: 'Limpeza profunda facial completa com extração e máscara',
    duration: 90,
    price: 120,
    category: 'Estética',
    isActive: false,
    bookingsThisMonth: 0,
    revenue: 0,
    maxBookingsPerDay: 4,
  },
];

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
