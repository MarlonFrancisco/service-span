import { useReviews } from '@/store';
import { IReview } from '@/types/reviews.types';
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  Textarea,
  useIsMobile,
} from '@repo/ui';
import { Send, Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function StarRating({
  rating,
  size = 'default',
}: {
  rating: number;
  size?: 'small' | 'default' | 'large';
}) {
  const sizeClasses = {
    small: 'h-3.5 w-3.5',
    default: 'h-4 w-4',
    large: 'h-5 w-5',
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

function InteractiveStarRating({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (rating: number) => void;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded"
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              star <= (hoverRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200 hover:fill-yellow-200 hover:text-yellow-200'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function RatingBar({
  rating,
  percentage,
}: {
  rating: number;
  percentage: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-700 w-4">{rating}</span>
      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-600 w-10 text-right">
        {percentage}%
      </span>
    </div>
  );
}

function ReviewCard({ review }: { review: IReview }) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="py-5 first:pt-0">
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10 flex-shrink-0">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.author}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">
              {getInitials(review.author)}
            </div>
          )}
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="text-gray-900">{review.author}</h4>
            <span className="text-xs text-gray-500 flex-shrink-0">
              {review.date}
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
}

function WriteReviewForm({
  businessName,
  onCancel,
  onSubmitSuccess,
}: {
  businessName: string;
  onCancel: () => void;
  onSubmitSuccess: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Por favor, selecione uma classificação');
      return;
    }

    if (comment.trim().length < 10) {
      toast.error('Por favor, escreva pelo menos 10 caracteres');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Avaliação enviada com sucesso!', {
      description: 'Obrigado por compartilhar sua opinião.',
    });

    setIsSubmitting(false);
    onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h3 className="text-lg text-gray-900 mb-1">Escrever uma avaliação</h3>
        <p className="text-sm text-gray-600">
          Compartilhe sua experiência com {businessName}
        </p>
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Sua classificação
        </label>
        <InteractiveStarRating rating={rating} onChange={setRating} />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm text-gray-700 mb-2">
          Sua avaliação
        </label>
        <Textarea
          id="comment"
          placeholder="Descreva sua experiência com este estabelecimento..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[120px] resize-none border-gray-300 focus:border-black focus:ring-black/20"
        />
        <p className="text-xs text-gray-500 mt-1.5">
          Mínimo de 10 caracteres ({comment.length}/10)
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 border-gray-300 hover:bg-gray-50"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
          className="flex-1 bg-black hover:bg-gray-800 text-white"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Enviando...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Send className="h-4 w-4" />
              <span>Enviar avaliação</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}

function ReviewsContent() {
  const {
    businessName,
    averageRating,
    totalReviews,
    reviews,
    ratingDistribution,
  } = useReviews();
  const [showWriteReview, setShowWriteReview] = useState(false);

  const handleSubmitSuccess = () => {
    setShowWriteReview(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 flex-shrink-0">
        <div>
          <h2 className="text-xl md:text-2xl text-gray-900 mb-1">
            Avaliações de Clientes
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <StarRating rating={Math.round(averageRating)} size="small" />
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
            <WriteReviewForm
              businessName={businessName}
              onCancel={() => setShowWriteReview(false)}
              onSubmitSuccess={handleSubmitSuccess}
            />
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
                          ]
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
                    onClick={() => setShowWriteReview(true)}
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
}

export function ReviewsModal() {
  const { isOpen, businessName, toggleReviewsModalAction } = useReviews();
  const isMobile = useIsMobile();

  // Render Sheet for mobile, Dialog for desktop
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={toggleReviewsModalAction}>
        <SheetContent
          side="bottom"
          className="h-[90vh] p-0 rounded-t-3xl overflow-hidden"
        >
          <SheetTitle className="sr-only">Avaliações de Clientes</SheetTitle>
          <SheetDescription className="sr-only">
            Veja as avaliações e comentários de outros clientes sobre{' '}
            {businessName}
          </SheetDescription>
          <ReviewsContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleReviewsModalAction}>
      <DialogContent className="max-w-4xl h-[85vh] p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Avaliações de Clientes</DialogTitle>
        <DialogDescription className="sr-only">
          Veja as avaliações e comentários de outros clientes sobre{' '}
          {businessName}
        </DialogDescription>
        <ReviewsContent />
      </DialogContent>
    </Dialog>
  );
}
