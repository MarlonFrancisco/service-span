'use client';

import { motion } from 'motion/react';

interface ISearchBarInputProps {
  placeholder: string;
  value: string;
  isSearchFocused: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

export const SearchBarInput = ({
  placeholder,
  value,
  isSearchFocused,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onClick,
}: ISearchBarInputProps) => {
  return (
    <motion.input
      animate={{
        paddingLeft: isSearchFocused ? '4.75rem' : '3.25rem',
        paddingRight: isSearchFocused ? '6rem' : '5rem',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      type="text"
      placeholder={placeholder}
      value={value}
      onClick={onClick}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      className="border-0 bg-white h-14 outline-none text-base rounded-xl transition-colors focus:ring-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
    />
  );
};
