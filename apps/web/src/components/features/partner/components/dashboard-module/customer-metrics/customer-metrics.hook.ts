import { useMetricsQuery } from '@/hooks/use-query/use-metrics-query/use-metrics-query.hook';
import { usePartnerStore } from '@/store/partner/partner.store';
import { PeriodType } from '@/types/api/metrics.types';
import { useState } from 'react';

type ViewMode = 'overview' | 'segments' | 'churn';

export function useCustomerMetrics() {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [period, setPeriod] = useState<PeriodType>('month');

  const activeStore = usePartnerStore((state) => state.activeStore);

  const periodLabels = {
    week: 'Esta Semana',
    month: 'Este Mês',
    quarter: 'Trimestre',
  };

  const getComparisonText = () => {
    const textMap: Record<PeriodType, string> = {
      today: 'vs dia anterior',
      week: 'vs semana passada',
      month: 'vs mês anterior',
      quarter: 'vs trimestre anterior',
    };
    return textMap[period];
  };

  const { customers, isPendingCustomers } = useMetricsQuery({
    storeId: activeStore?.id,
    period,
    includeCustomers: true,
  });

  const stats = [
    {
      label: 'Base de Clientes',
      value: customers?.customerBase?.value?.toLocaleString() || '0',
      icon: 'Users',
      trend: `${customers?.customerBase?.percentageChange > 0 ? '+' : ''}${customers?.customerBase?.percentageChange || 0}%`,
      trendUp: (customers?.customerBase?.percentageChange || 0) > 0,
      comparison: 'vs mês anterior',
      detail: '',
    },
    {
      label: 'Taxa de Retenção',
      value: `${customers?.retentionRate?.value || 0}%`,
      icon: 'Heart',
      trend: `${customers?.retentionRate?.percentageChange > 0 ? '+' : ''}${customers?.retentionRate?.percentageChange || 0}%`,
      trendUp: (customers?.retentionRate?.percentageChange || 0) > 0,
      comparison: 'vs mês anterior',
      detail: customers?.retentionRate?.classification || '',
    },
    {
      label: 'LTV Médio',
      value: `R$ ${customers?.averageLTV?.value || 0}`,
      icon: 'DollarSign',
      trend: `${customers?.averageLTV?.percentageChange > 0 ? '+' : ''}${customers?.averageLTV?.percentageChange || 0}%`,
      trendUp: (customers?.averageLTV?.percentageChange || 0) > 0,
      comparison: 'vs mês anterior',
      detail: `CAC: R$ ${customers?.averageLTV?.cac || 0}`,
    },
    {
      label: 'NPS Score',
      value: `${customers?.npsScore?.value || 0}`,
      icon: 'Star',
      trend: `${customers?.npsScore?.absoluteChange > 0 ? '+' : ''}${customers?.npsScore?.absoluteChange || 0}`,
      trendUp: (customers?.npsScore?.absoluteChange || 0) > 0,
      comparison: 'vs mês anterior',
      detail: `${customers?.npsScore?.reviewCount || 0} avaliações`,
    },
  ];

  const retentionData =
    customers?.customerEvolution?.map((item) => ({
      month: item.month,
      new: item.newCustomers,
      returning: item.recurringCustomers,
      churn: item.churn,
      total: item.newCustomers + item.recurringCustomers,
    })) || [];

  const lifetimeValueData =
    customers?.ltvBySegment?.map((item) => ({
      segment: item.segment,
      ltv: item.averageLTV,
      customers: item.customerCount,
      avgVisits: item.averageMonthlyVisits,
      retention: item.retentionRate,
    })) || [];

  const topCustomers =
    customers?.topVIPCustomers?.map((item) => {
      const lastVisitDate = new Date(item.lastVisit);
      const daysAgo = Math.floor(
        (Date.now() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      const lastVisitText =
        daysAgo === 0
          ? 'Hoje'
          : daysAgo === 1
            ? 'Há 1 dia'
            : daysAgo < 7
              ? `Há ${daysAgo} dias`
              : daysAgo < 30
                ? `Há ${Math.floor(daysAgo / 7)} ${Math.floor(daysAgo / 7) === 1 ? 'semana' : 'semanas'}`
                : `Há ${Math.floor(daysAgo / 30)} ${Math.floor(daysAgo / 30) === 1 ? 'mês' : 'meses'}`;

      return {
        name: item.name,
        visits: item.visitCount,
        spent: item.totalSpent,
        lastVisit: lastVisitText,
        status: 'active',
        riskLevel: 'low',
      };
    }) || [];

  const rfmSegments =
    customers?.rfmSegmentation?.map((item) => {
      const colors = {
        Champions: '#10b981',
        Loyal: '#34d399',
        'At Risk': '#f59e0b',
        Lost: '#ef4444',
      };

      return {
        segment: item.segment,
        score: item.rfmScore,
        customers: item.customerCount,
        revenue: item.totalRevenue,
        color: colors[item.segment],
      };
    }) || [];

  const birthdayOpportunities =
    customers?.monthlyBirthdays?.slice(0, 4).map((item) => {
      const date = new Date(item.birthday);
      const formattedDate = `${date.getDate()} ${['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][date.getMonth()]}`;

      return {
        name: item.name,
        date: formattedDate,
        segment: item.segment,
        avgSpent: item.averageSpent,
      };
    }) || [];

  const churnRiskCustomers =
    customers?.customersAtRisk?.slice(0, 4).map((item) => {
      const lastVisitDate = new Date(item.lastVisit);
      const daysAgo = Math.floor(
        (Date.now() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      const lastVisitText = `Há ${daysAgo} dias`;

      return {
        name: item.name,
        lastVisit: lastVisitText,
        avgFrequency: 15, // Placeholder, pode ser derivado de item.averageFrequency
        spent: item.totalLTV,
        riskScore: item.riskScore,
        reason: item.riskReason,
      };
    }) || [];

  // Service preferences - usando dados do backend se disponível
  const servicePreferences =
    customers?.preferencesBySegment?.slice(0, 3).map((item) => {
      const prefs = item.preferences.reduce(
        (acc, pref) => {
          acc[pref.serviceType.toLowerCase()] = pref.percentage;
          return acc;
        },
        {} as Record<string, number>,
      );

      return {
        segment: item.segment,
        corte: prefs.corte || 0,
        barba: prefs.barba || 0,
        coloracao: prefs.coloracao || prefs['coloração'] || 0,
        outros: 0,
      };
    }) || [];

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-red-50 text-red-700 border-red-200';
    if (score >= 65) return 'bg-orange-50 text-orange-700 border-orange-200';
    return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  };

  return {
    viewMode,
    setViewMode,
    period,
    setPeriod,
    periodLabels,
    getComparisonText,
    stats,
    retentionData,
    lifetimeValueData,
    topCustomers,
    rfmSegments,
    birthdayOpportunities,
    churnRiskCustomers,
    servicePreferences,
    getRiskColor,
    isLoading: isPendingCustomers,
    customers,
    alerts: customers?.alerts,
  };
}
