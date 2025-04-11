import { Module } from '@nestjs/common';
import { ProductVariantsController } from './product-variants.controller';
import { ProductVariantsService } from './product-variants.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductVariantsController],
  providers: [ProductVariantsService, PrismaService],
})
export class ProductVariantsModule {}
