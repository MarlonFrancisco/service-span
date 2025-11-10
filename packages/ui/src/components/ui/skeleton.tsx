import { cn } from '@repo/ui/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'bg-gray-200 animate-pulse rounded-md dark:bg-gray-800',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
