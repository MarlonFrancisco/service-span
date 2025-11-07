'use client';

import { motion } from 'motion/react';
import {
  GradientBorderEffect,
  GlowEffect,
  ShimmerEffect,
} from './components/search-bar-effects';
import { SearchBarAIBadge } from './components/search-bar-ai-badge';
import { SearchBarIcons } from './components/search-bar-icons';
import { SearchBarInput } from './components/search-bar-input';
import { useHeroSearchBar } from './hero-search-bar.hook';

export const HeroSearchBar = () => {
  const {
    isSearchFocused,
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    searchQuery,
    placeholderIndex,
    placeholders,
    handleSearchKeyDown,
    handleSearchInputClick,
  } = useHeroSearchBar();

  return (
    <div
      className="relative max-w-4xl mx-auto mb-6 slide-up"
      id="service-snap-search-bar"
    >
      {/* Animated gradient border effect */}
      <GradientBorderEffect isSearchFocused={isSearchFocused} />

      <motion.div
        animate={{
          borderColor: isSearchFocused
            ? 'rgb(167 139 250)'
            : 'rgb(229 231 235)',
          boxShadow: isSearchFocused
            ? '0 4px 12px -2px rgba(167, 139, 250, 0.15), 0 2px 4px -1px rgba(167, 139, 250, 0.1)'
            : 'none',
        }}
        whileHover={{
          borderColor: isSearchFocused
            ? 'rgb(167 139 250)'
            : 'rgb(209 213 219)',
          boxShadow: isSearchFocused
            ? '0 4px 12px -2px rgba(167, 139, 250, 0.15), 0 2px 4px -1px rgba(167, 139, 250, 0.1)'
            : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative rounded-xl border-2"
      >
        {/* Shimmer effect overlay */}
        <ShimmerEffect isSearchFocused={isSearchFocused} />

        <div className="relative">
          <div className="relative group">
            {/* Search icons */}
            <SearchBarIcons isSearchFocused={isSearchFocused} />

            {/* Input */}
            <SearchBarInput
              placeholder={placeholders[placeholderIndex] || ''}
              value={searchQuery}
              isSearchFocused={isSearchFocused}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleSearchKeyDown}
              onClick={handleSearchInputClick}
            />

            {/* AI Badge */}
            <SearchBarAIBadge isSearchFocused={isSearchFocused} />
          </div>
        </div>

        {/* Bottom glow effect when focused */}
        <GlowEffect isSearchFocused={isSearchFocused} />
      </motion.div>
    </div>
  );
};
