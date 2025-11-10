'use client';

import { Calendar, Clock, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useProfileStats } from './profile-stats.hook';

export const ProfileStats = () => {
  const { totalBookings, upcomingCount, favoritesCount } = useProfileStats();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {/* Total Bookings */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="group relative bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition-all text-left overflow-hidden"
      >
        <div className="absolute top-3 right-3 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
          <Calendar className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
        </div>
        <div className="relative">
          <motion.div
            className="text-gray-900 mb-1"
            whileHover={{ scale: 1.05 }}
          >
            {totalBookings}
          </motion.div>
          <div className="text-gray-600 pr-12">Agendamentos</div>
        </div>
      </motion.button>

      {/* Upcoming */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="group relative bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition-all text-left overflow-hidden"
      >
        <div className="absolute top-3 right-3 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
          <Clock className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
        </div>
        <div className="relative">
          <motion.div
            className="text-gray-900 mb-1"
            whileHover={{ scale: 1.05 }}
          >
            {upcomingCount}
          </motion.div>
          <div className="text-gray-600 pr-12">Próximos</div>
        </div>
      </motion.button>

      {/* Favorites */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="group relative bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition-all text-left overflow-hidden"
      >
        <div className="absolute top-3 right-3 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
          <Heart className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
        </div>
        <div className="relative">
          <motion.div
            className="text-gray-900 mb-1"
            whileHover={{ scale: 1.05 }}
          >
            {favoritesCount}
          </motion.div>
          <div className="text-gray-600 pr-12">Favoritos</div>
        </div>
      </motion.button>
    </div>
  );
};
