import { motion } from 'motion/react';

export type TProgressBarConfig = {
  current: number;
  total: number;
};

export const ProgressBar = ({ current, total }: TProgressBarConfig) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">
          {current === total
            ? 'Pronto para buscar! ✨'
            : `${current} de ${total} campos preenchidos`}
        </span>
        <span className="text-xs font-medium text-gray-700">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"
        />
      </div>
    </div>
  );
};
