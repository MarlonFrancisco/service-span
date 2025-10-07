import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui';
import { StarRating } from './star-rating';

interface Review {
  name: string;
  avatarUrl: string;
  rating: number;
  text: string;
}

export const ReviewCard = ({ name, avatarUrl, rating, text }: Review) => {
  // Função para pegar as iniciais se a imagem não carregar
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('');

  return (
    <div className="flex items-start space-x-4">
      {/* Avatar do Cliente */}
      <Avatar className="w-12 h-12 mt-1 shrink-0">
        {/*
          IMPORTANTE: Você precisará fornecer paths válidos para as imagens
          ou as iniciais serão usadas.
        */}
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="bg-gray-200 text-gray-700 font-medium">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        {/* Nome e Avaliação */}
        <p className="font-semibold text-base mb-1">{name}</p>
        <StarRating rating={rating} />
        {/* Texto do Review */}
        <p className="mt-2 text-base text-gray-700 leading-relaxed">{text}</p>
      </div>
    </div>
  );
};
