'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui';
import {
  Camera,
  CheckCircle,
  Edit3,
  LogOut,
  MoreVertical,
  Settings,
  Shield,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProfileStats } from './components/profile-stats';
import { useProfileHeader } from './profile-header.hook';

export const ProfileHeader = () => {
  const {
    user,
    isUpdatingAvatar,
    fileInputRef,
    handlePhotoUpload,
    handleEditProfile,
    handleSettings,
    handleLogout,
  } = useProfileHeader();

  if (!user) return null;

  return (
    <div className="relative border-b border-gray-200 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar with enhanced upload */}
            <TooltipProvider>
              <div className="relative group flex-shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                <Avatar className="relative w-28 h-28 sm:w-32 sm:h-32 border-4 border-white shadow-2xl ring-1 ring-gray-100">
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}${user.avatar}`}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUpdatingAvatar}
                      className="absolute bottom-0 right-0 w-11 h-11 bg-gray-900 rounded-full flex items-center justify-center shadow-xl hover:bg-gray-800 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ring-4 ring-white"
                    >
                      {isUpdatingAvatar ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Camera className="h-4 w-4 text-white" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Alterar foto do perfil</p>
                  </TooltipContent>
                </Tooltip>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </TooltipProvider>

            {/* Name & Meta Info */}
            <div className="flex-1 min-w-0 w-full sm:w-auto">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <h1 className="text-gray-900">
                      {user.firstName} {user.lastName}
                    </h1>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3 text-gray-600">
                    <span className="text-gray-300">•</span>
                    <span className="text-sm">
                      Membro desde{' '}
                      {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Verification badges with animation */}
                  <div className="flex flex-wrap gap-2">
                    {user.email && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-gray-300 transition-all group"
                      >
                        <CheckCircle className="h-3 w-3 text-green-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-gray-700">Email</span>
                      </motion.div>
                    )}
                    {user.telephone && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-gray-300 transition-all group"
                      >
                        <CheckCircle className="h-3 w-3 text-green-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-gray-700">Telefone</span>
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-gray-300 transition-all group"
                    >
                      <Shield className="h-3 w-3 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="text-xs text-gray-700">
                        ID Verificado
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Actions Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-gray-100 flex-shrink-0"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={handleEditProfile}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Editar perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSettings}>
                      <Settings className="h-4 w-4 mr-2" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <ProfileStats />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
