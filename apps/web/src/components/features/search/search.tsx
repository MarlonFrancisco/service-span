'use client';
import { Footer } from '@/components/layout';
import { Header } from '@/components/layout/header/header';
import { NotFound } from '@/components/ui';
import { useSearchQuery } from '@/hooks/use-query/use-search-query';
import { cn } from '@repo/ui/index';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResultsList, ServicePreview, StoreDetailsDrawer } from './components';

export function SearchResults() {
  const router = useRouter();
  const params = useSearchParams();
  const { data } = useSearchQuery({
    query: params.get('query')!,
  });

  const hasResults = data && data.length > 0;

  return (
    <Header showSearchBar logoProps={{ className: 'hidden lg:block' }}>
      <div className="max-w-8xl h-full mx-auto px-3 sm:px-6 md:px-8 lg:px-12 py-5">
        <NotFound
          className={cn('hidden', !hasResults && 'flex')}
          icon={Search}
          title="Nenhum resultado encontrado"
          description="Tente novamente com outros termos de busca."
          actionLabel="Voltar para a página inicial"
          onAction={() => router.push('/')}
        />

        <div
          className={cn(
            'grid grid-cols-12 gap-0 lg:gap-12 min-h-[calc(100vh-180px)]',
            !hasResults && 'hidden',
          )}
        >
          {/* Results Column */}
          <div className="col-span-12 lg:col-span-7">
            <div>
              <ResultsList />
            </div>
          </div>

          {/* Preview Column */}
          <div className="hidden lg:block col-span-5">
            <div className="sticky top-28">
              <div className="slide-up">
                <ServicePreview />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {/* Mobile Drawer */}
      <StoreDetailsDrawer />
    </Header>
  );
}
