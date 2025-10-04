import { useState, useEffect } from "react";
import { User, Check, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SelectedService, Professional } from "./BookingSidebar";

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
      availableServices: ['1', '2', '3']
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
    [professionalId: string]: {
      isCompatible: boolean;
      incompatibleServices: string[];
    };
  }>({});

  useEffect(() => {
    // Verificar compatibilidade de profissionais com serviços selecionados
    const status: { [key: string]: { isCompatible: boolean; incompatibleServices: string[] } } = {};

    mockProfessionals.forEach(professional => {
      const incompatibleServices: string[] = [];

      selectedServices.forEach(service => {
        if (!professional.availableServices.includes(service.id)) {
          incompatibleServices.push(service.name);
        }
      });

      status[professional.id] = {
        isCompatible: incompatibleServices.length === 0,
        incompatibleServices
      };
    });

    setCompatibilityStatus(status);
  }, [selectedServices]);

  const handleProfessionalSelect = (professional: Professional) => {
    const status = compatibilityStatus[professional.id];

    if (status?.isCompatible) {
      onProfessionalChange(professional, false);
      onValidationError(null);
    } else {
      onValidationError(`Este profissional não pode realizar: ${status?.incompatibleServices.join(', ')}`);
    }
  };

  const handleAnyProfessionalSelect = () => {
    onProfessionalChange(null, true);
    onValidationError(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl text-[#1a2b4c] mb-2">Escolha o profissional</h2>
        <p className="text-gray-600">Selecione um profissional ou deixe que o estabelecimento escolha por você</p>
      </div>

      {/* Any Professional Option */}
      <Card
        className={`p-4 cursor-pointer transition-all ${
          isAnyProfessional
            ? 'border-[#20b2aa] bg-[#20b2aa]/5'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}
        onClick={handleAnyProfessionalSelect}
      >
        <div className="flex items-center gap-4">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            isAnyProfessional
              ? 'border-[#20b2aa] bg-[#20b2aa]'
              : 'border-gray-300'
          }`}>
            {isAnyProfessional && <Check className="h-3 w-3 text-white" />}
          </div>
          <div className="flex-1">
            <h3 className="text-[#1a2b4c]">Qualquer profissional disponível</h3>
            <p className="text-sm text-gray-600">O estabelecimento escolherá o melhor profissional para você</p>
          </div>
        </div>
      </Card>

      {/* Professional Selection */}
      <div className="space-y-4">
        <h3 className="text-lg text-[#1a2b4c]">Profissionais disponíveis:</h3>

        {mockProfessionals.map(professional => {
          const status = compatibilityStatus[professional.id];
          const isSelected = selectedProfessional?.id === professional.id;

          return (
            <Card
              key={professional.id}
              className={`p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#20b2aa] bg-[#20b2aa]/5'
                  : status?.isCompatible
                    ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    : 'border-red-200 bg-red-50'
              }`}
              onClick={() => handleProfessionalSelect(professional)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? 'border-[#20b2aa] bg-[#20b2aa]'
                    : 'border-gray-300'
                }`}>
                  {isSelected && <Check className="h-3 w-3 text-white" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-[#1a2b4c]">{professional.name}</h4>
                    {!status?.isCompatible && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertTriangle className="h-3 w-3" />
                        <span className="text-xs">Incompatível</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    {professional.specialties.join(' • ')}
                  </p>

                  {!status?.isCompatible && status?.incompatibleServices.length > 0 && (
                    <div className="flex items-center gap-1 text-red-600">
                      <Info className="h-3 w-3" />
                      <span className="text-xs">
                        Não pode realizar: {status.incompatibleServices.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
