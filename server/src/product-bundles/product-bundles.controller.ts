import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductBundlesService } from './product-bundles.service';
import { CreateProductBundleDto } from './dto/create-product-bundle.dto';
import { UpdateProductBundleDto } from './dto/update-product-bundle.dto';

@Controller('product-bundles')
export class ProductBundlesController {
  constructor(private readonly productBundlesService: ProductBundlesService) {}

  @Post()
  async create(@Body() createProductBundleDto: CreateProductBundleDto) {
    return await this.productBundlesService.create(createProductBundleDto);
  }

  @Get()
  async findAll() {
    return await this.productBundlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productBundlesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductBundleDto: UpdateProductBundleDto) {
    return await this.productBundlesService.update(id, updateProductBundleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productBundlesService.remove(id);
  }
}
