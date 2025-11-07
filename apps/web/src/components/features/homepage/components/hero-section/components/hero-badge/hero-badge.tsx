'use client';

import { Badge } from '@repo/ui';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroBadge = () => {
  return (
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
  );
};
