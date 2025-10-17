import { ArrowLeft, CheckCircle2, MapPin, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export type TLocationFieldConfig = {
  value: string;
  isActive: boolean;
  suggestions: string[];
  onChange: (value: string) => void;
  onSelect: (location: string) => void;
  onClear: () => void;
  onToggleActive: () => void;
};

export const LocationField = ({
  value,
  isActive,
  suggestions,
  onChange,
  onSelect,
  onClear,
  onToggleActive,
}: TLocationFieldConfig) => {
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
        className={`w-full p-5 border-2 rounded-2xl text-left transition-all relative ${
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
              <MapPin className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              Onde
            </div>
            {isActive ? (
              <input
                type="text"
                placeholder="Buscar destinos"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
                className="w-full text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none"
              />
            ) : (
              <div className="text-gray-900 truncate">
                {value || 'Buscar destinos'}
              </div>
            )}
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

      {/* Location Suggestions */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 space-y-2"
          >
            {suggestions.length > 0 ? (
              suggestions.map((location, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelect(location)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-left text-sm hover:bg-gray-50 hover:border-gray-900 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-900 flex-1">{location}</span>
                  <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-gray-900 rotate-180 transition-colors" />
                </motion.button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                Nenhuma localização encontrada
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
