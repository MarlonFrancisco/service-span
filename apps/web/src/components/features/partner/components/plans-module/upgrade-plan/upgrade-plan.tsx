'use client';

import { ROICalculator } from '@/components/features/roi-calculator';
import { formatPrice } from '@/utils/helpers/price.helper';
import { Alert, AlertDescription, Badge, Button, Card } from '@repo/ui';
import { Check, Crown, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useUpgradePlan } from './upgrade-plan.hook';
import { UpgradePlanSkeleton } from './upgrade-plan.skeleton';

export function UpgradePlan() {
  const {
    plans,
    benefits,
    currentPlan,
    isPendingPlans,
    isCreatingSubscription,
    handleSelectPlan,
  } = useUpgradePlan();

  if (isPendingPlans) {
    return <UpgradePlanSkeleton />;
  }

  return (
    <div className="space-y-12">
      {/* Comparison Alert */}
      <Alert className="bg-gradient-to-r from-gray-50 to-white border-gray-200">
        <Crown className="h-5 w-5" />
        <AlertDescription>
          <div className="space-y-1">
            <p className="text-gray-900">
              Você está no plano <strong>{currentPlan?.planName}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Faça upgrade para desbloquear mais recursos e expandir seu negócio
            </p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {plans?.map((plan, index) => {
          const isCurrentPlan = plan.id === currentPlan?.planId;
          const isUpgrade =
            plans.findIndex((p) => p.id === plan.id) >
            plans.findIndex((p) => p.id === currentPlan?.planId);

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <Card
                className={`relative h-full p-8 ${
                  plan.popular
                    ? 'border-2 border-black shadow-xl'
                    : 'border border-gray-200'
                } ${isCurrentPlan ? 'opacity-75' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white">
                    Mais popular
                  </Badge>
                )}

                {isCurrentPlan && (
                  <Badge className="absolute -top-3 right-4 bg-gray-100 text-gray-700 border-gray-300">
                    Plano Atual
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
                    isCurrentPlan
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : plan.popular
                        ? 'bg-black hover:bg-gray-800 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  onClick={() =>
                    !isCurrentPlan && handleSelectPlan(plan.priceId)
                  }
                  disabled={isCurrentPlan || isCreatingSubscription}
                >
                  {isCurrentPlan
                    ? 'Seu plano atual'
                    : isUpgrade
                      ? 'Fazer upgrade'
                      : 'Escolher plano'}
                </Button>

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                      <span className={`text-sm text-gray-700`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* ROI Calculator Section */}
      <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 rounded-2xl p-8 border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-gray-200 mb-4">
              <Sparkles className="w-3 h-3 mr-1 inline" />
              Calculadora de ROI
            </Badge>
            <h2 className="text-3xl text-gray-900 mb-4">
              Calcule seu retorno sobre investimento
            </h2>
            <p className="text-lg text-gray-600">
              Veja quanto você pode economizar reduzindo no-shows com
              ServiceSnap
            </p>
          </div>

          <ROICalculator />
        </div>
      </div>

      {/* Why Upgrade Section */}
      <div>
        <div className="text-center mb-16">
          <h2 className="text-3xl text-gray-900 mb-4">
            Por que fazer upgrade?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desbloqueie recursos poderosos e leve seu negócio ao próximo nível
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-gray-200 p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
