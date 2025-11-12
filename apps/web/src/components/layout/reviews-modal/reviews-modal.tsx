'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@repo/ui';
import { ReviewsContent, ReviewsModalSkeleton } from './components';
import { useReviewsModal } from './reviews-modal.hook';

export const ReviewsModal = () => {
  const { isOpen, isMobile, isPendingReviews, businessName, handleOpenChange } =
    useReviewsModal();

  const content = isPendingReviews ? (
    <ReviewsModalSkeleton />
  ) : (
    <ReviewsContent />
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[90vh] p-0 rounded-t-3xl overflow-hidden"
        >
          <SheetTitle className="sr-only">Avaliações de Clientes</SheetTitle>
          <SheetDescription className="sr-only">
            Veja as avaliações e comentários de outros clientes sobre{' '}
            {businessName}
          </SheetDescription>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl! h-[85vh] p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Avaliações de Clientes</DialogTitle>
        <DialogDescription className="sr-only">
          Veja as avaliações e comentários de outros clientes sobre{' '}
          {businessName}
        </DialogDescription>
        {content}
      </DialogContent>
    </Dialog>
  );
};
