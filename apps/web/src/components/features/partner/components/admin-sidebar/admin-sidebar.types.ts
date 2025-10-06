// AdminSidebar Types - ANCR-FA Architecture
import type { TPartnerModule } from '../../partner.types';

export type TAdminSidebarMenuItem = {
  id: TPartnerModule;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

export type TAdminSidebarHookReturn = {
  menuItems: TAdminSidebarMenuItem[];
  pathname: string;
};
