'use client';

import { Button, SidebarHeader } from '@repo/ui';
import { ArrowLeft, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminSidebarHeaderProps {
  isCollapsed: boolean;
}

export function AdminSidebarHeader({ isCollapsed }: AdminSidebarHeaderProps) {
  const router = useRouter();

  return (
    <SidebarHeader className="border-b border-gray-100 py-4">
      <div className="px-2 space-y-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-gray-500 hover:text-gray-900 hover:bg-gray-50 h-9"
          title={isCollapsed ? 'Voltar' : undefined}
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2 text-sm">Voltar</span>}
        </Button>

        {/* Logo/Brand */}
        <div
          className={`flex items-center gap-3 px-1 ${isCollapsed ? 'justify-center' : ''}`}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-sm shrink-0">
            <Building2 className="text-white h-4 w-4" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h2 className="text-gray-900 text-sm truncate">ServiceSnap</h2>
              <p className="text-gray-500 text-xs truncate">Admin</p>
            </div>
          )}
        </div>
      </div>
    </SidebarHeader>
  );
}
