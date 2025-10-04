import { Calendar, Building2, Users, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { UserType } from "../AuthModal";

interface ProfileSelectionStepProps {
  onSelect: (userType: UserType) => void;
}

export function ProfileSelectionStep({ onSelect }: ProfileSelectionStepProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 text-center">
        <h2 className="text-xl text-[#1a2b4c] mb-2">Qual é o seu objetivo na plataforma?</h2>
        <p className="text-gray-600">Escolha a opção que melhor descreve como você pretende usar o ServiceSnap</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Cliente */}
        <Card 
          className="p-6 cursor-pointer border-2 border-gray-200 hover:border-[#20b2aa] hover:bg-[#20b2aa]/5 transition-all group"
          onClick={() => onSelect('client')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#20b2aa]/10 rounded-xl flex items-center justify-center group-hover:bg-[#20b2aa]/20 transition-colors">
              <Calendar className="h-6 w-6 text-[#20b2aa]" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-[#1a2b4c] mb-1">Quero agendar serviços</h3>
              <p className="text-sm text-gray-600 mb-3">
                Buscar e agendar serviços como salão de beleza, consultórios, personal trainers e muito mais
              </p>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-500">Para usuários finais</span>
              </div>
            </div>
            
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#20b2aa] transition-colors" />
          </div>
        </Card>

        {/* Prestador */}
        <Card 
          className="p-6 cursor-pointer border-2 border-gray-200 hover:border-[#1a2b4c] hover:bg-[#1a2b4c]/5 transition-all group"
          onClick={() => onSelect('provider')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1a2b4c]/10 rounded-xl flex items-center justify-center group-hover:bg-[#1a2b4c]/20 transition-colors">
              <Building2 className="h-6 w-6 text-[#1a2b4c]" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-[#1a2b4c] mb-1">Quero oferecer meus serviços</h3>
              <p className="text-sm text-gray-600 mb-3">
                Cadastrar minha empresa, gerenciar agendamentos e alcançar novos clientes na plataforma
              </p>
              
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-500">Para empresas e profissionais</span>
              </div>
            </div>
            
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#1a2b4c] transition-colors" />
          </div>
        </Card>

        <div className="pt-4">
          <p className="text-xs text-center text-gray-500 leading-relaxed">
            Você poderá alterar essa configuração a qualquer momento nas configurações da sua conta
          </p>
        </div>
      </div>
    </div>
  );
}