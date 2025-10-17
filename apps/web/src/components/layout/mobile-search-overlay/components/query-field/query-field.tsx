import { ArrowLeft, CheckCircle2, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { TPopularQuery } from '../../mobile-search-overlay.types';

export type TQueryFieldConfig = {
  value: string;
  isActive: boolean;
  suggestions: string[];
  popularQueries: TPopularQuery[];
  onChange: (value: string) => void;
  onSelect: (query: string) => void;
  onClear: () => void;
  onToggleActive: () => void;
};

export const QueryField = ({
  value,
  isActive,
  suggestions,
  popularQueries,
  onChange,
  onSelect,
  onClear,
  onToggleActive,
}: TQueryFieldConfig) => {
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
              <Search className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              O que
            </div>
            {isActive ? (
              <input
                type="text"
                placeholder="Tipo de serviço"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
                className="w-full text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none"
              />
            ) : (
              <div className="text-gray-900 truncate">
                {value || 'Tipo de serviço'}
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

      {/* Service Suggestions */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3"
          >
            {/* Popular Services */}
            {value === '' && (
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-2 px-1 uppercase tracking-wide">
                  Populares
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {popularQueries.map((query, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => onSelect(query.name)}
                      className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-left hover:bg-gray-50 hover:border-gray-900 transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{query.icon}</span>
                        <span className="text-sm text-gray-900">
                          {query.name}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Service Suggestions */}
            <div className="space-y-2">
              {value && (
                <p className="text-xs font-semibold text-gray-500 mb-2 px-1 uppercase tracking-wide">
                  Sugestões
                </p>
              )}
              {suggestions.length > 0
                ? suggestions.map((query, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => onSelect(query)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-left text-sm hover:bg-gray-50 hover:border-gray-900 transition-all flex items-center justify-between group"
                    >
                      <span className="text-gray-900">{query}</span>
                      <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-gray-900 rotate-180 transition-colors" />
                    </motion.button>
                  ))
                : value && (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">
                      Nenhum serviço encontrado
                    </div>
                  )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
