/**
 * SQL Result Types para Dashboard Sales
 * Tipos de retorno das queries SQL parametrizadas
 */

// Revenue calculation
export interface RevenueResult {
  current_revenue: number;
  prev_revenue: number;
  current_count: number;
  prev_count: number;
}

// Average Ticket calculation
export interface AverageTicketResult {
  current_avg_ticket: number;
  prev_avg_ticket: number;
}

// Conversion Rate calculation
export interface ConversionRateResult {
  current_rate: number;
  prev_rate: number;
}

// Revenue Per Hour calculation
export interface RevenuePerHourResult {
  current_revenue_per_hour: number;
  prev_revenue_per_hour: number;
}

// Goal Progress calculation
export interface GoalProgressResult {
  current_revenue: number;
  target_goal: number;
  days_remaining: number;
}

// Revenue Evolution (6 months)
export interface RevenueEvolutionResult {
  month_date: Date;
  revenue: number;
  goal: number;
  appointments: number;
}

// Revenue by Day of Week
export interface RevenueByDayOfWeekResult {
  day_of_week: number;
  total_revenue: number;
  average_ticket: number;
  appointments: number;
}

// Revenue by Category
export interface RevenueByCategoryResult {
  id: string;
  name: string;
  revenue: number;
  growth_percentage: number;
}

// Top Services
export interface TopServicesResult {
  id: string;
  name: string;
  revenue: number;
  appointments: number;
  percentage_of_total: number;
  growth_percentage: number;
}

// Profitable Hours
export interface ProfitableHoursResult {
  hour: string;
  revenue: number;
  utilization_rate: number;
}

// Most Profitable Day (for insights)
export interface MostProfitableDayResult {
  day_of_week: number;
  avg_revenue: number;
}
