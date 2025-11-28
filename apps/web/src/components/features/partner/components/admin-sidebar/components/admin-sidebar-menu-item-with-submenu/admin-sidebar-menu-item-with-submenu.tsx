'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@repo/ui';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  useIsMenuItemActive,
  useIsSubMenuItemActive,
} from '../../admin-sidebar.hook';
import { IMenuItem } from '../../admin-sidebar.types';

interface AdminSidebarMenuItemWithSubmenuProps {
  item: IMenuItem;
  activeModule: string;
  isCollapsed: boolean;
}

export function AdminSidebarMenuItemWithSubmenu({
  item,
  activeModule,
  isCollapsed,
}: AdminSidebarMenuItemWithSubmenuProps) {
  if (!item.isActive) {
    return null;
  }

  if (isCollapsed) {
    return <CollapsedSubmenuItem item={item} activeModule={activeModule} />;
  }

  return <ExpandedSubmenuItem item={item} activeModule={activeModule} />;
}

function CollapsedSubmenuItem({
  item,
  activeModule,
}: {
  item: IMenuItem;
  activeModule: string;
}) {
  const router = useRouter();
  const Icon = item.icon;
  const isActive = useIsMenuItemActive(item.id, activeModule);
  const submenu = item.submenu || [];

  if (!item.isActive) {
    return null;
  }

  return (
    <SidebarMenuItem>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-gray-100 ${
              isActive
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'text-gray-700'
            }`}
          >
            <Icon
              className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-400'}`}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          className="w-56 p-2 rounded-xl border border-gray-200 shadow-lg"
        >
          <div className="space-y-1">
            <div className="px-2 py-1.5 text-sm font-medium text-gray-900">
              {item.label}
            </div>
            <div className="h-px bg-gray-100" />
            {submenu
              .filter((subItem) => subItem.isActive)
              .map((subItem) => {
                const SubIcon = subItem.icon;
                const isSubActive = useIsSubMenuItemActive(
                  subItem.id,
                  activeModule,
                );

                return (
                  <button
                    key={subItem.id}
                    className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors ${
                      isSubActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => router.push(subItem.url)}
                  >
                    <SubIcon className="h-4 w-4" />
                    <span>{subItem.label}</span>
                  </button>
                );
              })}
          </div>
        </PopoverContent>
      </Popover>
    </SidebarMenuItem>
  );
}

function ExpandedSubmenuItem({
  item,
  activeModule,
}: {
  item: IMenuItem;
  activeModule: string;
}) {
  const router = useRouter();
  const Icon = item.icon;
  const isActive = useIsMenuItemActive(item.id, activeModule);
  const submenu = item.submenu || [];

  if (!item.isActive) {
    return null;
  }

  return (
    <Collapsible
      defaultOpen={activeModule.startsWith(item.id)}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className={
              isActive
                ? 'bg-gray-900 text-white hover:bg-gray-800 hover:text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }
          >
            <Icon
              className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-400'}`}
            />
            <span>{item.label}</span>
            <ChevronDown
              className={`ml-auto h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 ${
                isActive ? 'text-white/70' : 'text-gray-400'
              }`}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {submenu
              .filter((subItem) => subItem.isActive)
              .map((subItem) => {
                const SubIcon = subItem.icon;
                const isSubActive = useIsSubMenuItemActive(
                  subItem.id,
                  activeModule,
                );
                return (
                  <SidebarMenuSubItem
                    key={subItem.id}
                    onClick={() => router.push(subItem.url)}
                  >
                    <SidebarMenuSubButton
                      isActive={isSubActive}
                      className={
                        isSubActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    >
                      <SubIcon className="h-4 w-4" />
                      <span>{subItem.label}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
