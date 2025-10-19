import { formatPrice } from '@/utils/helpers/price.helper';
import { Badge, Button, Card } from '@repo/ui';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { usePlanCard } from './plan-card.hook';
import { IPlanCardProps } from './plan-card.types';

export const PlanCard = ({ plan, index }: IPlanCardProps) => {
  const { handleCreateSubscription } = usePlanCard({ priceId: plan.priceId });

  return (
    <motion.div
      key={plan.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="relative"
    >
      <Card
        className={`relative h-full p-8 ${
          plan.popular
            ? 'border-2 border-black shadow-xl'
            : 'border border-gray-200'
        }`}
      >
        {plan.popular && (
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white">
            Mais popular
          </Badge>
        )}

        <div className="mb-8">
          <h3 className="text-xl text-gray-900 mb-2">{plan.name}</h3>
          <p className="text-sm text-gray-600">{plan.description}</p>
        </div>

        <div className="mb-8">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl text-gray-900">
              {formatPrice(plan.price)}
            </span>
            <span className="text-gray-600">/mês</span>
          </div>
        </div>

        <Button
          className={`w-full mb-8 ${
            plan.popular
              ? 'bg-black hover:bg-gray-800 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          }`}
          onClick={handleCreateSubscription}
        >
          Assinar plano
        </Button>

        <ul className="space-y-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
};
