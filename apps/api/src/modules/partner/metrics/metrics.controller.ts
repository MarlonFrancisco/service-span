import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { DashboardOverviewService } from './dashboard-overview/dashboard-overview.service';
import { DashboardSalesService } from './dashboard-sales/dashboard-sales.service';

type OverviewPeriodType = 'today' | 'week' | 'month';
type SalesPeriodType = 'week' | 'month' | 'quarter';

@Controller('partner/stores/:storeId/metrics')
@UseGuards(JwtAuthGuard)
export class MetricsController {
  constructor(
    private readonly dashboardOverviewService: DashboardOverviewService,
    private readonly dashboardSalesService: DashboardSalesService,
  ) {}

  /**
   * GET /partner/stores/:storeId/metrics/overview?period=week
   * Dashboard 1 - Visão Geral com todas as métricas principais
   * @param storeId - ID da loja
   * @param period - Período para análise: 'today' (hoje), 'week' (esta semana), 'month' (este mês). Padrão: 'week'
   */
  @Get('overview')
  async getDashboard1Overview(
    @Param('storeId') storeId: string,
    @Query('period') period: OverviewPeriodType = 'week',
  ) {
    // Validar período
    const validPeriods: OverviewPeriodType[] = ['today', 'week', 'month'];
    const normalizedPeriod = validPeriods.includes(period) ? period : 'week';

    return this.dashboardOverviewService.getDashboardOverview(
      storeId,
      normalizedPeriod,
    );
  }

  /**
   * GET /partner/stores/:storeId/metrics/sales?period=month
   * Dashboard 2 - Vendas & Receita com todas as métricas de vendas
   * @param storeId - ID da loja
   * @param period - Período para análise: 'week' (esta semana), 'month' (este mês), 'quarter' (este trimestre). Padrão: 'month'
   */
  @Get('sales')
  async getDashboardSales(
    @Param('storeId') storeId: string,
    @Query('period') period: SalesPeriodType = 'month',
  ) {
    // Validar período
    const validPeriods: SalesPeriodType[] = ['week', 'month', 'quarter'];
    const normalizedPeriod = validPeriods.includes(period) ? period : 'month';

    return this.dashboardSalesService.getDashboardSales(
      storeId,
      normalizedPeriod,
    );
  }
}
