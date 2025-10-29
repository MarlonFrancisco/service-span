import { Badge, Button, TabsContent } from '@repo/ui';
import { Edit, Folder, Tags, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { getColorClass } from '../../../utils/colors';
import { useCategoryList } from './category-list.hook';

export function CategoryList() {
  const { categories, handleEdit, handleDelete } = useCategoryList();

  return (
    <TabsContent value="list" className="p-6 space-y-4 mt-0">
      <div className="space-y-3">
        {categories.map((category) => {
          const serviceCount = category.services.length;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start justify-between p-3.5 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={`w-9 h-9 rounded-lg ${getColorClass(category.color || 'blue')} flex items-center justify-center flex-shrink-0`}
                >
                  <Folder className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-gray-900">{category.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {serviceCount}
                    </Badge>
                  </div>
                  {category.description && (
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(category)}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(category)}
                  disabled={serviceCount > 0}
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 h-8 w-8 p-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <Tags className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">Nenhuma categoria criada</h3>
          <p className="text-gray-600 text-sm">
            Adicione sua primeira categoria na aba ao lado
          </p>
        </div>
      )}
    </TabsContent>
  );
}
