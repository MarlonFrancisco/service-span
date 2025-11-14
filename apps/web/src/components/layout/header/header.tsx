'use client';

import { SOCIAL_LINKS } from '@/utils/constants/contact.constants';
import { cn } from '@repo/ui/index';
import { motion } from 'motion/react';
import { HeaderLogo } from './components/header-logo';
import { MenuButton } from './components/menu-button';
import { NavigationMenu } from './components/navigation-menu';
import { PartnerButton } from './components/partner-button';
import { SearchBar } from './components/search-bar/search-bar';
import { SocialLinks } from './components/social-links';
import { dropdownAnimation } from './header.animation';
import { useHeader } from './header.hook';
import type { THeaderConfig } from './header.types';

export const Header = ({
  showSearchBar = false,
  logoProps = {},
  children,
  ...props
}: THeaderConfig) => {
  const { isMenuOpen, toggleMenu } = useHeader();

  return (
    <div className="min-h-screen bg-foreground">
      <header {...props} className={cn(props.className, '')}>
        {/* Header Bar */}
        <div className="absolute top-0 right-0 left-0 z-40 h-[168px] flex items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-6 w-full">
            <div className="mx-auto md:max-w-2xl lg:max-w-none">
              <div className="flex items-center justify-between">
                <HeaderLogo variant="light" {...logoProps} />

                {showSearchBar && <SearchBar />}

                <div className="flex items-center gap-x-8">
                  <div className="hidden lg:block">
                    <PartnerButton variant="light" />
                  </div>
                  <MenuButton
                    isOpen={isMenuOpen}
                    onClick={toggleMenu}
                    variant="light"
                    id="header-menu-open-button"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Dropdown */}
        <motion.div
          className="relative z-50 overflow-hidden h-full bg-foreground pt-2 will-change-max-height"
          aria-hidden={!isMenuOpen}
          inert={isMenuOpen ? false : true}
          {...dropdownAnimation(isMenuOpen)}
        >
          <div className="bg-foreground">
            {/* Menu Header */}
            <div className="bg-foreground">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                  <div className="flex items-center justify-between h-[156px]">
                    <HeaderLogo variant="dark" />

                    <div className="flex items-center gap-x-8">
                      <PartnerButton variant="dark" />
                      <MenuButton
                        isOpen={isMenuOpen}
                        onClick={toggleMenu}
                        variant="dark"
                        id="header-menu-close-button"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <NavigationMenu />

            {/* Footer Section */}
            <div className="relative bg-foreground before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-foreground">
              <div className="mx-auto max-w-7xl mt-8 md:mt-18 pb-10 md:pb-16 px-6">
                <SocialLinks links={SOCIAL_LINKS} />
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      <div className="rounded-tl-[40px] rounded-tr-[40px] bg-background pt-40 md:pt-50">
        {children}
      </div>
    </div>
  );
};
