'use client';

import useSearchStore from '@/store/search/search.store';
import { Search, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AI_SUGGESTIONS = [
  'Buscar serviços com IA...',
  'Encontre manicure, cabelo e mais...',
  'Descubra serviços próximos...',
  'Busca inteligente de beleza...',
];

export const SearchBar = () => {
  const params = useSearchParams();
  const setIsMobileSearchOpen = useSearchStore(
    (state) => state.setIsMobileSearchOpen,
  );
  const [query, setQuery] = useState(params.get('query') || '');
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const router = useRouter();

  // Rotate placeholder suggestions
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % AI_SUGGESTIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      router.push(`/booking?${new URLSearchParams({ query }).toString()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="w-full relative flex mx-12 max-w-xl">
      {/* Desktop AI-Powered Search */}
      <div className="hidden md:block w-full relative group">
        {/* Animated gradient border effect */}
        <AnimatePresence>
          {isFocused && (
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
            borderColor: isFocused ? 'rgb(167 139 250)' : 'rgb(229 231 235)',
            boxShadow: isFocused
              ? '0 4px 12px -2px rgba(167, 139, 250, 0.15), 0 2px 4px -1px rgba(167, 139, 250, 0.1)'
              : '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          }}
          whileHover={{
            borderColor: isFocused ? 'rgb(167 139 250)' : 'rgb(209 213 219)',
            boxShadow: isFocused
              ? '0 4px 12px -2px rgba(167, 139, 250, 0.15), 0 2px 4px -1px rgba(167, 139, 250, 0.1)'
              : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full relative bg-white rounded-2xl border-2"
        >
          {/* Shimmer effect overlay */}
          <AnimatePresence>
            {isFocused && (
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

          <div className="w-full relative flex items-center gap-3 px-5 py-3">
            {/* Search Icon with animation */}
            <motion.div
              animate={{
                scale: isFocused ? 1.1 : 1,
                color: isFocused ? 'rgb(139 92 246)' : 'rgb(156 163 175)',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Search className="h-5 w-5 flex-shrink-0" />
            </motion.div>

            {/* Input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={AI_SUGGESTIONS[placeholderIndex]}
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm min-w-0"
            />

            {/* AI Badge - Animated */}
            <motion.div
              animate={{
                background: isFocused
                  ? 'linear-gradient(to right, rgb(139 92 246), rgb(147 51 234))'
                  : 'rgb(243 244 246)',
              }}
              whileHover={{
                background: isFocused
                  ? 'linear-gradient(to right, rgb(139 92 246), rgb(147 51 234))'
                  : 'rgb(229 231 235)',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg flex-shrink-0"
              style={{
                boxShadow: isFocused
                  ? '0 2px 4px -1px rgba(139, 92, 246, 0.2)'
                  : 'none',
              }}
            >
              <motion.div
                animate={{
                  scale: isFocused ? [1, 1.2, 1] : 1,
                  rotate: isFocused ? [0, 5, -5, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: isFocused ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles
                  className="h-3.5 w-3.5"
                  style={{
                    color: isFocused ? 'white' : 'rgb(107 114 128)',
                  }}
                />
              </motion.div>
              <motion.span
                animate={{
                  color: isFocused ? 'white' : 'rgb(75 85 99)',
                }}
                className="text-xs font-medium hidden sm:inline"
              >
                IA
              </motion.span>
            </motion.div>
          </div>

          {/* Bottom glow effect when focused */}
          <AnimatePresence>
            {isFocused && (
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

      {/* Mobile Search Button */}
      <div className="md:hidden flex-1 flex-row flex items-center gap-6">
        <button
          onClick={() => setIsMobileSearchOpen(true)}
          className="relative flex w-full bg-white border border-gray-200 rounded-full shadow-sm px-4 py-3 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div className="text-left flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">
                {query ? 'Buscar' : 'Para onde?'}
              </div>
              <div className="text-xs text-gray-500 line-clamp-2">
                {query || 'Qualquer serviço'}
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
