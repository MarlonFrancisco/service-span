'use client';

import { Skeleton } from '@repo/ui';

const SKELETON_ROWS = 4;

export function NotificationsHistorySkeleton({
  rows = SKELETON_ROWS,
}: {
  rows?: number;
}) {
  return (
    <div className="space-y-3 px-4 py-6">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={`notification-skeleton-${index}`}
          className="flex gap-4 rounded-lg bg-white p-4"
        >
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-8" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
