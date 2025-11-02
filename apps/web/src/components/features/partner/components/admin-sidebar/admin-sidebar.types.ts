import { LucideIcon } from 'lucide-react';

export interface IMenuSubItem {
  id: string;
  url: string;
  label: string;
  icon: LucideIcon;
}

export interface IMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  url?: string;
  hasSubmenu?: boolean;
  submenu?: IMenuSubItem[];
}

export interface IMenuSection {
  title: string;
  items: IMenuItem[];
}
