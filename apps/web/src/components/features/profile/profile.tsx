'use client';

import { Header } from '@/components/layout';
import { AnimatePresence } from 'motion/react';
import { BookingsSection } from './components/bookings-section';
import { FavoritesSection } from './components/favorites-section';
import { ProfileHeader } from './components/profile-header';
import { ProfileTabs } from './components/profile-tabs';
import { SettingsSection } from './components/settings-section';
import { useProfile } from './profile.hook';
import { ProfileSkeleton } from './profile.skeleton';

export const Profile = () => {
  const {
    activeTab,
    isPendingUser,
    setActiveTab,
    upcomingCount,
    favoritesCount,
  } = useProfile();

  if (isPendingUser) {
    return <ProfileSkeleton />;
  }

  return (
    <Header>
      <div className="min-h-screen">
        <ProfileHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            upcomingCount={upcomingCount}
            favoritesCount={favoritesCount}
          />

          <AnimatePresence mode="wait">
            {activeTab === 'bookings' && (
              <BookingsSection className="space-y-8 pb-12" />
            )}

            {activeTab === 'favorites' && (
              <FavoritesSection className="pb-12" />
            )}

            {activeTab === 'settings' && <SettingsSection className="pb-12" />}
          </AnimatePresence>
        </div>
      </div>
    </Header>
  );
};
