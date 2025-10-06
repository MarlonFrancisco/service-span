import Image from 'next/image';
import Link from 'next/link';
import type { THeaderLogoConfig } from './header-logo.types';

export const HeaderLogo = ({
  variant = 'light',
  width = 200,
  height = 27,
}: THeaderLogoConfig) => {
  const logoSrc = variant === 'dark' ? '/logo-white.png' : '/logo.png';
  const logoHeight = variant === 'dark' ? 62 : height;

  return (
    <Link href="/" aria-label="Home">
      <Image
        src={logoSrc}
        alt="ServiceSnap"
        width={width}
        height={logoHeight}
      />
    </Link>
  );
};

