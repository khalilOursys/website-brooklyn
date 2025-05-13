import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get('getOrderType/:type')
  async findAll(@Param('type') type: number) {
    return await this.ordersService.findAll(type);
  }

  @Get('getOrderById/:id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(id);
  }

  @Get('getOrderByIdUser/:userId')
  async getOrderByIdUser(@Param('userId') userId: string) {
    return await this.ordersService.getOrdersByUserId(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(id);
  }
}
