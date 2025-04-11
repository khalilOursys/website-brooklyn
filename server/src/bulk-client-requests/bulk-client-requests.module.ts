import { Module } from '@nestjs/common';
import { BulkClientRequestsController } from './bulk-client-requests.controller';
import { BulkClientRequestsService } from './bulk-client-requests.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BulkClientRequestsController],
  providers: [BulkClientRequestsService, PrismaService],
})
export class BulkClientRequestsModule {}
