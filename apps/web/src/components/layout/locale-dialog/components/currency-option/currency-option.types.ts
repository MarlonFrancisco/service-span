import type { TCurrencyCode } from '@repo/shared/constants';

export type TCurrencyOptionConfig = {
  code: TCurrencyCode;
  name: string;
  symbol: string;
  isSelected: boolean;
  onClick: () => void;
};
