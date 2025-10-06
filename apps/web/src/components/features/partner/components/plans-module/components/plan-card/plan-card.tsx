import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui';
import { Check, Crown } from 'lucide-react';
import type { TPlanCardConfig } from './plan-card.types';

export const PlanCard = ({ plan, onSelect }: TPlanCardConfig) => {
  return (
    <Card
      className={`relative ${plan.highlight ? 'border-[#20b2aa] ring-2 ring-[#20b2aa]/20' : ''}`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-[#20b2aa] text-white">
            <Crown className="h-3 w-3 mr-1" />
            Mais Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-[#1a2b4c] text-xl">{plan.name}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl text-[#1a2b4c]">R$ {plan.price}</span>
          <span className="text-gray-600">/{plan.period}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Ideal para negócios com até {plan.maxStores} lojas
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="h-4 w-4 text-[#20b2aa] flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <Button
            className={`w-full ${
              plan.highlight
                ? 'bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white'
                : 'bg-[#1a2b4c] hover:bg-[#1a2b4c]/90 text-white'
            }`}
            onClick={() => onSelect(plan.id)}
          >
            Escolher {plan.name}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
