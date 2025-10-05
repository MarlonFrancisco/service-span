import { User, LogIn, UserPlus, Store, Calendar, HelpCircle, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const router = useRouter();

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center hover:text-gray-900 transition-colors"
          >
            <Menu  className="size-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64 p-2 z-50"
          sideOffset={8}
        >
          {/* Seção de Login/Cadastro */}
          <div className="p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg mb-2">
            <h4 className="font-semibold text-gray-900 mb-2">Seja bem-vindo!</h4>
            <p className="text-sm text-gray-600 mb-3">
              Faça login ou cadastre-se para agendar seus serviços favoritos
            </p>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-[#1a2b4c] text-[#1a2b4c] hover:bg-[#1a2b4c] hover:text-white"
              >
                <LogIn className="h-3 w-3 mr-1" />
                Entrar
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white"
              >
                <UserPlus className="h-3 w-3 mr-1" />
                Cadastrar
              </Button>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Opções para usuários */}
          <DropdownMenuItem className="cursor-pointer">
            <Calendar className="h-4 w-4 mr-3 text-[#20b2aa]" />
            <div className="flex-1">
              <div>Meus Agendamentos</div>
              <div className="text-xs text-gray-500">Veja e gerencie suas reservas</div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={() => { }}>
            <Store className="h-4 w-4 mr-3 text-[#1a2b4c]" />
            <div className="flex-1">
              <div>Anunciar Serviços</div>
              <div className="text-xs text-gray-500">Cadastre seu negócio no ServiceSnap</div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <HelpCircle className="h-4 w-4 mr-3 text-gray-500" />
            <div className="flex-1">
              <div>Central de Ajuda</div>
              <div className="text-xs text-gray-500">Dúvidas e suporte</div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
