'use client';
import {
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from '@repo/ui';
import {
  Activity,
  ArrowLeft,
  AtSign,
  BellRing,
  Building2,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  Mail,
  Settings,
  Store,
  Users,
  Zap,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { TModuleId } from '../../partner.types';

const menuSections = [
  {
    title: 'Principal',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        hasSubmenu: true,
        submenu: [
          {
            id: 'dashboard',
            url: '/partner/dashboard',
            label: 'Visão Geral',
            icon: LayoutDashboard,
          },
          {
            id: 'dashboard-sales',
            url: '/partner/dashboard/sales',
            label: 'Vendas & Receita',
            icon: DollarSign,
          },
          {
            id: 'dashboard-operational',
            url: '/partner/dashboard/operational',
            label: 'Operacional',
            icon: Activity,
          },
          {
            id: 'dashboard-customers',
            url: '/partner/dashboard/customers',
            label: 'Clientes',
            icon: Users,
          },
        ],
      },
      {
        id: 'timeline',
        label: 'Timeline',
        icon: Clock,
      },
    ],
  },
  {
    title: 'Operação',
    items: [
      {
        id: 'agenda',
        label: 'Agenda',
        icon: Calendar,
      },
      {
        id: 'stores',
        label: 'Lojas',
        icon: Store,
      },
      {
        id: 'services',
        label: 'Serviços',
        icon: Settings,
      },
    ],
  },
  {
    title: 'Configurações',
    items: [
      {
        id: 'notifications',
        label: 'Notificações',
        icon: BellRing,
        hasSubmenu: true,
        submenu: [
          {
            id: 'notifications-history',
            url: '/partner/notifications/history',
            label: 'Histórico',
            icon: Clock,
          },
          {
            id: 'notifications-email-settings',
            url: '/partner/notifications/email-settings',
            label: 'Configurar E-mail',
            icon: AtSign,
          },
          {
            id: 'notifications-sms-settings',
            url: '/partner/notifications/sms-settings',
            label: 'Configurar SMS',
            icon: Mail,
          },
        ],
      },
      {
        id: 'plans',
        label: 'Planos',
        icon: CreditCard,
      },
    ],
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const router = useRouter();
  const pathname = usePathname();
  const activeModule = pathname.split('/').pop() as TModuleId;

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-100 py-4">
        <div className="px-2 space-y-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-500 hover:text-gray-900 hover:bg-gray-50 h-9"
            title={isCollapsed ? 'Voltar' : undefined}
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2 text-sm">Voltar</span>}
          </Button>

          {/* Logo/Brand */}
          <div
            className={`flex items-center gap-3 px-1 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-sm shrink-0">
              <Building2 className="text-white h-4 w-4" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h2 className="text-gray-900 text-sm truncate">ServiceSnap</h2>
                <p className="text-gray-500 text-xs truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {menuSections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-xs text-gray-400 uppercase tracking-wider">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    activeModule === item.id ||
                    activeModule.startsWith(`${item.id}-`);
                  const hasSubmenu = (item as any).hasSubmenu;
                  const submenu = (item as any).submenu;
                  if (hasSubmenu && submenu) {
                    // When collapsed, use Popover to show submenu
                    if (isCollapsed) {
                      return (
                        <SidebarMenuItem key={item.id}>
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-gray-100 ${
                                  isActive
                                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                                    : 'text-gray-700'
                                }`}
                              >
                                <Icon
                                  className={`h-4 w-4 ${
                                    isActive ? 'text-white' : 'text-gray-400'
                                  }`}
                                />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              side="right"
                              align="start"
                              className="w-56 p-2 rounded-xl border border-gray-200 shadow-lg"
                            >
                              <div className="space-y-1">
                                <div className="px-2 py-1.5 text-sm font-medium text-gray-900">
                                  {item.label}
                                </div>
                                <div className="h-px bg-gray-100" />
                                {submenu.map((subItem: any) => {
                                  const SubIcon = subItem.icon;
                                  const isSubActive =
                                    activeModule === subItem.id;
                                  return (
                                    <button
                                      key={subItem.id}
                                      className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors ${
                                        isSubActive
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                      }`}
                                      onClick={() => router.push(subItem.url)}
                                    >
                                      <SubIcon className="h-4 w-4" />
                                      <span>{subItem.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </SidebarMenuItem>
                      );
                    }

                    // When expanded, use Collapsible
                    return (
                      <Collapsible
                        key={item.id}
                        defaultOpen={activeModule.startsWith('dashboard')}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              className={
                                isActive
                                  ? 'bg-gray-900 text-white hover:bg-gray-800 hover:text-white'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }
                            >
                              <Icon
                                className={`h-4 w-4 ${
                                  isActive ? 'text-white' : 'text-gray-400'
                                }`}
                              />
                              <span>{item.label}</span>
                              <ChevronDown
                                className={`ml-auto h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 ${
                                  isActive ? 'text-white/70' : 'text-gray-400'
                                }`}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {submenu.map((subItem: any) => {
                                const SubIcon = subItem.icon;
                                const isSubActive = activeModule === subItem.id;
                                return (
                                  <SidebarMenuSubItem
                                    key={subItem.id}
                                    onClick={() => router.push(subItem.url)}
                                  >
                                    <SidebarMenuSubButton
                                      isActive={isSubActive}
                                      className={
                                        isSubActive
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                      }
                                    >
                                      <SubIcon className="h-4 w-4" />
                                      <span>{subItem.label}</span>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  }

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        onClick={() => router.push(`/partner/${item.id}`)}
                      >
                        <Icon />
                        <span>{item.label}</span>
                        {isActive && !isCollapsed && (
                          <ChevronRight className="h-3.5 w-3.5 ml-auto" />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-4">
        {isCollapsed ? (
          // Collapsed State - Compact View
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center relative">
              <CreditCard className="h-4 w-4 text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center border-2 border-white">
                !
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-gray-900 h-1.5 rounded-full"
                style={{ width: '84%' }}
              />
            </div>
          </div>
        ) : (
          // Expanded State - Full Card
          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/60 relative overflow-hidden p-4">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.03),transparent)]" />

            <div className="relative">
              <div className="flex items-start gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                  <CreditCard className="h-3.5 w-3.5 text-gray-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-900">Plano Startup</p>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs h-5">
                      84%
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    8.456 / 10.000 agendamentos
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <Progress value={84} className="h-1.5" />
              </div>

              <div className="flex items-center gap-1.5 bg-orange-50 rounded-lg p-2 border border-orange-100 mb-3">
                <Zap className="h-3.5 w-3.5 text-orange-600" />
                <p className="text-xs text-orange-900">
                  Próximo ao limite mensal
                </p>
              </div>

              <Button
                size="sm"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white shadow-sm h-9"
              >
                Fazer upgrade
              </Button>
            </div>
          </div>
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
