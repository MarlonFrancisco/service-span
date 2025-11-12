import {
  ICreateReviewPayload,
  ReviewsService,
} from '@/service/reviews/reviews.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useReviewsMutations = () => {
  const { mutate: createReview, isPending: isCreatingReview } = useMutation({
    mutationFn: async (payload: ICreateReviewPayload) =>
      ReviewsService.create(payload),
    onSuccess: () => {
      toast.success('Avaliação enviada com sucesso!', {
        description: 'Obrigado por compartilhar sua opinião.',
      });
    },
    onError: () => {
      toast.error('Erro ao enviar avaliação');
    },
  });

  return {
    createReview,
    isCreatingReview,
  };
};
