import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { DashboardOverviewService } from './dashboard-overview/dashboard-overview.service';

type PeriodType = 'today' | 'week' | 'month';

@Controller('partner/stores/:storeId/metrics')
@UseGuards(JwtAuthGuard)
export class MetricsController {
  constructor(
    private readonly dashboardOverviewService: DashboardOverviewService,
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
    @Query('period') period: PeriodType = 'week',
  ) {
    // Validar período
    const validPeriods: PeriodType[] = ['today', 'week', 'month'];
    const normalizedPeriod = validPeriods.includes(period) ? period : 'week';

    return this.dashboardOverviewService.getDashboardOverview(
      storeId,
      normalizedPeriod,
    );
  }
}
