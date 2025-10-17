import { Calendar } from '@repo/ui';
import { Calendar as CalendarIcon, CheckCircle2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export type TDateFieldConfig = {
  value?: Date;
  isActive: boolean;
  onSelect: (date: Date | undefined) => void;
  onClear: () => void;
  onToggleActive: () => void;
};

export const DateField = ({
  value,
  isActive,
  onSelect,
  onClear,
  onToggleActive,
}: TDateFieldConfig) => {
  return (
    <motion.div
      initial={false}
      animate={{
        scale: isActive ? 1.02 : 1,
      }}
      className="relative"
    >
      <button
        onClick={onToggleActive}
        className={`w-full p-5 border-2 rounded-2xl text-left transition-all ${
          isActive
            ? 'border-gray-900 bg-white shadow-lg'
            : value
              ? 'border-green-500 bg-white hover:border-green-600 hover:shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
              value ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            {value ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <CalendarIcon className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              Quando
            </div>
            <div className="text-gray-900">
              {value
                ? value.toLocaleDateString('pt-BR', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })
                : 'Adicionar datas'}
            </div>
          </div>
          {value && !isActive && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </button>

      {/* Calendar */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-lg"
          >
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date) => {
                onSelect(date);
                onToggleActive();
              }}
              disabled={(date) => date < new Date()}
              className="rounded-xl w-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
