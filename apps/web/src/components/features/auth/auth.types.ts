export type AuthStep =
  | 'login'
  | 'verification'
  | 'signup'
  | 'profile-selection';

export type UserType = 'client' | 'provider';
