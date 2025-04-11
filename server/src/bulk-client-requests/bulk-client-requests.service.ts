import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBulkClientRequestDto } from './dto/create-bulk-client-request.dto';
import { UpdateBulkClientRequestDto } from './dto/update-bulk-client-request.dto';

@Injectable()
export class BulkClientRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateBulkClientRequestDto) {
    // Ensure that the user doesn't already have an active bulk request (unique constraint exists in schema)
    const existingRequest = await this.prisma.bulkClientRequest.findUnique({
      where: { userId: createDto.userId },
    });
    if (existingRequest) {
      throw new BadRequestException(`User with id ${createDto.userId} already has a bulk request.`);
    }
    return await this.prisma.bulkClientRequest.create({
      data: {
        userId: createDto.userId,
        storeName: createDto.storeName,
        legalDocs: createDto.legalDocs,
        status: 'pending',
      },
    });
  }

  async findAll() {
    return await this.prisma.bulkClientRequest.findMany({
      orderBy: { submittedAt: 'desc' },
      include: { user: true },
    });
  }

  async findOne(id: string) {
    const request = await this.prisma.bulkClientRequest.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!request) {
      throw new NotFoundException(`Bulk client request with id ${id} not found.`);
    }
    return request;
  }

  async update(id: string, updateDto: UpdateBulkClientRequestDto) {
    // Ensure the request exists
    await this.findOne(id);
    return await this.prisma.bulkClientRequest.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.bulkClientRequest.delete({
      where: { id },
    });
  }
}
