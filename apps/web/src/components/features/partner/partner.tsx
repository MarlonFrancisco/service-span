'use client';
import { usePartner } from '@/store';
import { Button, Sheet, SheetContent } from '@repo/ui';
import { Menu } from 'lucide-react';
import type { ReactNode } from 'react';
import { AdminSidebar, StoreSelector } from './components';

type TPartnerProps = {
  children: ReactNode;
};

export function Partner({ children }: TPartnerProps) {
  const {
    isMobileSidebarOpen,
    currentModule,
    showStoreSelector,
    setIsMobileSidebarOpen,
  } = usePartner();

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 lg:hidden">
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Modern Header */}
        <div className="bg-white border-b border-gray-100 flex-shrink-0">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-start justify-between gap-4">
              {/* Mobile Menu Button & Title */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="lg:hidden flex-shrink-0 -ml-2 h-9 w-9 p-0"
                >
                  <Menu className="h-5 w-5" />
                </Button>

                <div className="flex-1 min-w-0">
                  <h1 className="text-gray-900 text-xl sm:text-2xl mb-1 truncate">
                    {currentModule.title}
                  </h1>
                  <p className="text-gray-500 text-xs sm:text-sm hidden sm:block truncate">
                    {currentModule.description}
                  </p>
                </div>
              </div>

              {/* Store Selector - Only show for modules that need it */}
              {showStoreSelector && (
                <div className="flex-shrink-0">
                  <StoreSelector />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Module Content - Scrollable Area */}
        <div className="flex-1 overflow-y-auto admin-content-scroll bg-gray-50/50">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
