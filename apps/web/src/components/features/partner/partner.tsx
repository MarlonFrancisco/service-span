'use client';
import { AdminSidebar } from './components/admin-sidebar';
import { StoreSelector } from './components/store-selector';
import { usePartnerDashboard } from './partner.hook';
import {
  mainContentVariants,
  moduleContentVariants,
  moduleTitleVariants,
  partnerDashboardVariants,
  topBarVariants,
} from './partner.styles';
import type { TPartnerDashboardConfig } from './partner.types';

export const Partner = ({ children }: TPartnerDashboardConfig) => {
  const {
    activeStore,
    stores,
    handleStoreChange,
    getModuleTitle,
    shouldShowStoreSelector,
  } = usePartnerDashboard();

  return (
    <div className={partnerDashboardVariants()}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className={mainContentVariants()}>
        {/* Top Bar */}
        <div className={topBarVariants()}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className={moduleTitleVariants()}>
                {getModuleTitle('dashboard')}
              </h1>
            </div>

            {/* Store Selector - Only show for modules that need it */}
            {shouldShowStoreSelector('dashboard') && (
              <StoreSelector
                stores={stores}
                activeStore={activeStore}
                onStoreChange={handleStoreChange}
              />
            )}
          </div>
        </div>

        {/* Module Content */}
        <div className={moduleContentVariants()}>{children}</div>
      </div>
    </div>
  );
};
