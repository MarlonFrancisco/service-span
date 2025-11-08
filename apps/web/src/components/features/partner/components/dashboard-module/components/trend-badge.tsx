'use client';

import { Badge } from '@repo/ui';
import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

interface TrendBadgeProps {
  value: number;
  variant?: 'default' | 'outline';
  showIcon?: boolean;
  showSign?: boolean;
  className?: string;
}

export function TrendBadge({
  value,
  variant = 'outline',
  showIcon = true,
  showSign = true,
  className = '',
}: TrendBadgeProps) {
  const isNeutral = value === 0;
  const isPositive = value > 0;

  const baseClasses = `text-xs ${className}`;

  if (variant === 'outline') {
    return (
      <Badge
        variant="outline"
        className={`${baseClasses} ${
          isNeutral
            ? 'text-gray-700 border-gray-200 bg-gray-50'
            : isPositive
              ? 'text-green-700 border-green-200 bg-green-50'
              : 'text-red-700 border-red-200 bg-red-50'
        }`}
      >
        {isNeutral ? (
          <span className="inline mr-0.5">—</span>
        ) : isPositive ? (
          showIcon ? (
            <ArrowUpRight className="w-3 h-3 inline mr-0.5" />
          ) : null
        ) : showIcon ? (
          <ArrowDownRight className="w-3 h-3 inline mr-0.5" />
        ) : null}
        {!isNeutral && showSign && (isPositive ? '+' : '')}
        {value}%
      </Badge>
    );
  }

  // variant === 'default'
  return (
    <Badge
      className={`${baseClasses} ${
        isNeutral
          ? 'bg-gray-50 text-gray-700 border-gray-200'
          : isPositive
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-red-50 text-red-700 border-red-200'
      }`}
    >
      {isNeutral ? (
        <span className="mr-1">—</span>
      ) : isPositive ? (
        showIcon ? (
          <TrendingUp className="w-3 h-3 mr-1" />
        ) : null
      ) : showIcon ? (
        <TrendingDown className="w-3 h-3 mr-1" />
      ) : null}
      {!isNeutral && showSign && (isPositive ? '+' : '')}
      {value}%
    </Badge>
  );
}
