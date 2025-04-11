import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { BulkClientRequestsService } from './bulk-client-requests.service';
import { CreateBulkClientRequestDto } from './dto/create-bulk-client-request.dto';
import { UpdateBulkClientRequestDto } from './dto/update-bulk-client-request.dto';

@Controller('bulk-client-requests')
export class BulkClientRequestsController {
  constructor(private readonly bulkRequestsService: BulkClientRequestsService) {}

  @Post()
  async create(@Body() createDto: CreateBulkClientRequestDto) {
    return await this.bulkRequestsService.create(createDto);
  }

  @Get()
  async findAll() {
    return await this.bulkRequestsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bulkRequestsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateBulkClientRequestDto) {
    return await this.bulkRequestsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bulkRequestsService.remove(id);
  }
}
