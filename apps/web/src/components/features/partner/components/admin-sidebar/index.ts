// AdminSidebar - ANCR-FA Architecture
export {
  AdminSidebarComponent as AdminSidebar,
  AdminSidebarComponent as default,
} from './admin-sidebar';
export { useAdminSidebar } from './admin-sidebar.hook';

export type {
  TAdminSidebarConfig,
  TAdminSidebarHookReturn,
  TAdminSidebarMenuItem,
} from './admin-sidebar.types';

export {
  adminSidebarVariants,
  menuDescriptionVariants,
  menuIconVariants,
  menuItemVariants,
  menuLabelVariants,
  sidebarFooterVariants,
  sidebarHeaderVariants,
  sidebarNavVariants,
} from './admin-sidebar.styles';
