'use client';

import { useSubscriptionQuery } from '@/hooks/use-query/use-subscription-query';
import { Button, SidebarFooter } from '@repo/ui';
import { CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminSidebarFooterProps {
  isCollapsed: boolean;
}

export function AdminSidebarFooter({ isCollapsed }: AdminSidebarFooterProps) {
  const { currentPlan } = useSubscriptionQuery();

  const router = useRouter();

  const handleUpgradeClick = () => {
    router.push('/partner/plans/upgrade');
  };

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

        <div className="relative">
          <div className="flex items-start gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <CreditCard className="h-3.5 w-3.5 text-gray-900" />
            </div>
            <div className="flex-1 min-w-0 h-8">
              <div className="flex items-center gap-2 h-full">
                <p className="text-sm text-gray-900">{currentPlan.planName}</p>
              </div>
            </div>
          </div>

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
