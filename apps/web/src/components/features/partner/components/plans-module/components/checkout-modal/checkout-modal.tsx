import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from '@repo/ui';
import { CreditCard, Lock } from 'lucide-react';
import type { TCheckoutModalConfig } from './checkout-modal.types';

export const CheckoutModal = ({
  isOpen,
  plan,
  onClose,
}: TCheckoutModalConfig) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#1a2b4c] flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Finalizar Assinatura
          </DialogTitle>
        </DialogHeader>

        {plan && (
          <div className="space-y-6">
            {/* Plan Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-[#1a2b4c] mb-2">Resumo do Plano</h4>
              <div className="flex justify-between items-center">
                <span className="text-sm">Plano {plan.name}</span>
                <span className="text-[#1a2b4c]">R$ {plan.price}/mês</span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Cobrança recorrente mensal. Cancele quando quiser.
              </p>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lock className="h-4 w-4" />
                <span>Pagamento 100% seguro</span>
              </div>

              <div>
                <Label>Número do Cartão</Label>
                <Input placeholder="**** **** **** ****" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Validade</Label>
                  <Input placeholder="MM/AA" />
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input placeholder="123" />
                </div>
              </div>

              <div>
                <Label>Nome no Cartão</Label>
                <Input placeholder="Nome completo" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button className="flex-1 bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
                <Lock className="h-4 w-4 mr-2" />
                Confirmar Pagamento
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
