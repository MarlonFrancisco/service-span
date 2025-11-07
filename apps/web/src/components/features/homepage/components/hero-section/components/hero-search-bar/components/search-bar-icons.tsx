'use client';

import { Search, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ISearchBarIconsProps {
  isSearchFocused: boolean;
}

export const SearchBarIcons = ({ isSearchFocused }: ISearchBarIconsProps) => {
  return (
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
  );
};
