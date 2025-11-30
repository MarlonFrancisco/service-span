import type { TCountryCode } from '@repo/shared/constants';

export type TCountryOptionConfig = {
  code: TCountryCode;
  name: string;
  locale: string;
  isSelected: boolean;
  onClick: () => void;
};
