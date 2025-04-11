import { Module } from '@nestjs/common';
import { ProductImagesController } from './product-images.controller';
import { ProductImagesService } from './product-images.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductImagesController],
  providers: [ProductImagesService, PrismaService],
})
export class ProductImagesModule {}
