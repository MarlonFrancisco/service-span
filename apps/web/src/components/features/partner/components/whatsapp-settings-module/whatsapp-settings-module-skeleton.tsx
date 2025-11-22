'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@repo/ui';

export const WhatsappSettingsModuleSkeleton = () => {
  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full max-w-md" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-6">
              {/* Phone Number ID Field Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-3 w-72" />
              </div>

              {/* Business Account ID Field Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-3 w-64" />
              </div>

              {/* Access Token Field Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-3 w-80" />
              </div>

              {/* Webhook Verify Token Field Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-3 w-72" />
              </div>
            </div>

            {/* Button Skeleton */}
            <div className="flex justify-end">
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
