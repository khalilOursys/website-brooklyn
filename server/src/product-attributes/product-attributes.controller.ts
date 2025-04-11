import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductAttributesService } from './product-attributes.service';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';

@Controller('product-attributes')
export class ProductAttributesController {
  constructor(private readonly productAttributesService: ProductAttributesService) {}

  @Post()
  async create(@Body() createProductAttributeDto: CreateProductAttributeDto) {
    return await this.productAttributesService.create(createProductAttributeDto);
  }

  @Get()
  async findAll(@Query('productId') productId?: string) {
    return await this.productAttributesService.findAll(productId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productAttributesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductAttributeDto: UpdateProductAttributeDto
  ) {
    return await this.productAttributesService.update(id, updateProductAttributeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productAttributesService.remove(id);
  }
}
