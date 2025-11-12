import { useReviewsStore } from '@/store';
import { Button, Textarea } from '@repo/ui';
import { Send } from 'lucide-react';
import { InteractiveStarRating } from '../interactive-star-rating';
import { useWriteReviewForm } from './write-review-form.hook';

export const WriteReviewForm = () => {
  const {
    rating,
    comment,
    isCreatingReview,
    isFormValid,
    commentLength,
    handleRatingChange,
    handleCommentChange,
    handleSubmit,
    handleCancel,
  } = useWriteReviewForm();

  const businessName = useReviewsStore((state) => state.businessName);

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
        <InteractiveStarRating rating={rating} onChange={handleRatingChange} />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm text-gray-700 mb-2">
          Sua avaliação
        </label>
        <Textarea
          id="comment"
          placeholder="Descreva sua experiência com este estabelecimento..."
          value={comment}
          onChange={handleCommentChange}
          className="min-h-[120px] resize-none border-gray-300 focus:border-black focus:ring-black/20"
        />
        <p className="text-xs text-gray-500 mt-1.5">
          Mínimo de 10 caracteres ({commentLength}/10)
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isCreatingReview}
          className="flex-1 border-gray-300 hover:bg-gray-50"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isCreatingReview || !isFormValid}
          className="flex-1 bg-black hover:bg-gray-800 text-white"
        >
          {isCreatingReview ? (
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
};
