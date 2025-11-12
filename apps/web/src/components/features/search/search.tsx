'use client';
import { Footer } from '@/components/layout';
import { Header } from '@/components/layout/header/header';
import { ResultsList, ServicePreview, StoreDetailsDrawer } from './components';

export function SearchResults() {
  return (
    <Header showSearchBar logoProps={{ className: 'hidden lg:block' }}>
      {/* Modern Layout */}
      <div className="max-w-8xl mx-auto px-3 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-0 lg:gap-12 min-h-[calc(100vh-180px)]">
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

        <Footer />
      </div>

      {/* Mobile Drawer */}
      <StoreDetailsDrawer />
    </Header>
  );
}
