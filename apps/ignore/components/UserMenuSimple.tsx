import { useState } from 'react';
import {
  User,
  LogIn,
  LogOut,
  Store,
  Calendar,
  HelpCircle,
  ChevronDown,
  Settings,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { UserType } from './AuthModal';

interface UserMenuSimpleProps {
  isLoggedIn?: boolean;
  userType?: UserType | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onGoToDashboard?: () => void;
  onGoToProfile?: () => void;
}

export function UserMenuSimple({
  isLoggedIn = false,
  userType,
  onLogin,
  onLogout,
  onGoToDashboard,
  onGoToProfile,
}: UserMenuSimpleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    setIsOpen(false);
    onLogin?.();
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout?.();
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="flex items-center gap-2 border-gray-200 hover:border-[#20b2aa] hover:text-[#20b2aa] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="h-4 w-4" />
        <span>{isLoggedIn ? 'Minha Conta' : 'Entrar'}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {isOpen && (
        <>
          {/* Overlay para fechar o menu ao clicar fora */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu dropdown */}
          <Card className="absolute right-0 top-full mt-2 w-64 p-3 z-50 shadow-lg border">
            {!isLoggedIn ? (
              <>
                {/* Seção de Login/Cadastro */}
                <div className="p-3 bg-gradient-to-r from-[#1a2b4c]/5 to-[#20b2aa]/5 rounded-lg mb-3">
                  <h4 className="text-[#1a2b4c] mb-2">Seja bem-vindo!</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Faça login ou cadastre-se para agendar seus serviços
                    favoritos
                  </p>

                  <Button
                    size="sm"
                    className="w-full bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white"
                    onClick={handleLogin}
                  >
                    <LogIn className="h-3 w-3 mr-2" />
                    Entrar ou Cadastrar
                  </Button>
                </div>

                <div className="border-t border-gray-200 mb-3"></div>
              </>
            ) : (
              <>
                {/* Header do usuário logado */}
                <div className="p-3 bg-gradient-to-r from-[#20b2aa]/5 to-[#1a2b4c]/5 rounded-lg mb-3">
                  <h4 className="text-[#1a2b4c] mb-1">Olá! 👋</h4>
                  <p className="text-sm text-gray-600">
                    {userType === 'provider'
                      ? 'Conta Prestador'
                      : 'Conta Cliente'}
                  </p>
                </div>

                <div className="border-t border-gray-200 mb-3"></div>
              </>
            )}

            {/* Opções para usuários */}
            {isLoggedIn && userType === 'client' && (
              <div
                className="p-2 rounded-md hover:bg-[#20b2aa]/10 cursor-pointer transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  onGoToProfile?.();
                }}
              >
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 text-[#20b2aa] mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm">Meu Perfil</div>
                    <div className="text-xs text-gray-500">
                      Dados pessoais e favoritos
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isLoggedIn && (
              <div
                className="p-2 rounded-md hover:bg-[#20b2aa]/10 cursor-pointer transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-[#20b2aa] mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm">Meus Agendamentos</div>
                    <div className="text-xs text-gray-500">
                      Veja e gerencie suas reservas
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(!isLoggedIn || userType === 'client') && (
              <div
                className="p-2 rounded-md hover:bg-[#20b2aa]/10 cursor-pointer transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-start gap-3">
                  <Store className="h-4 w-4 text-[#1a2b4c] mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm">Anunciar Serviços</div>
                    <div className="text-xs text-gray-500">
                      Cadastre seu negócio no ServiceSnap
                    </div>
                  </div>
                </div>
              </div>
            )}

            {userType === 'provider' && (
              <div
                className="p-2 rounded-md hover:bg-[#1a2b4c]/10 cursor-pointer transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  onGoToDashboard?.();
                }}
              >
                <div className="flex items-start gap-3">
                  <Settings className="h-4 w-4 text-[#1a2b4c] mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm">Gerenciar Agenda</div>
                    <div className="text-xs text-gray-500">
                      Dashboard do prestador
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 my-3"></div>

            <div
              className="p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="h-4 w-4 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm">Central de Ajuda</div>
                  <div className="text-xs text-gray-500">Dúvidas e suporte</div>
                </div>
              </div>
            </div>

            {isLoggedIn && (
              <>
                <div className="border-t border-gray-200 my-3"></div>
                <div
                  className="p-2 rounded-md hover:bg-red-50 cursor-pointer transition-colors"
                  onClick={handleLogout}
                >
                  <div className="flex items-start gap-3">
                    <LogOut className="h-4 w-4 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm text-red-600">Sair</div>
                      <div className="text-xs text-gray-500">
                        Fazer logout da conta
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
