import { ICategory } from '@/types/api/service.types';
import {
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui';
import { ChevronDown, ChevronRight, Folder, Package, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { getColorBgClass, getColorClass } from '../../utils/colors';
import { ServiceCard } from '../service-card';
import { useCategorySection } from './category-section.hook';

export function CategorySection({ category }: { category: ICategory }) {
  const {
    activeCount,
    inactiveCount,
    isEmpty,
    isExpanded,
    onToggleExpanded,
    handleQuickAdd,
  } = useCategorySection({ category });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Collapsible open={isExpanded} onOpenChange={onToggleExpanded}>
        <div
          className={`rounded-lg border border-gray-200 overflow-hidden ${
            isEmpty
              ? 'bg-gray-50/50'
              : getColorBgClass(category.color || 'blue')
          }`}
        >
          <CollapsibleTrigger asChild>
            <div className="w-full px-3 sm:px-4 py-3.5 flex items-center gap-3 hover:bg-white/50 transition-colors group">
              <div className="text-gray-500 group-hover:text-gray-700 transition-colors">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>

              <div
                className={`w-8 h-8 rounded-lg ${getColorClass(category.color || 'blue')} flex items-center justify-center flex-shrink-0 shadow-sm`}
              >
                <Folder className="w-4 h-4" />
              </div>

              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-gray-900 truncate">{category.name}</h3>
                  {isEmpty && (
                    <Badge
                      variant="outline"
                      className="text-xs border-gray-300 text-gray-500"
                    >
                      Vazia
                    </Badge>
                  )}
                </div>

                {!isEmpty && (
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-gray-600">
                      {category.services.length}{' '}
                      {category.services.length === 1 ? 'serviço' : 'serviços'}
                    </span>
                    {activeCount > 0 && (
                      <span className="text-green-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        {activeCount} {activeCount === 1 ? 'ativo' : 'ativos'}
                      </span>
                    )}
                    {inactiveCount > 0 && (
                      <span className="text-gray-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        {inactiveCount}{' '}
                        {inactiveCount === 1 ? 'inativo' : 'inativos'}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAdd();
                  }}
                  className="h-8 px-2.5 text-xs text-gray-700 hover:text-gray-900 hover:bg-white/80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="h-3.5 w-3.5 sm:mr-1.5" />
                  <span className="hidden sm:inline">Adicionar</span>
                </Button>

                {!isEmpty && (
                  <Badge variant="outline" className="text-xs bg-white/50">
                    {category.services.length}
                  </Badge>
                )}
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {isEmpty ? (
              <div className="px-3 sm:px-4 pb-4 pt-2">
                <div className="p-6 bg-white rounded-lg border border-gray-200 border-dashed text-center">
                  <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-3">
                    Nenhum serviço nesta categoria ainda
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleQuickAdd}
                    className="border-gray-300"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1.5" />
                    Adicionar Primeiro Serviço
                  </Button>
                </div>
              </div>
            ) : (
              <div className="px-3 sm:px-4 pb-4 pt-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {category.services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={{ ...service, category }}
                    />
                  ))}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </div>
      </Collapsible>
    </motion.div>
  );
}
