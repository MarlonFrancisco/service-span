'use client';

import { AnimatePresence, motion } from 'motion/react';

interface ISearchBarEffectsProps {
  isSearchFocused: boolean;
}

export const GradientBorderEffect = ({ isSearchFocused }: ISearchBarEffectsProps) => {
  return (
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
  );
};

export const ShimmerEffect = ({ isSearchFocused }: ISearchBarEffectsProps) => {
  return (
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
  );
};

export const GlowEffect = ({ isSearchFocused }: ISearchBarEffectsProps) => {
  return (
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
  );
};
