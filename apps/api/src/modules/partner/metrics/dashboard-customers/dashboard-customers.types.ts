/**
 * SQL Result Types para Dashboard de Clientes
 * Tipos de retorno das queries SQL parametrizadas
 */

export interface CustomerBaseResult {
  current_customers: number;
  prev_customers: number;
  new_customers_period: number;
}

export interface RetentionRateResult {
  prev_customers_count: number;
  current_returned_count: number;
  before_prev_count: number;
  prev_returned_count: number;
}

export interface AverageLTVResult {
  current_ltv: number;
  prev_ltv: number;
}

export interface NPSScoreResult {
  current_nps: number;
  review_count: number;
  prev_nps: number;
}

export interface CustomerEvolutionResult {
  month_name: string;
  new_customers: number;
  recurring_customers: number;
  churn: number;
  total_customers: number;
}

export interface LTVBySegmentResult {
  segment: 'VIPs' | 'Frequentes' | 'Regulares' | 'Ocasionais' | 'Novos';
  customer_count: number;
  average_ltv: number;
  average_monthly_visits: number;
  retention_rate: number;
}

export interface TopVIPCustomerResult {
  customer_id: string;
  customer_name: string;
  visits: number;
  total_spent: number;
  last_visit: Date;
}
