'use client';

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  Separator,
} from '@repo/ui';
import {
  Calendar,
  Check,
  Download,
  FileText,
  Mail,
  Shield,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCurrentPlan } from './current-plan.hook';

export function CurrentPlan() {
  const {
    currentPlan,
    paymentHistory,
    usagePercentage,
    storesUsagePercentage,
    usersUsagePercentage,
    isUnlimited,
    getStatusBadge,
    downloadPDF,
  } = useCurrentPlan();

  if (!currentPlan) return null;

  return (
    <div className="space-y-8">
      {/* Current Plan Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-gray-200">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Shield className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <CardTitle className="text-gray-900 mb-1">
                    Plano {currentPlan.planName}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    R$ {currentPlan.price}/
                    {currentPlan.billingPeriod === 'month' ? 'mês' : 'ano'}
                  </p>
                </div>
              </div>
              <Badge className="bg-green-50 text-green-700 border-green-200">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                  Ativo
                </div>
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Próxima cobrança
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {currentPlan.nextBillingDate
                        ? new Date(
                            currentPlan.nextBillingDate,
                          ).toLocaleDateString('pt-BR')
                        : 'Indefinida'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Valor</span>
                    <span className="text-gray-900">
                      R$ {currentPlan.price}
                    </span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm text-gray-900 mb-3">
                    Informações de Contato
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      general@ssnap.io
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm text-gray-900 mb-3">Uso do Plano</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Agendamentos este mês
                        </span>
                        {isUnlimited(currentPlan.maxSchedules) ? (
                          <Badge>Ilimitado</Badge>
                        ) : (
                          <span className="text-sm text-gray-900">
                            {currentPlan.schedulesLength}/
                            {currentPlan.maxSchedules}
                          </span>
                        )}
                      </div>
                      {!isUnlimited(currentPlan.maxSchedules) && (
                        <Progress value={usagePercentage} className="h-2" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Lojas ativas
                        </span>
                        {isUnlimited(currentPlan.maxStores) ? (
                          <Badge>Ilimitado</Badge>
                        ) : (
                          <span className="text-sm text-gray-900">
                            {currentPlan.storesLength}/{currentPlan.maxStores}
                          </span>
                        )}
                      </div>
                      {!isUnlimited(currentPlan.maxStores) && (
                        <Progress
                          value={storesUsagePercentage}
                          className="h-2"
                        />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Usuários ativos
                        </span>
                        {isUnlimited(currentPlan.maxUsers) ? (
                          <Badge>Ilimitado</Badge>
                        ) : (
                          <span className="text-sm text-gray-900">
                            {currentPlan.storeMembersLength}/
                            {currentPlan.maxUsers}
                          </span>
                        )}
                      </div>
                      {!isUnlimited(currentPlan.maxUsers) && (
                        <Progress
                          value={usersUsagePercentage}
                          className="h-2"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features Included */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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

      {/* Payment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Histórico de Pagamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentHistory.map((payment) => {
                const statusConfig = getStatusBadge(payment.status);
                return (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white rounded-lg border border-gray-200">
                        <Calendar className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">
                          {payment.invoiceNumber}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(payment.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-900">R$ {payment.amount}</span>
                      <Badge
                        variant="outline"
                        className={statusConfig.className}
                      >
                        {statusConfig.label}
                      </Badge>
                      <button
                        onClick={() =>
                          downloadPDF(payment.pdfUrl, payment.invoiceNumber)
                        }
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Baixar PDF da fatura"
                      >
                        <Download className="h-4 w-4 text-gray-600 hover:text-gray-900" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
