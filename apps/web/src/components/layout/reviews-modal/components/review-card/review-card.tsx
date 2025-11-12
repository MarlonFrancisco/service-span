import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui';
import { StarRating } from '../star-rating';
import type { TReviewCardConfig } from './review-card.types';

export const ReviewCard = ({ review }: TReviewCardConfig) => {
  return (
    <div className="py-5 first:pt-0">
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_CDN_URL}${review.user.avatar}`}
          />
          <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700">
            {review.user.firstName.charAt(0)}
            {review.user.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="text-gray-900">
              {review.user.firstName} {review.user.lastName}
            </h4>
            <span className="text-xs text-gray-500 flex-shrink-0">
              {new Date(review.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="mb-2.5">
            <StarRating rating={review.rating} size="small" />
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
};
