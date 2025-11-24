'use client';

import { SidebarMenuButton, SidebarMenuItem } from '@repo/ui';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIsMenuItemActive } from '../../admin-sidebar.hook';
import { IMenuItem } from '../../admin-sidebar.types';

interface AdminSidebarMenuItemProps {
  item: IMenuItem;
  activeModule: string;
  isCollapsed?: boolean;
}

export function AdminSidebarMenuItem({
  item,
  activeModule,
  isCollapsed = false,
}: AdminSidebarMenuItemProps) {
  const router = useRouter();
  const Icon = item.icon;
  const isActive = useIsMenuItemActive(item.id, activeModule);

  const handleClick = () => {
    if (item.url) {
      router.push(item.url);
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} onClick={handleClick}>
        <Icon />
        <span className="text-sm">{item.label}</span>
        {isActive && !isCollapsed && (
          <ChevronRight className="h-3.5 w-3.5 ml-auto" />
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
