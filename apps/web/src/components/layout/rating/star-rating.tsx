import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // Número de estrelas preenchidas (1 a 5)
  totalStars?: number; // Total de estrelas, geralmente 5
}

export const StarRating = ({ rating, totalStars = 5 }: StarRatingProps) => {
  return (
    <div className="flex items-center space-x-0.5">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;

        return (
          <Star
            key={index}
            className={
              isFilled
                ? 'w-4 h-4 text-yellow-500 fill-yellow-500'
                : 'w-4 h-4 text-muted-foreground'
            }
          />
        );
      })}
    </div>
  );
};
