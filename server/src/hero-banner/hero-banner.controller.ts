import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { HeroBannerService } from './hero-banner.service';
import { CreateHeroBannerDto } from './dto/create-hero-banner.dto';
import { UpdateHeroBannerDto } from './dto/update-hero-banner.dto';
import { multerConfigHeroBanner } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('hero-banner')
export class HeroBannerController {
  constructor(private readonly heroBannersService: HeroBannerService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', multerConfigHeroBanner))
  async uploadImages(@UploadedFile() file: Express.Multer.File) {
    const hostUrl = process.env.imagePath || 'http://localhost:3001';

    // Create an array of product images to be saved
    const imageUrl = `${hostUrl}/${file.path.replace(/\\/g, '/')}`;

    return { url: imageUrl };
  }
  @Post()
  async create(@Body() createHeroBannerDto: CreateHeroBannerDto) {
    return await this.heroBannersService.create(createHeroBannerDto);
  }

  @Get()
  async findAll() {
    return await this.heroBannersService.findAll();
  }

  @Get('getHeroBannerById/:id')
  async findOne(@Param('id') id: string) {
    return await this.heroBannersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHeroBannerDto: UpdateHeroBannerDto,
  ) {
    return await this.heroBannersService.update(id, updateHeroBannerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.heroBannersService.remove(id);
  }
}
