import { useServicesStore } from '@/store';
import { Card, CardContent } from '@repo/ui';
import { CheckCircle2, Package } from 'lucide-react';

export function ServicesStats() {
  const { services } = useServicesStore();

  const totalServices = services.length;

  const activeServices = services.filter((s) => s.isActive).length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <Card className="border border-gray-200 bg-white">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl sm:text-3xl text-gray-900 mb-0.5">
                {totalServices}
              </p>
              <p className="text-xs text-gray-600 truncate">
                Total de Serviços
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 bg-white">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5 mb-0.5">
                <p className="text-2xl sm:text-3xl text-gray-900">
                  {activeServices}
                </p>
                <p className="text-sm text-gray-500">/{totalServices}</p>
              </div>
              <p className="text-xs text-gray-600 truncate">Serviços Ativos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
