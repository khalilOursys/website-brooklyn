import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { BulkProductsService } from './bulk-products.service';
import { CreateBulkProductDto } from './dto/create-bulk-product.dto';
import { UpdateBulkProductDto } from './dto/update-bulk-product.dto';

@Controller('bulkProducts')
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

  @Get('getBulkProductById/:id')
  async findOne(@Param('id') id: string) {
    return await this.bulkProductsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBulkProductDto: UpdateBulkProductDto,
  ) {
    return await this.bulkProductsService.update(id, updateBulkProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bulkProductsService.remove(id);
  }

  // Find products by category name with pagination, optional brand name, and price range filters
  @Get('search')
  findByCategory(
    @Query('categorySlug') categorySlug?: string,
    @Query('page', ParseIntPipe) page: number = 0,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('brandNames') brandNames?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('promotions') promotions?: number,
  ) {
    return this.bulkProductsService.findBulkProductsByCategory({
      categorySlug,
      page,
      limit,
      promotions,
      brandNames: brandNames ? brandNames.split(',') : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }
}
