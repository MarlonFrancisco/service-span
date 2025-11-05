'use client';

import { Footer, Header } from '@/components/layout';
import useSearchStore from '@/store/search/search.store';
import { Badge, TextAnimate, useIsMobile } from '@repo/ui';
import { Search, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CTA, Features, Recomendations } from './components';
import { useHomepage } from './homepage.hook';
import { featuredCategories } from './homepage.mock';

export const Homepage = () => {
  const router = useRouter();
  const { searchQuery, setSearchQuery, handleSearch } = useHomepage();
  const isMobile = useIsMobile();
  const setIsMobileSearchOpen = useSearchStore(
    (state) => state.setIsMobileSearchOpen,
  );
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    "Ex: 'salão de beleza perto de mim'",
    "Ex: 'massagem relaxante hoje'",
    "Ex: 'manicure urgente'",
    "Ex: 'cabelereiro com disponibilidade'",
  ];

  // Rotate placeholder suggestions
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

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
              {/* AI Badge with Gradient */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge
                  className="mb-6 text-white px-5 py-2.5 rounded-full border-0"
                  id="service-snap-badge"
                >
                  <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                  Busca Inteligente com IA
                </Badge>
              </motion.div>

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
                className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto"
              >
                Encontre e agende com os melhores profissionais perto de você.
                Simples, rápido e confiável.
              </TextAnimate>

              {/* AI-Powered Search Info */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-500 mb-8 flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-purple-600" />
                Digite naturalmente, nossa IA entende você
              </motion.p>

              {/* Enhanced Search Bar */}
              <div
                className="relative max-w-4xl mx-auto mb-6 slide-up"
                id="service-snap-search-bar"
              >
                {/* Animated gradient border effect */}
                <AnimatePresence>
                  {isSearchFocused && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 0.4, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="absolute -inset-[2px] bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 rounded-2xl blur-sm"
                    >
                      <motion.div
                        animate={{
                          opacity: [0.4, 0.6, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 rounded-2xl"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  animate={{
                    borderColor: isSearchFocused
                      ? 'rgb(167 139 250)'
                      : 'rgb(229 231 235)',
                    boxShadow: isSearchFocused
                      ? '0 4px 12px -2px rgba(167, 139, 250, 0.15), 0 2px 4px -1px rgba(167, 139, 250, 0.1)'
                      : '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                  }}
                  whileHover={{
                    borderColor: isSearchFocused
                      ? 'rgb(167 139 250)'
                      : 'rgb(209 213 219)',
                    boxShadow: isSearchFocused
                      ? '0 4px 12px -2px rgba(167, 139, 250, 0.15), 0 2px 4px -1px rgba(167, 139, 250, 0.1)'
                      : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative bg-white rounded-2xl border-2 p-2"
                >
                  {/* Shimmer effect overlay */}
                  <AnimatePresence>
                    {isSearchFocused && (
                      <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        <motion.div
                          initial={{ x: '-100%' }}
                          animate={{ x: '200%' }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        />
                      </div>
                    )}
                  </AnimatePresence>

                  <div className="relative">
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10">
                        <motion.div
                          animate={{
                            scale: isSearchFocused ? 1.1 : 1,
                            color: isSearchFocused
                              ? 'rgb(139 92 246)'
                              : 'rgb(156 163 175)',
                          }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                          <Search className="h-5 w-5" />
                        </motion.div>
                        <motion.div
                          animate={{
                            opacity: isSearchFocused ? 1 : 0,
                            scale: isSearchFocused ? 1 : 0.8,
                            rotate: isSearchFocused ? [0, 5, -5, 0] : 0,
                            width: isSearchFocused ? 'auto' : 0,
                            marginRight: isSearchFocused ? 4 : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            rotate: {
                              duration: 2,
                              repeat: isSearchFocused ? Infinity : 0,
                              ease: 'easeInOut',
                            },
                          }}
                        >
                          <Sparkles className="h-4 w-4 text-purple-600" />
                        </motion.div>
                      </div>
                      <motion.input
                        animate={{
                          paddingLeft: isSearchFocused ? '4.75rem' : '3.25rem',
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        type="text"
                        placeholder={placeholders[placeholderIndex]}
                        value={searchQuery}
                        onClick={
                          isMobile
                            ? () => setIsMobileSearchOpen(true)
                            : undefined
                        }
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && searchQuery.trim()) {
                            handleSearch();
                          }
                        }}
                        className="border-0 bg-gray-50 h-14 pr-5 outline-none text-base rounded-xl transition-colors focus:ring-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                      />
                    </div>
                  </div>

                  {/* Bottom glow effect when focused */}
                  <AnimatePresence>
                    {isSearchFocused && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0.5 }}
                        animate={{ opacity: 0.6, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0.5 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-violet-300 to-transparent blur-sm"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
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
