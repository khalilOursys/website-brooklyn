import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Controller('product-variants')
export class ProductVariantsController {
  constructor(private readonly productVariantsService: ProductVariantsService) {}

  @Post()
  async create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return await this.productVariantsService.create(createProductVariantDto);
  }

  @Get()
  async findAll(@Query('productId') productId?: string) {
    return await this.productVariantsService.findAll(productId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productVariantsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto
  ) {
    return await this.productVariantsService.update(id, updateProductVariantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productVariantsService.remove(id);
  }
}
