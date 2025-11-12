import { Separator, Skeleton } from '@repo/ui';
import { useReviewsModalSkeleton } from './reviews-modal-skeleton.hook';

export function SkeletonRatingBar() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-3.5 w-3.5" />
      <Skeleton className="flex-1 h-2 rounded-full" />
      <Skeleton className="h-4 w-10" />
    </div>
  );
}

export function SkeletonReviewCard() {
  return (
    <div className="py-5 first:pt-0">
      <div className="flex items-start gap-4">
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>

          <Skeleton className="h-4 w-24" />

          <div className="space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReviewsModalSkeleton() {
  const { skeletonItems } = useReviewsModalSkeleton();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 flex-shrink-0">
        <div>
          <Skeleton className="h-7 w-56 mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {/* Left Column - Rating Distribution */}
            <div>
              <Skeleton className="h-4 w-48 mb-4" />
              <div className="space-y-2.5">
                {skeletonItems.ratingBars.map((i) => (
                  <SkeletonRatingBar key={i} />
                ))}
              </div>
            </div>

            {/* Right Column - CTA */}
            <div className="md:pl-4">
              <Skeleton className="h-4 w-48 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-10 w-full md:w-48 rounded-md" />
            </div>
          </div>

          <Separator className="my-6" />

          {/* Reviews List */}
          <div>
            <Skeleton className="h-4 w-40 mb-4" />
            <div className="divide-y divide-gray-200">
              {skeletonItems.reviewCards.map((i) => (
                <SkeletonReviewCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
