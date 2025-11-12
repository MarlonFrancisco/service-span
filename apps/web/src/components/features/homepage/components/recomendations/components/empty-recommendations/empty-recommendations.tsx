import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@repo/ui';
import { Search } from 'lucide-react';

export const EmptyRecommendations = () => {
  return (
    <div className="flex flex-col gap-20 mb-10">
      <section className="px-4 w-full max-w-7xl md:px-6 mx-auto">
        <Empty className="py-16 border-0">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="size-16 mb-4">
              <Search className="size-8" />
            </EmptyMedia>
            <EmptyTitle>Nenhuma recomendação disponível</EmptyTitle>
            <EmptyDescription>
              Não encontramos serviços populares no momento. Tente explorar
              nossas categorias ou volte mais tarde.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              variant="outline"
              onClick={() => {
                const categoriesSection =
                  document.getElementById('categories-grid');
                categoriesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explorar categorias
            </Button>
          </EmptyContent>
        </Empty>
      </section>
    </div>
  );
};
