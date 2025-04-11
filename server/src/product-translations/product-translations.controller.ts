import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductTranslationsService } from './product-translations.service';
import { CreateProductTranslationDto } from './dto/create-product-translation.dto';
import { UpdateProductTranslationDto } from './dto/update-product-translation.dto';

@Controller('product-translations')
export class ProductTranslationsController {
  constructor(private readonly productTranslationsService: ProductTranslationsService) {}

  @Post()
  async create(@Body() createProductTranslationDto: CreateProductTranslationDto) {
    return await this.productTranslationsService.create(createProductTranslationDto);
  }

  @Get()
  async findAll(@Query('productId') productId?: string) {
    return await this.productTranslationsService.findAll(productId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productTranslationsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductTranslationDto: UpdateProductTranslationDto
  ) {
    return await this.productTranslationsService.update(id, updateProductTranslationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productTranslationsService.remove(id);
  }
}
