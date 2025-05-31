import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfigProduct } from 'src/config/multer.config';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post('upload')
  @UseInterceptors(FilesInterceptor('images', 10, multerConfigProduct))
  async uploadImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: { productId: string }, // Assuming you're sending productId in the request body
  ) {
    /* const hostUrl = 'http://localhost:3001'; */
    const hostUrl = process.env.imagePath || 'http://localhost:3001';
    if (!files || files.length === 0) {
      throw new BadRequestException('No images uploaded.');
    }
    if (files.length > 4) {
      throw new BadRequestException('You can upload a maximum of 4 images.');
    }
    // Create an array of product images to be saved
    const productImages = files.map((file, index) => ({
      productId: body.productId,
      url: `${hostUrl}/${file.path.replace(/\\/g, '/')}`, // Replace backslashes with forward slashes
      isPrimary: index === 0, // First image is primary, others are not
    }));

    return productImages;
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('getProductById/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Get('findByDiscountAndFeatured')
  async findByDiscountAndFeatured() {
    const page = 0;
    const limit = 10;
    const product = await this.productService.findByDiscountAndFeatured({
      page,
      limit,
    });

    return product;
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
    return this.productService.findByCategory({
      categorySlug,
      page,
      limit,
      promotions,
      brandNames: brandNames ? brandNames.split(',') : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }
  @Get('filter-options')
  async getFilterOptions(@Query('categorySlug') categorySlug: string) {
    if (!categorySlug) {
      throw new BadRequestException('Category slug is required');
    }
    return this.productService.getFilterOptions(categorySlug);
  }

  @Get('getFilterOptionsPromotion')
  async getFilterOptionsPromotion() {
    return this.productService.getFilterOptionsPromotion();
  }
}
