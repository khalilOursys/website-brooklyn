import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getStatistics(
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    if (!start || !end) {
      return {
        message: 'Start and end dates are required.',
      };
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    return this.statisticsService.getStatisticsByProductAndBulk(
      startDate,
      endDate,
    );
  }
}
