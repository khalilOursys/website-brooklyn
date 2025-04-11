import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post()
  async create(@Body() createProductImageDto: CreateProductImageDto) {
    return await this.productImagesService.create(createProductImageDto);
  }

  @Get()
  async findAll(@Query('productId') productId?: string) {
    return await this.productImagesService.findAll(productId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productImagesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    return await this.productImagesService.update(id, updateProductImageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productImagesService.remove(id);
  }
}
