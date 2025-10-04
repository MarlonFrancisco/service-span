import {
  ArrowLeft,
  LayoutDashboard,
  Store,
  Calendar,
  Settings,
  CreditCard,
  BellRing,
} from "lucide-react";
import { Button } from "./ui/button";

interface AdminSidebarProps {
  activeModule: string;
  onModuleChange: (
    module:
      | "dashboard"
      | "stores"
      | "services"
      | "agenda"
      | "plans",
  ) => void;
  onBack: () => void;
}

export function AdminSidebar({
  activeModule,
  onModuleChange,
  onBack,
}: AdminSidebarProps) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Visão geral",
    },
    {
      id: "stores",
      label: "Minhas Lojas",
      icon: Store,
      description: "Gerenciar filiais",
    },
    {
      id: "services",
      label: "Serviços",
      icon: Settings,
      description: "Configurar ofertas",
    },
    {
      id: "agenda",
      label: "Agenda",
      icon: Calendar,
      description: "Horários e agendamentos",
    },
    {
      id: "plans",
      label: "Planos",
      icon: CreditCard,
      description: "Assinatura e cobrança",
    },
    {
      id: "notifications",
      label: "Notificações",
      icon: BellRing,
      description: "Lembretes automatizados",
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="w-full justify-start text-[#1a2b4c] hover:bg-[#1a2b4c]/10 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Site
        </Button>

        <div>
          <h2 className="text-[#1a2b4c] text-lg">ServiceSnap</h2>
          <p className="text-sm text-gray-600">
            Painel Administrativo
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id as any)}
                className={`
                  w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3
                  ${
                    isActive
                      ? "bg-[#1a2b4c] text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <Icon
                  className={`h-5 w-5 mt-0.5 ${isActive ? "text-white" : "text-[#1a2b4c]"}`}
                />
                <div className="flex-1">
                  <div
                    className={`text-sm ${isActive ? "text-white" : "text-gray-900"}`}
                  >
                    {item.label}
                  </div>
                  <div
                    className={`text-xs ${isActive ? "text-gray-200" : "text-gray-500"}`}
                  >
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Versão 2.0.1
        </div>
      </div>
    </div>
  );
}