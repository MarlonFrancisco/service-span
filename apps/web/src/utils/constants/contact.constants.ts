import { TContactAddress, TSocialLink } from '@/types/layout/contact.types';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

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
