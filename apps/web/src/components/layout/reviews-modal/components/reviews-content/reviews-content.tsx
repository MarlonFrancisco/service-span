import { Button, Separator } from '@repo/ui';
import { RatingBar } from '../rating-bar';
import { ReviewCard } from '../review-card';
import { StarRating } from '../star-rating';
import { WriteReviewForm } from '../write-review-form';
import { useReviewsContent } from './reviews-content.hook';

export const ReviewsContent = () => {
  const {
    reviews,
    showWriteReview,
    averageRating,
    totalReviews,
    ratingDistribution,
    handleShowWriteReview,
  } = useReviewsContent();

  if (!reviews) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 flex-shrink-0">
        <div>
          <h2 className="text-xl md:text-2xl text-gray-900 mb-1">
            Avaliações de Clientes
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <StarRating rating={averageRating} size="small" />
            <span>
              Baseado em <strong>{totalReviews} avaliações</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {showWriteReview ? (
            <WriteReviewForm />
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
                {/* Left Column - Rating Distribution */}
                <div>
                  <h3 className="text-sm text-gray-600 mb-4">
                    Distribuição de Avaliações
                  </h3>
                  <div className="space-y-2.5">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <RatingBar
                        key={rating}
                        rating={rating}
                        percentage={
                          ratingDistribution[
                            rating as keyof typeof ratingDistribution
                          ] ?? 0
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Right Column - CTA */}
                <div className="md:pl-4">
                  <h3 className="text-sm text-gray-600 mb-3">
                    Compartilhe suas opiniões
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Se você usou este estabelecimento, compartilhe suas opiniões
                    com outros clientes
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleShowWriteReview}
                    className="w-full md:w-auto border-gray-300 hover:bg-gray-50"
                  >
                    Escrever uma avaliação
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Reviews List */}
              <div>
                <h3 className="text-sm text-gray-600 mb-4">
                  Avaliações Recentes
                </h3>
                <div className="divide-y divide-gray-200">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
