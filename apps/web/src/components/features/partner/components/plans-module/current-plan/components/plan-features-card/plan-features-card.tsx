'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { useSubscriptionQuery } from '@/hooks/use-query/use-subscription-query';
import { Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface PlanFeaturesCardProps {
  delay?: number;
}

export function PlanFeaturesCard({ delay = 0.1 }: PlanFeaturesCardProps) {
  const { currentPlan } = useSubscriptionQuery();

  if (!currentPlan) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Recursos Incluídos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPlan.marketingFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <Check className="h-5 w-5 text-gray-900 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
