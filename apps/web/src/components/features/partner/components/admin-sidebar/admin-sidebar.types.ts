import { LucideIcon } from 'lucide-react';

export interface IMenuSubItem {
  id: string;
  url: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export interface IMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  url?: string;
  hasSubmenu?: boolean;
  submenu?: IMenuSubItem[];
  isActive?: boolean;
}

export interface IMenuSection {
  title: string;
  isActive?: boolean;
  items: IMenuItem[];
}
