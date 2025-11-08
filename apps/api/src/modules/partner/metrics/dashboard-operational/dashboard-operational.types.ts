/**
 * SQL Result Types para Dashboard Operational
 * Tipos de retorno das queries SQL parametrizadas
 */

// Occupancy rate calculation
export interface OccupancyRateResult {
  current_occupancy: number;
  prev_occupancy: number;
}

// Average time calculation
export interface AverageTimeResult {
  current_avg_duration: number;
  prev_avg_duration: number;
}

// Team efficiency calculation
export interface TeamEfficiencyResult {
  current_efficiency: number;
  prev_efficiency: number;
}

// Punctuality rate calculation
export interface PunctualityRateResult {
  current_punctuality: number;
  prev_punctuality: number;
  current_no_show_rate: number;
  prev_no_show_rate: number;
}

// Daily capacity utilization
export interface DailyCapacityUtilizationResult {
  day_of_week: number;
  appointments: number;
  utilization_percentage: number;
  avg_duration: number;
}

// Appointment status
export interface AppointmentStatusResult {
  completed: number;
  scheduled: number;
  no_show: number;
  cancelled: number;
  total: number;
}

// Service duration
export interface ServiceDurationResult {
  service_id: string;
  service_name: string;
  avg_duration: number;
  appointments: number;
}

// Period distribution
export interface PeriodDistributionResult {
  period_part: string;
  current_appointments: number;
  prev_appointments: number;
}

// Occupancy heatmap
export interface OccupancyHeatMapResult {
  hour: number;
  day_of_week: number;
  appointments: number;
}

// Idle time opportunities
export interface IdleTimeOpportunitiesResult {
  hour: number;
  total_appointments: number;
  utilization_percentage: number;
}

// Professional performance
export interface ProfessionalPerformanceResult {
  professional_id: string;
  professional_name: string;
  total_appointments: number;
  completed_appointments: number;
  no_show_count: number;
  avg_service_duration: number;
  total_revenue: number;
}
