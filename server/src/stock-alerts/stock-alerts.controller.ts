import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { StockAlertsService } from './stock-alerts.service';
import { CreateStockAlertDto } from './dto/create-stock-alert.dto';
import { UpdateStockAlertDto } from './dto/update-stock-alert.dto';

@Controller('stock-alerts')
export class StockAlertsController {
  constructor(private readonly stockAlertsService: StockAlertsService) {}

  @Post()
  async create(@Body() createStockAlertDto: CreateStockAlertDto) {
    return await this.stockAlertsService.create(createStockAlertDto);
  }

  @Get()
  async findAll() {
    return await this.stockAlertsService.findAll();
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return await this.stockAlertsService.findByUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.stockAlertsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStockAlertDto: UpdateStockAlertDto) {
    return await this.stockAlertsService.update(id, updateStockAlertDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.stockAlertsService.remove(id);
  }
}
