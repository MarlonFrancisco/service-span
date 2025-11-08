/**
 * SQL Result Types para Dashboard Overview
 * Tipos de retorno das queries SQL parametrizadas
 */

// Revenue calculation
export interface RevenueResult {
  current_revenue: number;
  prev_revenue: number;
}

// Average Rating calculation
export interface AverageRatingResult {
  avg_rating: number;
  review_count: number;
  prev_avg_rating: number;
}

// New Customers calculation
export interface NewCustomersResult {
  new_customers_count: number;
}

// Recurring Customers
export interface RecurringCustomersResult {
  recurring_count: number;
}

// Average Ticket
export interface AverageTicketResult {
  current_avg_ticket: number;
  current_completed_count: number;
  prev_avg_ticket: number;
  prev_completed_count: number;
}

// Occupation Rate
export interface OccupationRateResult {
  current_occupied: number;
  prev_occupied: number;
  period_days: number;
}

// Cancellation Rate
export interface CancellationRateResult {
  total_schedules: number;
  cancelled_count: number;
}

// Conversion Rate
export interface ConversionRateResult {
  completed_count: number;
  total_count: number;
}

// Appointments by Day
export interface AppointmentsByDayResult {
  day_of_week: number;
  total_appointments: number;
  completed_count: number;
  cancelled_count: number;
  total_revenue: number;
}

// Top Services
export interface TopServicesResult {
  service_id: string;
  service_name: string;
  bookings_count: number;
  total_revenue: number;
}
