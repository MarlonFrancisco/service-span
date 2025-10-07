import { LucideIcon } from 'lucide-react';

export type TSocialLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type TContactAddress = {
  city: string;
  street: string;
  postalCode: string;
  country: string;
};
