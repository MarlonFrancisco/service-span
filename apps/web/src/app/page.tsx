import { Homepage } from '@/components/features/homepage';
import { cn, GridPattern } from '@repo/ui';

export default function HomePage() {
  return (
    <>
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        width={90}
        height={90}
        className={cn(
          '[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12',
        )}
      />
      <Homepage />
    </>
  );
}
