import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductRatingsService } from './product-ratings.service';
import { CreateProductRatingDto } from './dto/create-product-rating.dto';
import { UpdateProductRatingDto } from './dto/update-product-rating.dto';

@Controller('product-ratings')
export class ProductRatingsController {
  constructor(private readonly productRatingsService: ProductRatingsService) {}

  @Post()
  async create(@Body() createProductRatingDto: CreateProductRatingDto) {
    return await this.productRatingsService.create(createProductRatingDto);
  }

  @Get()
  async findAll(@Query('productId') productId?: string) {
    return await this.productRatingsService.findAll(productId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productRatingsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductRatingDto: UpdateProductRatingDto) {
    return await this.productRatingsService.update(id, updateProductRatingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productRatingsService.remove(id);
  }
}
