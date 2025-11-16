'use client';

import { useSubscriptionQuery } from '@/hooks/use-query/use-subscription-query';
import { IMySubscription } from '@/types/api/payment.types';
import { Badge, Button, Progress, SidebarFooter } from '@repo/ui';
import { CreditCard, Zap } from 'lucide-react';

interface AdminSidebarFooterProps {
  isCollapsed: boolean;
}

export function AdminSidebarFooter({ isCollapsed }: AdminSidebarFooterProps) {
  if (isCollapsed) {
    return <AdminSidebarFooterCollapsed />;
  }

  return <AdminSidebarFooterExpanded />;
}

function AdminSidebarFooterCollapsed() {
  const { currentPlan } = useSubscriptionQuery();

  if (!currentPlan) {
    return null;
  }

  const isUnlimited = currentPlan.maxSchedules === 0;

  if (isUnlimited) {
    return <AdminSidebarFooterCollapsedUnlimited />;
  }

  return <AdminSidebarFooterCollapsedLimited currentPlan={currentPlan} />;
}

function AdminSidebarFooterCollapsedLimited({
  currentPlan,
}: {
  currentPlan: IMySubscription;
}) {
  const calculatePercentage = (current: number, max: number) => {
    if (max === 0) return 0;
    return Math.min((current / max) * 100, 100);
  };

  const usagePercentage = calculatePercentage(
    currentPlan.schedulesLength,
    currentPlan.maxSchedules,
  );

  return (
    <SidebarFooter className="border-t border-gray-100 p-4">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center relative">
          <CreditCard className="h-4 w-4 text-white" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center border-2 border-white">
            !
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-gray-900 h-1.5 rounded-full"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
      </div>
    </SidebarFooter>
  );
}

function AdminSidebarFooterCollapsedUnlimited() {
  return (
    <SidebarFooter className="border-t border-gray-100 p-4">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-sm">
          <CreditCard className="h-4 w-4 text-white" />
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600">Ilimitado</p>
        </div>
      </div>
    </SidebarFooter>
  );
}

function AdminSidebarFooterExpanded() {
  const { currentPlan } = useSubscriptionQuery();

  if (!currentPlan) {
    return null;
  }

  const isUnlimited = currentPlan.maxSchedules === 0;

  if (isUnlimited) {
    return <AdminSidebarFooterExpandedUnlimited currentPlan={currentPlan} />;
  }

  return <AdminSidebarFooterExpandedLimited currentPlan={currentPlan} />;
}

function AdminSidebarFooterExpandedLimited({
  currentPlan,
}: {
  currentPlan: IMySubscription;
}) {
  const calculatePercentage = (current: number, max: number) => {
    if (max === 0) return 0;
    return Math.min((current / max) * 100, 100);
  };

  const usagePercentage = calculatePercentage(
    currentPlan.schedulesLength,
    currentPlan.maxSchedules,
  );

  return (
    <SidebarFooter className="border-t border-gray-100 p-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/60 relative overflow-hidden p-4">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.03),transparent)]" />

        <div className="relative">
          <div className="flex items-start gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <CreditCard className="h-3.5 w-3.5 text-gray-900" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-900">{currentPlan.planName}</p>
                <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs h-5">
                  {usagePercentage}%
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                {currentPlan.schedulesLength.toLocaleString()} /{' '}
                {currentPlan.maxSchedules.toLocaleString()} agendamentos
              </p>
            </div>
          </div>

          <div className="mb-3">
            <Progress value={usagePercentage} className="h-1.5" />
          </div>

          <div className="flex items-center gap-1.5 bg-orange-50 rounded-lg p-2 border border-orange-100 mb-3">
            <Zap className="h-3.5 w-3.5 text-orange-600" />
            {usagePercentage >= 80 && (
              <p className="text-xs text-orange-900">
                Próximo ao limite mensal
              </p>
            )}
          </div>

          <Button
            size="sm"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white shadow-sm h-9"
          >
            Fazer upgrade
          </Button>
        </div>
      </div>
    </SidebarFooter>
  );
}

function AdminSidebarFooterExpandedUnlimited({
  currentPlan,
}: {
  currentPlan: IMySubscription;
}) {
  return (
    <SidebarFooter className="border-t border-gray-100 p-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/60 relative overflow-hidden p-4">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.03),transparent)]" />

        <div className="relative">
          <div className="flex items-start gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-blue-200 flex items-center justify-center shadow-sm">
              <CreditCard className="h-3.5 w-3.5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-900">{currentPlan.planName}</p>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs h-5">
                  Ilimitado
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                {currentPlan.schedulesLength.toLocaleString()} agendamentos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-blue-50 rounded-lg p-2 border border-blue-100">
            <CreditCard className="h-3.5 w-3.5 text-blue-600" />
            <p className="text-xs text-blue-900">
              Acesso ilimitado a todos os agendamentos
            </p>
          </div>
        </div>
      </div>
    </SidebarFooter>
  );
}
