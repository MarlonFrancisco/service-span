'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

export const Config = () => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // const isBookingPage = pathname.includes('booking');
    // useSearchStore.setState({
    //   showFilters: isBookingPage,
    //   showSearchBar: isBookingPage,
    // });
  }, [pathname]);

  return null;
};
