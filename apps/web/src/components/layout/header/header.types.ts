import type { HTMLAttributes, PropsWithChildren } from 'react';

export type THeaderConfig = PropsWithChildren<
  HTMLAttributes<HTMLElement> & {
    showSearchBar?: boolean;
    logoProps?: HTMLAttributes<HTMLAnchorElement>;
  }
>;

export type TUseHeaderConfig = {
  onMenuToggle?: (isOpen: boolean) => void;
};

export type TNavigationItem = {
  href: string;
  label: string;
};
