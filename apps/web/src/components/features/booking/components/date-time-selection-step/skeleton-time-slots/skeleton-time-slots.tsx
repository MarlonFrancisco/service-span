import { Skeleton } from '@repo/ui';

export function SkeletonTimeSlots() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-48" />
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
