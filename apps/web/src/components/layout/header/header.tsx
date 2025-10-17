'use client';

import {
  CONTACT_ADDRESSES,
  SOCIAL_LINKS,
} from '@/utils/constants/contact.constants';
import { motion } from 'motion/react';
import { ContactInfo } from './components/contact-info';
import { HeaderLogo } from './components/header-logo';
import { MenuButton } from './components/menu-button';
import { NavigationMenu } from './components/navigation-menu';
import { PartnerButton } from './components/partner-button';
import { SearchBar } from './components/search-bar/search-bar';
import { SocialLinks } from './components/social-links';
import { dropdownAnimation } from './header.animation';
import { NAVIGATION_ITEMS } from './header.constants';
import { useHeader } from './header.hook';
import type { THeaderConfig } from './header.types';

export const Header = ({
  showSearchBar = false,
  logoProps = {},
  ...props
}: THeaderConfig) => {
  const { isMenuOpen, toggleMenu, goToPlansPage } = useHeader();

  return (
    <header {...props}>
      {/* Header Bar */}
      <div className="absolute top-0 right-0 left-0 z-40 h-[168px] flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-6 w-full">
          <div className="mx-auto md:max-w-2xl lg:max-w-none">
            <div className="flex items-center justify-between">
              <HeaderLogo variant="light" {...logoProps} />

              {showSearchBar && <SearchBar />}

              <div className="flex items-center gap-x-8">
                <div className="hidden lg:block">
                  <PartnerButton variant="light" onClick={goToPlansPage} />
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
        className="relative z-50 overflow-hidden h-full bg-neutral-950 pt-2 will-change-max-height will-change-opacity"
        aria-hidden={!isMenuOpen}
        inert={isMenuOpen ? false : true}
        {...dropdownAnimation(isMenuOpen)}
      >
        <div className="bg-neutral-800">
          {/* Menu Header */}
          <div className="bg-neutral-950">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:max-w-none">
                <div className="flex items-center justify-between h-[156px]">
                  <HeaderLogo variant="dark" />

                  <div className="flex items-center gap-x-8">
                    <PartnerButton variant="dark" onClick={goToPlansPage} />
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
          <NavigationMenu items={NAVIGATION_ITEMS} />

          {/* Footer Section */}
          <div className="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:max-w-none">
                <div className="grid grid-cols-1 gap-y-10 pt-10 pb-16 sm:grid-cols-2 sm:pt-16">
                  <ContactInfo addresses={CONTACT_ADDRESSES} />
                  <SocialLinks links={SOCIAL_LINKS} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};
