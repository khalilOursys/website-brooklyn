import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductBundlesService } from './product-bundles.service';
import { CreateProductBundleDto } from './dto/create-product-bundle.dto';
import { UpdateProductBundleDto } from './dto/update-product-bundle.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfigBundle } from 'src/config/multer.config';

@Controller('productBundles')
export class ProductBundlesController {
  constructor(private readonly productBundlesService: ProductBundlesService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', multerConfigBundle))
  async uploadImages(@UploadedFile() file: Express.Multer.File) {
    const hostUrl = process.env.imagePath || 'http://localhost:3001';

    // Create an array of product images to be saved
    const imageUrl = `${hostUrl}/${file.path.replace(/\\/g, '/')}`;

    return { url: imageUrl };
  }

  @Post()
  async create(@Body() createProductBundleDto: CreateProductBundleDto) {
    return await this.productBundlesService.create(createProductBundleDto);
  }

  @Get()
  async findAll() {
    return await this.productBundlesService.findAll();
  }

  @Get('getProductBundlesById/:id')
  async findOne(@Param('id') id: string) {
    return await this.productBundlesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductBundleDto: CreateProductBundleDto,
  ) {
    return await this.productBundlesService.update(id, updateProductBundleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productBundlesService.remove(id);
  }
}
