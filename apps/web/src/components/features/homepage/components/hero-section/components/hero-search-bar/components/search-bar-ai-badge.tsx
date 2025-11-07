'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ISearchBarAIBadgeProps {
  isSearchFocused: boolean;
}

export const SearchBarAIBadge = ({ isSearchFocused }: ISearchBarAIBadgeProps) => {
  return (
    <motion.div
      animate={{
        background: isSearchFocused
          ? 'linear-gradient(to right, rgb(139 92 246), rgb(147 51 234))'
          : 'rgb(243 244 246)',
      }}
      whileHover={{
        background: isSearchFocused
          ? 'linear-gradient(to right, rgb(139 92 246), rgb(147 51 234))'
          : 'rgb(229 231 235)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
      style={{
        boxShadow: isSearchFocused
          ? '0 2px 4px -1px rgba(139, 92, 246, 0.2)'
          : 'none',
      }}
    >
      <motion.div
        animate={{
          scale: isSearchFocused ? [1, 1.2, 1] : 1,
          rotate: isSearchFocused ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isSearchFocused ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        <Sparkles
          className="h-3.5 w-3.5"
          style={{
            color: isSearchFocused ? 'white' : 'rgb(107 114 128)',
          }}
        />
      </motion.div>
      <motion.span
        animate={{
          color: isSearchFocused ? 'white' : 'rgb(75 85 99)',
        }}
        className="text-xs font-medium hidden sm:inline"
      >
        IA
      </motion.span>
    </motion.div>
  );
};
