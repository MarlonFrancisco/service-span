import { Briefcase, Crown, Shield, Users } from 'lucide-react';
import type { TStaffRole } from '../stores-module.types';
import { AMENITIES_LIST, STAFF_ROLES } from './stores-module.constants';

export const getRoleIcon = (role: TStaffRole) => {
  const icons = {
    owner: Crown,
    manager: Shield,
    professional: Briefcase,
    receptionist: Users,
  };
  return icons[role];
};

export const getRoleLabel = (role: TStaffRole): string => {
  return STAFF_ROLES[role].label;
};

export const getRoleColor = (role: TStaffRole): string => {
  return STAFF_ROLES[role].color;
};

export const isCustomAmenity = (amenity: string): boolean => {
  return !AMENITIES_LIST.includes(amenity as any);
};

export const validateStoreForm = (form: {
  name: string;
  address: string;
  city: string;
  phone: string;
}): boolean => {
  return !!(form.name && form.address && form.city && form.phone);
};

export const validateStaffForm = (form: {
  name: string;
  email: string;
  phone: string;
}): boolean => {
  return !!(form.name && form.email && form.phone);
};
