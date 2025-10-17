import Image from 'next/image';
import Link from 'next/link';
import type { THeaderLogoConfig } from './header-logo.types';

export const HeaderLogo = ({
  variant = 'light',
  width = 200,
  height = 27,
  ...props
}: THeaderLogoConfig) => {
  const logoSrc = variant === 'dark' ? '/logo-white.png' : '/logo.png';

  return (
    <Link href="/" aria-label="Home" {...props}>
      <Image src={logoSrc} alt="ServiceSnap" width={width} height={height} />
    </Link>
  );
};
