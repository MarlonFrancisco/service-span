import { useStoresQuery } from '@/hooks/use-query/use-stores-query/use-stores-query.hook';
import { Card, CardContent } from '@repo/ui';
import { Building2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';

export const StatsCards = () => {
  const { stores } = useStoresQuery({ includeStores: true });

  const totalStores = useMemo(() => stores.length, [stores]);
  const activeStores = useMemo(
    () => stores.filter((s) => s.isActive).length,
    [stores],
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border border-gray-200 bg-white hover:shadow-md transition-shadow">
          <CardContent className="py-0 px-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-3xl sm:text-4xl text-gray-900 mb-0.5">
                  {totalStores}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  Total de Lojas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <Card className="border border-gray-200 bg-white hover:shadow-md transition-shadow">
          <CardContent className="py-0 px-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-1.5 mb-0.5">
                  <p className="text-3xl sm:text-4xl text-gray-900">
                    {activeStores}
                  </p>
                  <p className="text-sm text-gray-500">/{totalStores}</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  Lojas Ativas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
