import { useState, useEffect } from "react";
import { User, Check, AlertTriangle, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { SelectedService, Professional } from "../NewBookingFlow";

interface ProfessionalSelectionStepProps {
  selectedServices: SelectedService[];
  selectedProfessional: Professional | null;
  isAnyProfessional: boolean;
  onProfessionalChange: (professional: Professional | null, isAny: boolean) => void;
  onValidationError: (error: string | null) => void;
}

export function ProfessionalSelectionStep({
  selectedServices,
  selectedProfessional,
  isAnyProfessional,
  onProfessionalChange,
  onValidationError
}: ProfessionalSelectionStepProps) {
  // Mock data - substituir por dados reais
  const mockProfessionals: Professional[] = [
    {
      id: '1',
      name: 'Carlos Silva',
      specialties: ['Cortes Masculinos', 'Barba'],
      availableServices: ['1', '2', '3'] // IDs dos serviços que pode realizar
    },
    {
      id: '2',
      name: 'Ana Costa',
      specialties: ['Cabelo Feminino', 'Tratamentos'],
      availableServices: ['1', '4', '5', '6']
    },
    {
      id: '3',
      name: 'João Pereira',
      specialties: ['Estética Masculina'],
      availableServices: ['1', '2', '3']
    },
    {
      id: '4',
      name: 'Maria Santos',
      specialties: ['Tratamentos Capilares'],
      availableServices: ['4', '5', '6']
    }
  ];

  const [compatibilityStatus, setCompatibilityStatus] = useState<{
    canUseAny: boolean;
    availableProfessionals: Professional[];
    hasIncompatibleCombination: boolean;
  }>({
    canUseAny: true,
    availableProfessionals: mockProfessionals,
    hasIncompatibleCombination: false
  });

  useEffect(() => {
    analyzeCompatibility();
  }, [selectedServices]);

  const analyzeCompatibility = () => {
    if (selectedServices.length === 0) {
      setCompatibilityStatus({
        canUseAny: true,
        availableProfessionals: mockProfessionals,
        hasIncompatibleCombination: false
      });
      onValidationError(null);
      return;
    }

    const selectedServiceIds = selectedServices.map(s => s.id);
    
    // Verificar quais profissionais podem realizar TODOS os serviços selecionados
    const professionalsWhoCanDoAll = mockProfessionals.filter(professional =>
      selectedServiceIds.every(serviceId =>
        professional.availableServices.includes(serviceId)
      )
    );

    // Verificar quais profissionais podem realizar PELO MENOS UM dos serviços
    const professionalsWhoCanDoSome = mockProfessionals.filter(professional =>
      selectedServiceIds.some(serviceId =>
        professional.availableServices.includes(serviceId)
      )
    );

    const canUseAny = professionalsWhoCanDoAll.length > 0;
    const hasIncompatibleCombination = professionalsWhoCanDoSome.length === 0;

    setCompatibilityStatus({
      canUseAny,
      availableProfessionals: professionalsWhoCanDoSome,
      hasIncompatibleCombination
    });

    // Configurar mensagens de validação
    if (hasIncompatibleCombination) {
      onValidationError("Esta combinação de serviços não pode ser realizada por nenhum profissional desta unidade. Por favor, volte ao Passo 1 e remova um serviço para prosseguir.");
    } else if (!canUseAny && professionalsWhoCanDoSome.length > 0) {
      onValidationError(null); // Erro será mostrado como info, não como bloqueio
    } else {
      onValidationError(null);
    }

    // Reset da seleção se não for mais válida
    if (isAnyProfessional && !canUseAny) {
      onProfessionalChange(null, false);
    } else if (selectedProfessional && !professionalsWhoCanDoSome.find(p => p.id === selectedProfessional.id)) {
      onProfessionalChange(null, false);
    }
  };

  const handleAnyProfessionalSelect = () => {
    if (compatibilityStatus.canUseAny) {
      onProfessionalChange(null, true);
    }
  };

  const handleProfessionalSelect = (professional: Professional) => {
    onProfessionalChange(professional, false);
  };

  const canProfessionalDoAllServices = (professional: Professional) => {
    const selectedServiceIds = selectedServices.map(s => s.id);
    return selectedServiceIds.every(serviceId =>
      professional.availableServices.includes(serviceId)
    );
  };

  const getServicesForProfessional = (professional: Professional) => {
    return selectedServices.filter(service =>
      professional.availableServices.includes(service.id)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl text-[#1a2b4c] mb-2">Escolha o profissional</h2>
        <p className="text-gray-600">Selecione um profissional ou deixe o sistema escolher automaticamente</p>
      </div>

      {/* Informações de compatibilidade */}
      {!compatibilityStatus.canUseAny && !compatibilityStatus.hasIncompatibleCombination && (
        <Card className="p-4 border-blue-200 bg-blue-50">
          <div className="flex items-start gap-3 text-blue-800">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm mb-1">
                <strong>Atenção:</strong> A combinação de serviços selecionados exige profissionais específicos.
              </p>
              <p className="text-xs text-blue-700">
                Escolha um dos profissionais listados abaixo para continuar.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Opção "Qualquer Profissional" */}
      <Card 
        className={`p-4 cursor-pointer transition-all ${
          compatibilityStatus.canUseAny
            ? isAnyProfessional
              ? 'border-[#20b2aa] bg-[#20b2aa]/5'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
        }`}
        onClick={compatibilityStatus.canUseAny ? handleAnyProfessionalSelect : undefined}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              compatibilityStatus.canUseAny
                ? 'bg-[#20b2aa]/20'
                : 'bg-gray-200'
            }`}>
              <User className={`h-5 w-5 ${
                compatibilityStatus.canUseAny ? 'text-[#20b2aa]' : 'text-gray-400'
              }`} />
            </div>
            
            <div>
              <h4 className={`${
                compatibilityStatus.canUseAny ? 'text-[#1a2b4c]' : 'text-gray-400'
              }`}>
                Qualquer Profissional
              </h4>
              <p className={`text-sm ${
                compatibilityStatus.canUseAny ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {compatibilityStatus.canUseAny 
                  ? 'O sistema escolherá o melhor profissional disponível'
                  : 'Não disponível para esta combinação de serviços'
                }
              </p>
            </div>
          </div>
          
          {isAnyProfessional && compatibilityStatus.canUseAny && (
            <div className="w-6 h-6 bg-[#20b2aa] rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </Card>

      {/* Lista de Profissionais */}
      <div className="space-y-3">
        <h3 className="text-sm text-gray-700">Ou escolha um profissional específico:</h3>
        
        {compatibilityStatus.availableProfessionals.map(professional => {
          const canDoAll = canProfessionalDoAllServices(professional);
          const availableServices = getServicesForProfessional(professional);
          const isSelected = selectedProfessional?.id === professional.id;
          
          return (
            <Card
              key={professional.id}
              className={`p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#20b2aa] bg-[#20b2aa]/5'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleProfessionalSelect(professional)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1a2b4c]/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-[#1a2b4c]" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[#1a2b4c]">{professional.name}</h4>
                      {!canDoAll && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Parcial
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {professional.specialties.join(' • ')}
                    </p>
                    
                    {!canDoAll && (
                      <p className="text-xs text-gray-500">
                        Pode realizar: {availableServices.map(s => s.name).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                
                {isSelected && (
                  <div className="w-6 h-6 bg-[#20b2aa] rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Resumo da seleção */}
      {(selectedProfessional || isAnyProfessional) && (
        <Card className="p-4 bg-[#20b2aa]/10 border-[#20b2aa]/20">
          <h4 className="text-[#1a2b4c] mb-2">Seleção confirmada:</h4>
          {isAnyProfessional ? (
            <p className="text-sm text-gray-700">
              Qualquer profissional disponível realizará todos os serviços selecionados.
            </p>
          ) : selectedProfessional && (
            <div className="space-y-1">
              <p className="text-sm text-gray-700">
                <strong>{selectedProfessional.name}</strong> realizará{' '}
                {canProfessionalDoAllServices(selectedProfessional) 
                  ? 'todos os serviços selecionados'
                  : 'os serviços compatíveis'
                }.
              </p>
              {!canProfessionalDoAllServices(selectedProfessional) && (
                <p className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded">
                  Alguns serviços podem precisar ser reagendados com outro profissional.
                </p>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}