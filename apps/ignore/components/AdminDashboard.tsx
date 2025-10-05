import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { StoreSelector } from './StoreSelector';
import { DashboardOverview } from './DashboardOverview';
import { StoresModule } from './StoresModule';
import { AgendaModule } from './AgendaModule';
import { ServicesModule } from './ServicesModule';
import { PlansModule } from './PlansModule';
import { NotificationsModule } from './NotificationsModule';

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [activeModule, setActiveModule] = useState<
    'dashboard' | 'stores' | 'services' | 'agenda' | 'plans' | 'notifications'
  >('dashboard');
  const [activeStore, setActiveStore] = useState({
    id: '1',
    name: 'Loja Centro',
    address: 'Rua das Flores, 123',
  });

  const stores = [
    {
      id: '1',
      name: 'Loja Centro',
      address: 'Rua das Flores, 123',
    },
    {
      id: '2',
      name: 'Loja Shopping',
      address: 'Shopping Center, Loja 45',
    },
    {
      id: '3',
      name: 'Loja Zona Sul',
      address: 'Av. Principal, 567',
    },
  ];

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardOverview activeStore={activeStore} />;
      case 'stores':
        return <StoresModule stores={stores} />;
      case 'services':
        return <ServicesModule activeStore={activeStore} />;
      case 'agenda':
        return <AgendaModule activeStore={activeStore} />;
      case 'plans':
        return <PlansModule />;
      case 'notifications':
        return <NotificationsModule activeStore={activeStore.name} />;
      default:
        return <DashboardOverview activeStore={activeStore} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        onBack={onBack}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-[#1a2b4c] text-xl">
                {activeModule === 'dashboard' && 'Painel de Controle'}
                {activeModule === 'stores' && 'Gerenciar Lojas'}
                {activeModule === 'services' && 'Serviços'}
                {activeModule === 'agenda' && 'Agenda'}
                {activeModule === 'plans' && 'Planos e Assinatura'}
              </h1>
            </div>

            {/* Store Selector - Only show for modules that need it */}
            {(activeModule === 'dashboard' ||
              activeModule === 'services' ||
              activeModule === 'notifications' ||
              activeModule === 'agenda') && (
              <StoreSelector
                stores={stores}
                activeStore={activeStore}
                onStoreChange={setActiveStore}
              />
            )}
          </div>
        </div>

        {/* Module Content */}
        <div className="flex-1 p-6">{renderActiveModule()}</div>
      </div>
    </div>
  );
}
