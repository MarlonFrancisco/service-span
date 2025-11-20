'use client';

import { BillingToggle } from '@/components/features/pricing/billing-toggle';
import { ROICalculator } from '@/components/features/roi-calculator';
import { PlanCard } from '@/components/ui';
import {
  Alert,
  AlertDescription,
  Badge,
  Card,
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/ui';
import { Crown, Sparkles } from 'lucide-react';
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
    type,
    setType,
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

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <BillingToggle value={type} onChange={setType} />
      </div>

      {/* Plans Carousel */}
      <div className="max-w-7xl mx-auto">
        <Carousel
          opts={{
            slidesToScroll: 1,
            active: true,
            align: 'start',
          }}
          className="-mx-4"
        >
          <CarouselContent className="pt-3 px-4 items-stretch">
            {plans?.map((plan, index) => {
              const isCurrentPlan =
                plan.id === currentPlan?.planId &&
                plan.interval === currentPlan?.billingPeriod;
              const isUpgrade =
                plans.findIndex((p) => p.id === plan.id) >
                plans.findIndex((p) => p.id === currentPlan?.planId);

              const buttonText = isCurrentPlan
                ? 'Seu plano atual'
                : isUpgrade
                  ? 'Fazer upgrade'
                  : 'Assinar plano';

              return (
                <CarouselItem
                  key={plan.id}
                  className="pl-4 basis-[85%] lg:basis-[calc(100%/3.5)]"
                >
                  <PlanCard
                    plan={plan}
                    index={index}
                    isCurrentPlan={isCurrentPlan}
                    customButtonText={buttonText}
                    onSelectPlan={handleSelectPlan}
                    isLoading={isCreatingSubscription}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
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
