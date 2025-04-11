import { Module } from '@nestjs/common';
import { ProductRatingsController } from './product-ratings.controller';
import { ProductRatingsService } from './product-ratings.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductRatingsController],
  providers: [ProductRatingsService, PrismaService],
})
export class ProductRatingsModule {}
