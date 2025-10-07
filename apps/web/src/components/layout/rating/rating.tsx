'use client';

import { Button, DialogTitle, ScrollArea } from '@repo/ui';
import { TRatingProps } from './rating.types';

import { useRef, useState } from 'react';
import { DrawerDialog } from '../dialog-drawer/dialog-drawer';
import { ReviewBar } from './review-bar';
import { ReviewCard } from './review-card';
import { StarRating } from './star-rating';

const reviewSummary = {
  totalReviews: 1624,
  displayRating: 5,
  ratingDistribution: [
    { stars: 5, percentage: 63 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 6 },
    { stars: 2, percentage: 12 },
    { stars: 1, percentage: 9 },
  ],
};

const customerReviews = [
  {
    name: 'Emily Selman',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'Este é o saco dos meus sonhos. Fui com ele na minha última viagem e consegui encaixar uma quantidade absurda de snacks para as várias longas e famintas viagens.',
  },
  {
    name: 'Hector Gibbons',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    rating: 4,
    text: 'Antes de comprar o Ruck Snack, eu sofria com snacks pulverizados, pedaços de biscoitos, e outras catástrofes de snacks tristes. Agora, posso guardar meus snacks com confiança e estilo!',
  },
  {
    name: 'Mark Edwards',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'Amo como versátil é este saco. Ele pode guardar qualquer coisa, desde biscoitos que vêm em bandejas até biscoitos que vêm em caixas.',
  },
  {
    name: 'Ana Silva',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    text: 'Produto excelente! A qualidade superou minhas expectativas. Uso diariamente e está impecável. Recomendo muito para quem busca durabilidade e praticidade.',
  },
  {
    name: 'Carlos Mendes',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
    rating: 3,
    text: 'Bom produto, mas esperava um pouco mais pela descrição. Atende o básico, mas nada excepcional. O material poderia ser mais resistente.',
  },
  {
    name: 'Juliana Costa',
    avatarUrl: 'https://i.pravatar.cc/150?img=23',
    rating: 5,
    text: 'Simplesmente perfeito! Comprei para presentear e foi um sucesso. A pessoa amou. Entrega rápida e produto exatamente como descrito.',
  },
  {
    name: 'Roberto Alves',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
    rating: 4,
    text: 'Muito bom! Só não dou 5 estrelas porque o preço está um pouco salgado, mas a qualidade compensa. Vale o investimento.',
  },
  {
    name: 'Fernanda Lima',
    avatarUrl: 'https://i.pravatar.cc/150?img=27',
    rating: 2,
    text: 'Infelizmente não atendeu minhas expectativas. O produto chegou com um pequeno defeito e o atendimento demorou para resolver.',
  },
  {
    name: 'Pedro Santos',
    avatarUrl: 'https://i.pravatar.cc/150?img=18',
    rating: 5,
    text: 'Fantástico! Já é a segunda vez que compro. Uso para trabalho e lazer, super versátil. Design moderno e funcional.',
  },
  {
    name: 'Mariana Oliveira',
    avatarUrl: 'https://i.pravatar.cc/150?img=31',
    rating: 4,
    text: 'Gostei bastante! Produto de qualidade e bem acabado. Só achei que poderia ter mais opções de cores disponíveis.',
  },
  {
    name: 'Lucas Ferreira',
    avatarUrl: 'https://i.pravatar.cc/150?img=42',
    rating: 5,
    text: 'Melhor compra que fiz este ano! Uso todos os dias e continua como novo. Material de primeira qualidade e design impecável.',
  },
  {
    name: 'Beatriz Rocha',
    avatarUrl: 'https://i.pravatar.cc/150?img=36',
    rating: 3,
    text: 'É ok. Funciona bem, mas nada de extraordinário. Para o preço, esperava algo mais premium. Mas cumpre o que promete.',
  },
];

export function Rating({ children }: TRatingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  const handleTriggerClick = () => {
    setTimeout(() => {
      setHeight(containerRef.current!.getBoundingClientRect().height || 0);
    }, 0);
  };

  return (
    <DrawerDialog
      trigger={children}
      onTrigger={handleTriggerClick}
      classNames={`max-w-full md:max-w-4xl! md:max-h-[80vh]`}
      containerRef={containerRef}
    >
      <div className="mx-auto w-full px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <DialogTitle className="text-2xl font-bold mb-4">
              Avaliações de Clientes
            </DialogTitle>

            <div className="flex items-center space-x-3 mb-6">
              <StarRating rating={reviewSummary.displayRating} />
              <span className="text-gray-500 text-sm">
                Baseado em **{reviewSummary.totalReviews} avaliações**
              </span>
            </div>

            <div className="space-y-3 mb-8">
              {reviewSummary.ratingDistribution.map((data) => (
                <ReviewBar
                  key={data.stars}
                  stars={data.stars}
                  percentage={data.percentage}
                />
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Compartilhe suas opiniões
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Se você usou este produto, compartilhe suas opiniões com outros
                clientes
              </p>
              <Button
                variant="outline"
                className="px-8 py-2 border-gray-300 hover:bg-gray-50"
              >
                Escrever uma avaliação
              </Button>
            </div>
          </div>

          <ScrollArea style={{ maxHeight: `${height}px` }}>
            <div className="space-y-8 lg:border-l pl-12 pb-16 pr-2">
              {customerReviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  name={review.name}
                  avatarUrl={review.avatarUrl}
                  rating={review.rating}
                  text={review.text}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </DrawerDialog>
  );

  // return (
  //   <Drawer>
  //     <DrawerTrigger asChild>
  //       <Button variant="outline" onClick={handleTriggerClick}>
  //         {children}
  //       </Button>
  //     </DrawerTrigger>
  //     <DrawerContent ref={containerRef}></DrawerContent>
  //   </Drawer>
  // );
}
