'use client';

import { Button, Progress, SidebarFooter } from '@repo/ui';
import { Building2, CreditCard, Users } from 'lucide-react';
import { useAdminSidebarFooter } from './admin-sidebar-footer.hook';

interface AdminSidebarFooterProps {
  isCollapsed: boolean;
}

export function AdminSidebarFooter({ isCollapsed }: AdminSidebarFooterProps) {
  const {
    currentPlan,
    storesUsage,
    professionalsUsage,
    isNearLimit,
    handleUpgradeClick,
  } = useAdminSidebarFooter();

  if (!currentPlan) {
    return null;
  }

  if (isCollapsed) {
    return (
      <SidebarFooter className="border-t border-gray-100 p-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center relative">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
        </div>
      </SidebarFooter>
    );
  }

  return (
    <SidebarFooter className="border-t border-gray-100 p-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/60 relative overflow-hidden p-4">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.03),transparent)]" />

        <div className="relative space-y-4">
          {/* Plan Header */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <CreditCard className="h-3.5 w-3.5 text-gray-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {currentPlan.planName}
              </p>
              <p className="text-xs text-gray-500">Plano atual</p>
            </div>
          </div>

          {/* Usage Indicators */}
          <div className="space-y-3">
            {/* Stores Usage */}
            {storesUsage && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-600">Lojas</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {storesUsage.isUnlimited
                      ? `${storesUsage.current}/∞`
                      : `${storesUsage.current}/${storesUsage.limit}`}
                  </span>
                </div>
                {!storesUsage.isUnlimited && (
                  <Progress
                    value={storesUsage.percentage}
                    className={
                      storesUsage.percentage >= 80
                        ? 'h-1.5 [&>div]:bg-amber-500'
                        : 'h-1.5 [&>div]:bg-gray-900'
                    }
                  />
                )}
                {storesUsage.isUnlimited && (
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <div className="h-1.5 flex-1 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-emerald-400 to-emerald-600 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Professionals Usage */}
            {professionalsUsage && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-600">Profissionais</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {professionalsUsage.isUnlimited
                      ? `${professionalsUsage.current}/∞`
                      : `${professionalsUsage.current}/${professionalsUsage.limit}`}
                  </span>
                </div>
                {!professionalsUsage.isUnlimited && (
                  <Progress
                    value={professionalsUsage.percentage}
                    className={
                      professionalsUsage.percentage >= 80
                        ? 'h-1.5 [&>div]:bg-amber-500'
                        : 'h-1.5 [&>div]:bg-gray-900'
                    }
                  />
                )}
                {professionalsUsage.isUnlimited && (
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <div className="h-1.5 flex-1 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-emerald-400 to-emerald-600 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Warning Message */}
          {isNearLimit && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
              <p className="text-xs text-amber-800">
                Você está próximo do limite do seu plano
              </p>
            </div>
          )}

          {/* Upgrade Button */}
          <Button
            size="sm"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white shadow-sm h-9"
            onClick={handleUpgradeClick}
          >
            Fazer upgrade
          </Button>
        </div>
      </div>
    </SidebarFooter>
  );
}
