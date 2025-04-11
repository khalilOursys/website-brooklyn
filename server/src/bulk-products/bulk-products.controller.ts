import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { BulkProductsService } from './bulk-products.service';
import { CreateBulkProductDto } from './dto/create-bulk-product.dto';
import { UpdateBulkProductDto } from './dto/update-bulk-product.dto';

@Controller('bulk-products')
export class BulkProductsController {
  constructor(private readonly bulkProductsService: BulkProductsService) {}

  @Post()
  async create(@Body() createBulkProductDto: CreateBulkProductDto) {
    return await this.bulkProductsService.create(createBulkProductDto);
  }

  @Get()
  async findAll() {
    return await this.bulkProductsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bulkProductsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBulkProductDto: UpdateBulkProductDto) {
    return await this.bulkProductsService.update(id, updateBulkProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bulkProductsService.remove(id);
  }
}
