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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { multerConfigCategory } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', multerConfigCategory))
  async uploadImages(@UploadedFile() file: Express.Multer.File) {
    const hostUrl = process.env.imagePath || 'http://localhost:3001';

    // Create an array of product images to be saved
    const imageUrl = `${hostUrl}/${file.path.replace(/\\/g, '/')}`;

    return { url: imageUrl };
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get('getCategoryById/:id')
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(id);
  }

  @Get('getCategoryBySlug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return await this.categoriesService.findBySlug(slug);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoriesService.remove(id);
  }

  @Get('structured')
  async getStructuredCategories() {
    return this.categoriesService.getCategoriesStructured();
  }
  @Get('structuredMobile')
  async getCategoriesStructuredMobile() {
    return this.categoriesService.getCategoriesStructuredMobile();
  }

  @Get('getAllParent')
  async getAllParent() {
    return this.categoriesService.findAllParent();
  }

  @Get('getAllChildren')
  async getAllChildren() {
    return this.categoriesService.findAllChildren();
  }
}
