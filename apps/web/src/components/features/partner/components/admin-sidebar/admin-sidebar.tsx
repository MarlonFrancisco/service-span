'use client';
import Link from 'next/link';
import { useAdminSidebar } from './admin-sidebar.hook';
import {
  adminSidebarVariants,
  menuDescriptionVariants,
  menuIconVariants,
  menuItemVariants,
  menuLabelVariants,
  sidebarFooterVariants,
  sidebarHeaderVariants,
  sidebarNavVariants,
} from './admin-sidebar.styles';

export const AdminSidebarComponent = () => {
  const { menuItems, pathname } = useAdminSidebar();

  return (
    <div className={adminSidebarVariants()}>
      {/* Header */}
      <div className={sidebarHeaderVariants()}>
        <div>
          <h2 className="text-[#1a2b4c] text-lg font-semibold">ServiceSnap</h2>
          <p className="text-sm text-gray-600">Painel Administrativo</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={sidebarNavVariants()}>
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.includes(item.id);
            const variant = isActive ? 'active' : 'inactive';

            return (
              <Link href={item.id} key={item.id}>
                <button
                  onClick={() => {}}
                  className={menuItemVariants({ variant })}
                >
                  <Icon className={menuIconVariants({ variant })} />
                  <div className="flex-1">
                    <div className={menuLabelVariants({ variant })}>
                      {item.label}
                    </div>
                    <div className={menuDescriptionVariants({ variant })}>
                      {item.description}
                    </div>
                  </div>
                </button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className={sidebarFooterVariants()}>
        <div className="text-xs text-gray-500 text-center">Versão 2.0.1</div>
      </div>
    </div>
  );
};
