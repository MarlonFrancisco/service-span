'use client';

import { Footer, Header } from '@/components/layout';
import { useSearch } from '@/store';
import {
  Badge,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ShinyButton,
  TextAnimate,
  useIsMobile,
} from '@repo/ui';
import { MapPin, Search, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { CTA, Features, Recomendations } from './components';
import { useHomepage } from './homepage.hook';
import { featuredCategories } from './homepage.mock';

export const Homepage = () => {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    handleSearch,
  } = useHomepage();
  const isMobile = useIsMobile();
  const { setIsMobileSearchOpen } = useSearch();

  const handleCategoryClick = (categoryName: string) => {
    // Navegar para busca com categoria selecionada
    router.push(`/booking?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <Header>
      <motion.div className="pt-12">
        {/* Hero Section */}
        <section className="relative md:mb-10">
          <div className="relative max-w-7xl mx-auto px-6 md:pb-20">
            <div className="text-center fade-in relative">
              <Badge
                className="mb-6 bg-black text-white px-4 py-2 rounded-full border-0"
                id="service-snap-badge"
              >
                <Sparkles className="h-3 w-3 mr-2" />
                Novo: Agendamento por IA
              </Badge>
              <h1
                className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl mb-8"
                id="service-snap-title"
              >
                <TextAnimate animation="slideLeft" by="character">
                  ServiceSnap.
                </TextAnimate>
              </h1>
              <TextAnimate
                animation="slideLeft"
                by="character"
                className="text-lg text-neutral-600 mb-12 max-w-xl mx-auto"
              >
                Encontre e agende com os melhores profissionais perto de você.
                Simples, rápido e confiável.
              </TextAnimate>

              {/* Search Bar */}
              <div
                className="relative max-w-4xl mx-auto mb-16 slide-up"
                id="service-snap-search-bar"
              >
                <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-200 p-2">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                    <div className="md:col-span-6">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Que serviço você está procurando?"
                          value={searchQuery}
                          onClick={
                            isMobile
                              ? () => setIsMobileSearchOpen(true)
                              : undefined
                          }
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="border-0 bg-gray-50 h-14 pl-12 text-base rounded-xl focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                    <div className="hidden md:block col-span-4">
                      <Select
                        value={selectedLocation}
                        onValueChange={setSelectedLocation}
                      >
                        <SelectTrigger
                          className="border-0 bg-gray-50 h-14 rounded-xl focus:bg-white transition-colors w-full"
                          size="lg"
                        >
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <SelectValue placeholder="Onde você está?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sp">São Paulo, SP</SelectItem>
                          <SelectItem value="rj">Rio de Janeiro, RJ</SelectItem>
                          <SelectItem value="mg">Belo Horizonte, MG</SelectItem>
                          <SelectItem value="rs">Porto Alegre, RS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="hidden md:block md:col-span-2">
                      <ShinyButton
                        onClick={handleSearch}
                        className="w-full h-full"
                      >
                        <Search className="h-5 w-5 mr-2" />
                        Buscar
                      </ShinyButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-in"
                id="service-snap-categories"
              >
                {featuredCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category.name)}
                    className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {category.count} opções
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Recomendations />

        <Features />

        <CTA />

        <Footer />
      </motion.div>
    </Header>
  );
};
