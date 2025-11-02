'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarRail,
  useSidebar,
} from '@repo/ui';
import { AdminSidebarHeader } from './components/admin-sidebar-header';
import { AdminSidebarFooter } from './components/admin-sidebar-footer';
import { AdminSidebarMenuItem } from './components/admin-sidebar-menu-item';
import { AdminSidebarMenuItemWithSubmenu } from './components/admin-sidebar-menu-item-with-submenu';
import { menuSections } from './admin-sidebar.config';
import { useActiveModule } from './admin-sidebar.hook';

export function AdminSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const activeModule = useActiveModule();

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      <AdminSidebarHeader isCollapsed={isCollapsed} />

      <SidebarContent>
        {menuSections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-xs text-gray-400 uppercase tracking-wider">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  if (item.hasSubmenu && item.submenu) {
                    return (
                      <AdminSidebarMenuItemWithSubmenu
                        key={item.id}
                        item={item}
                        activeModule={activeModule}
                        isCollapsed={isCollapsed}
                      />
                    );
                  }

                  return (
                    <AdminSidebarMenuItem
                      key={item.id}
                      item={item}
                      activeModule={activeModule}
                      isCollapsed={isCollapsed}
                    />
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <AdminSidebarFooter isCollapsed={isCollapsed} />

      <SidebarRail />
    </Sidebar>
  );
}
