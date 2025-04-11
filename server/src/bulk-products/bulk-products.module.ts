import { Module } from '@nestjs/common';
import { BulkProductsController } from './bulk-products.controller';
import { BulkProductsService } from './bulk-products.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BulkProductsController],
  providers: [BulkProductsService, PrismaService],
})
export class BulkProductsModule {}
