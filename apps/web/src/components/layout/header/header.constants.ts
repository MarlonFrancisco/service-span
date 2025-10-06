import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import type {
  TContactAddress,
  TNavigationItem,
  TSocialLink,
} from './header.types';

export const NAVIGATION_ITEMS: TNavigationItem[] = [
  { href: '/work', label: 'Entrar ou cadastrar' },
  { href: '/about', label: 'Empresa' },
  { href: '/process', label: 'Anunciar serviços' },
  { href: '/blog', label: 'Blog' },
];

export const SOCIAL_LINKS: TSocialLink[] = [
  { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
  { href: 'https://github.com', label: 'GitHub', icon: Linkedin },
  { href: 'https://dribbble.com', label: 'Dribbble', icon: Twitter },
];

export const CONTACT_ADDRESSES: TContactAddress[] = [
  {
    city: 'Copenhagen',
    street: '1 Carlsberg Gate',
    postalCode: '1260',
    country: 'København, Denmark',
  },
  {
    city: 'Billund',
    street: '24 Lego Allé',
    postalCode: '7190',
    country: 'Billund, Denmark',
  },
];

