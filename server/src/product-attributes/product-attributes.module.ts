import { Module } from '@nestjs/common';
import { ProductAttributesController } from './product-attributes.controller';
import { ProductAttributesService } from './product-attributes.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductAttributesController],
  providers: [ProductAttributesService, PrismaService],
})
export class ProductAttributesModule {}
