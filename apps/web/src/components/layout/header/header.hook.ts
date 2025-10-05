import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { headerAnimation } from './header.animation';

const useHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToPlansPage = () => {
    router.push('/partner');
  };

  useEffect(() => {
    headerAnimation();
  }, []);

  return { isMenuOpen, toggleMenu, goToPlansPage };
};

export default useHeader;
