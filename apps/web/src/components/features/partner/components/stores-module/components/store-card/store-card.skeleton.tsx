import { Card, CardContent, CardHeader, Skeleton, useIsMobile } from '@repo/ui';

export const StoreCardSkeleton = () => {
  const isMobile = useIsMobile();

  return (
    <div className="group">
      <Card className="py-0 relative overflow-hidden border border-gray-200">
        {/* Mobile Layout */}
        {isMobile && (
          <div className="lg:hidden">
            {/* Store Image */}
            <div className="relative h-40 sm:h-48 bg-gray-100">
              <Skeleton className="w-full h-full" />

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 flex gap-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                <Skeleton className="h-6 w-12 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </div>

            <CardHeader className="pb-3 pt-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pb-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-9 w-full rounded-md mt-2" />
              </div>
            </CardContent>
          </div>
        )}

        {/* Desktop Layout */}
        {!isMobile && (
          <div className="hidden lg:flex">
            {/* Store Image - Left Side */}
            <div className="relative w-80 shrink-0 bg-gray-100">
              <Skeleton className="w-full min-h-[250px]" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                <Skeleton className="h-6 w-12 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </div>

            {/* Store Content - Right Side */}
            <div className="flex-1 flex flex-col min-w-0 py-3 justify-center h-full">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 shrink-0">
                    <Skeleton className="h-9 w-20 rounded-md" />
                    <Skeleton className="h-9 w-20 rounded-md" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                {/* Contact Info Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Endereço */}
                  <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Skeleton className="h-4 w-4 mt-0.5 shrink-0 rounded" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>

                  {/* Horário */}
                  <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Skeleton className="h-4 w-4 mt-0.5 shrink-0 rounded" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Skeleton className="h-4 w-4 mt-0.5 shrink-0 rounded" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-14" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-9 rounded-md" />
                  <Skeleton className="h-9 w-9 rounded-md" />
                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="h-6 w-20 rounded-md" />
                  <Skeleton className="h-6 w-24 rounded-md" />
                  <Skeleton className="h-6 w-16 rounded-md" />
                  <Skeleton className="h-6 w-28 rounded-md" />
                  <Skeleton className="h-6 w-12 rounded-md" />
                </div>

                {/* Delete Action */}
                <div className="pt-2 border-t border-gray-200">
                  <Skeleton className="h-9 w-32 rounded-md" />
                </div>
              </CardContent>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
