'use client';

import { Button } from '@repo/ui';
import { useEffect } from 'react';
import type { Service } from '../../search.types';
import { ServiceCard } from '../service-card';

interface ResultsListProps {
  selectedServiceId: string | null;
  onServiceSelect: (service: Service) => void;
  services?: Service[];
}

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Studio Bella Hair',
    category: 'Salão de Beleza',
    rating: 4.8,
    reviewCount: 124,
    location: 'Vila Madalena, SP',
    price: 'R$ 80-150',
    imageUrl:
      'https://images.unsplash.com/photo-1626383137804-ff908d2753a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGhhaXJ8ZW58MXx8fHwxNzU5MTkyMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1626383137804-ff908d2753a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGhhaXJ8ZW58MXx8fHwxNzU5MTkyMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg2Nzd8MHwxfHNlYXJjaHwxfHxjaGFpcnMlMjBpbiUyMGhhaXIJcyUyMHNhbG9ufGVufDF8fHx8MTc1OTI3MzYwNHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc1OTI3MzYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBzaG9wfGVufDF8fHx8fDE3NTkyNzM2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBzYWxvbnxlbnwxfHx8fDE3NTkyNzM2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBjaGFpcnN8ZW58MXx8fHwxNzU5MjczNjA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHNwYWNlfGVufDF8fHx8MTc1OTI3MzYwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjByZWNlcHRpb258ZW58MXx8fHwxNzU5MjczNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'Especialistas em cortes modernos, coloração e tratamentos capilares. Atendimento personalizado em ambiente aconchegante.',
    phone: '(11) 9 8765-4321',
    address: 'Rua Harmonia, 456 - Vila Madalena',
  },
  {
    id: '2',
    name: 'Zen Massage Spa',
    category: 'Spa & Massagem',
    rating: 4.9,
    reviewCount: 89,
    location: 'Jardins, SP',
    price: 'R$ 120-200',
    imageUrl:
      'https://images.unsplash.com/photo-1737352777897-e22953991a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNzYWdlJTIwdGhlcmFweSUyMHNwYXxlbnwxfHx8fDE3NTkxOTIyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1737352777897-e22953991a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNzYWdlJTIwdGhlcmFweSUyMHNwYXxlbnwxfHx8fDE3NTkxOTIyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlfGVufDF8fHx8MTc1OTI3MzYwNHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjByZWxheGF0aW9ufGVufDF8fHx8MTc1OTI3MzYxMnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNzYWdlJTIwdGhlcmFweSUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NTkyNzM2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBhbWJpZW5jZXxlbnwxfHx8fDE3NTkyNzM2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHNwYXxlbnwxfHx8fDE3NTkyNzM2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'Massagens relaxantes e terapêuticas em ambiente tranquilo. Técnicas orientais e ocidentais para seu bem-estar.',
    phone: '(11) 9 7654-3210',
    address: 'Alameda Santos, 789 - Jardins',
  },
  {
    id: '3',
    name: 'Dr. Silva Odontologia',
    category: 'Clínica Odontológica',
    rating: 4.7,
    reviewCount: 156,
    location: 'Moema, SP',
    price: 'R$ 150-400',
    imageUrl:
      'https://images.unsplash.com/photo-1639390159821-1cf308998c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBkZW50aXN0fGVufDF8fHx8MTc1OTE0NDY0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1639390159821-1cf308998c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBkZW50aXN0fGVufDF8fHx8MTc1OTE0NDY0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBvZmZpY2V8ZW58MXx8fHwxNzU5Mjc5NjE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU5MjgwNTY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwb2ZmaWNlJTIwbW9kZXJufGVufDF8fHx8MTc1OTI3MzYxOHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjByb29tfGVufDF8fHx8MTc1OTI3MzYxOXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTkyNzM2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'Tratamentos odontológicos completos com tecnologia de ponta. Especialidades em implantes e ortodontia.',
    phone: '(11) 9 5432-1098',
    address: 'Av. Ibirapuera, 321 - Moema',
  },
  {
    id: '4',
    name: 'Personal Trainer Max',
    category: 'Personal Trainer',
    rating: 4.6,
    reviewCount: 67,
    location: 'Perdizes, SP',
    price: 'R$ 100-180',
    imageUrl:
      'https://images.unsplash.com/photo-1643142313816-0d9c86c49f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMHRyYWluZXIlMjBmaXRuZXNzfGVufDF8fHx8MTc1OTE2NzI0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1643142313816-0d9c86c49f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMHRyYWluZXIlMjBmaXRuZXNzfGVufDF8fHx8MTc1OTE2NzI0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltfGVufDF8fHx8MTc1OTI4MDYxOXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU5MjgwNjIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzU5MjczNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1506629905607-45c3639725bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0fGVufDF8fHx8MTc1OTI3MzYyNHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMHRyYWluaW5nJTIwc2Vzc2lvbnxlbnwxfHx8fDE3NTkyNzM2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'Treinamento personalizado focado em seus objetivos. Especialista em musculação, emagrecimento e condicionamento físico.',
    phone: '(11) 9 3210-9876',
    address: 'Rua Monte Alegre, 654 - Perdizes',
  },
];

export function ResultsList({
  selectedServiceId,
  onServiceSelect,
}: ResultsListProps) {
  // Seleciona automaticamente o primeiro item quando a lista carrega
  useEffect(() => {
    if (!selectedServiceId && mockServices.length > 0) {
      onServiceSelect(mockServices[0]);
    }
  }, [selectedServiceId, onServiceSelect]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {mockServices.length} serviços encontrados
          </h2>
          <p className="text-gray-600 mt-1">
            Profissionais verificados próximos a você
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {mockServices.map((service, index) => (
          <div
            key={service.id}
            className={`animate-in transition-all duration-300 ${
              index === 0
                ? 'delay-0'
                : index === 1
                  ? 'delay-75'
                  : index === 2
                    ? 'delay-150'
                    : 'delay-200'
            }`}
          >
            <ServiceCard
              {...service}
              images={service.images}
              isSelected={selectedServiceId === service.id}
              onClick={() => onServiceSelect(service)}
            />
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Carregar Mais Resultados
      </Button>
    </div>
  );
}
