'use client';

import { Badge, Button, Progress } from '@repo/ui';
import {
  ArrowLeft,
  BellRing,
  Building2,
  Calendar,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  Settings,
  Store,
} from 'lucide-react';
import { motion } from 'motion/react';
import { usePathname, useRouter } from 'next/navigation';

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'stores',
      label: 'Lojas',
      icon: Store,
      badge: '3',
    },
    {
      id: 'services',
      label: 'Serviços',
      icon: Settings,
    },
    {
      id: 'agenda',
      label: 'Agenda',
      icon: Calendar,
    },
    {
      id: 'plans',
      label: 'Planos',
      icon: CreditCard,
    },
    {
      id: 'notifications',
      label: 'Notificações',
      icon: BellRing,
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="w-full justify-start text-gray-500 hover:text-gray-900 hover:bg-gray-50 mb-5 -ml-2 px-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-sm">Voltar</span>
        </Button>

        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-sm">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900 text-sm">ServiceSnap</h2>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto admin-content-scroll">
        <div className="space-y-0.5">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname.includes(item.id);

            return (
              <motion.button
                key={item.id}
                onClick={() => router.push(`/partner/${item.id}`)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className={`
                  w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center justify-between group relative
                  ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  <span
                    className={`text-sm truncate ${isActive ? 'text-white' : 'text-gray-700'}`}
                  >
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
                    <Badge
                      variant="outline"
                      className={`text-xs px-1.5 h-5 ${
                        isActive
                          ? 'bg-white/20 text-white border-white/30'
                          : 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {isActive && (
                    <ChevronRight className="h-3.5 w-3.5 text-white/70" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Footer - Plan Info */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-200/60 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.03),transparent)]" />

          <div className="relative">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                <CreditCard className="h-3.5 w-3.5 text-gray-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">Plano Startup</p>
                <p className="text-xs text-gray-600 mt-0.5">
                  8.456 / 10.000 agendamentos
                </p>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-gray-600">Uso do plano</span>
                <span className="text-xs text-gray-900">84%</span>
              </div>
              <Progress value={84} className="h-1.5" />
            </div>
            <Button
              size="sm"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white shadow-sm text-sm h-9"
            >
              Fazer upgrade
            </Button>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-3">v2.1.0</p>
      </div>
    </div>
  );
}
