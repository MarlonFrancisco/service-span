'use client';

import { Tabs, TabsList, TabsTrigger } from '@repo/ui';
import { Calendar, Heart, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import type { TProfileTab } from '../../profile.types';
import type { TProfileTabsConfig } from './profile-tabs.types';

const TAB_CONFIG = [
  {
    id: 'bookings' as const,
    label: 'Agendamentos',
    shortLabel: 'Agenda',
    icon: Calendar,
    showCount: true,
  },
  {
    id: 'favorites' as const,
    label: 'Favoritos',
    shortLabel: 'Favoritos',
    icon: Heart,
    showCount: true,
  },
  {
    id: 'settings' as const,
    label: 'Privacidade',
    shortLabel: 'Privacidade',
    icon: Shield,
    showCount: false,
  },
];

export const ProfileTabs = ({
  activeTab,
  onTabChange,
  upcomingCount,
  favoritesCount,
}: TProfileTabsConfig) => {
  const getCount = (tabId: string) => {
    if (tabId === 'bookings') return upcomingCount;
    if (tabId === 'favorites') return favoritesCount;
    return undefined;
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange(value as TProfileTab)}
      className="my-8"
    >
      {/* Desktop Tabs */}
      <TabsList className="hidden md:flex justify-start gap-8 bg-transparent">
        {TAB_CONFIG.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const count = getCount(tab.id);

          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="relative flex h-auto items-center gap-2.5 rounded-none border-0 bg-transparent px-1 py-3 text-gray-500 transition-colors hover:text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none group"
            >
              <Icon
                className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-gray-900' : 'text-gray-400'
                }`}
              />
              <span className="whitespace-nowrap">{tab.label}</span>
              {tab.showCount && count !== undefined && count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}
                >
                  {count}
                </motion.span>
              )}

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {/* Mobile Tabs */}
      <TabsList className="md:hidden mt-4 h-auto w-full grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl">
        {TAB_CONFIG.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const count = getCount(tab.id);

          return (
            <TabsTrigger key={tab.id} value={tab.id} asChild>
              <motion.button
                className={`relative flex flex-col items-center gap-1.5 h-auto px-3 py-3 rounded-lg transition-all border-0 ${
                  isActive
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-gray-50 bg-transparent'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Icon
                    className={`h-5 w-5 transition-colors ${
                      isActive ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  />
                  {tab.showCount && count !== undefined && count > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 text-white rounded-full flex items-center justify-center">
                      <span className="text-[10px]">{count}</span>
                    </div>
                  )}
                </div>
                <span
                  className={`text-xs transition-colors ${
                    isActive ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  {tab.shortLabel}
                </span>
              </motion.button>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};
