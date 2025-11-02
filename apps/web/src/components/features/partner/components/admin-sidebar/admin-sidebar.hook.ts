'use client';

import { usePathname } from 'next/navigation';
import { TModuleId } from '../../partner.types';

export function useActiveModule(): TModuleId {
  const pathname = usePathname();
  return pathname.split('/').pop() as TModuleId;
}

export function useIsMenuItemActive(itemId: string, activeModule: string): boolean {
  return activeModule === itemId || activeModule.startsWith(`${itemId}-`);
}

export function useIsSubMenuItemActive(subItemId: string, activeModule: string): boolean {
  return activeModule === subItemId;
}
