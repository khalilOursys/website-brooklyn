// src/bulkClientRequests/bulkClientRequests.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BulkClientRequestsService } from './bulk-client-requests.service';
import { CreateBulkClientRequestDto } from './dto/create-bulk-client-request.dto';
import { UpdateUserBulkRequestDto } from './dto/update-bulk-client-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfigClientRequests } from 'src/config/multer.config';

@Controller('bulkClientRequests')
export class BulkClientRequestsController {
  constructor(
    private readonly bulkClientRequestsService: BulkClientRequestsService,
  ) {}

  // CREATE with single legal document upload
  @Post('bulk-signup')
  @UseInterceptors(FileInterceptor('file', multerConfigClientRequests))
  async createUserWithBulkRequest(
    @Body() createUserBulkRequestDto: CreateBulkClientRequestDto,
    @UploadedFile() legalDoc?: Express.Multer.File,
  ) {
    const hostUrl = process.env.imagePath || 'http://localhost:3001';

    // Create an array of product images to be saved
    const imageUrl = `${hostUrl}/${legalDoc?.path.replace(/\\/g, '/')}`;

    return await this.bulkClientRequestsService.createUserWithBulkRequest({
      ...createUserBulkRequestDto,
      legalDocs: imageUrl, // Store the file path
    });
  }

  // READ
  @Get('getUserWithBulkRequest/:id')
  async getUserWithBulkRequest(@Param('id') id: string) {
    const user =
      await this.bulkClientRequestsService.getUserWithBulkRequest(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // UPDATE with potential legal document upload
  @Put(':id/with-bulk')
  @UseInterceptors(FileInterceptor('legalDoc', multerConfigClientRequests))
  async updateUserWithBulkRequest(
    @Param('id') id: string,
    @Body() updateUserBulkRequestDto: UpdateUserBulkRequestDto,
    @UploadedFile() legalDoc?: Express.Multer.File,
  ) {
    const updateData = legalDoc
      ? { ...updateUserBulkRequestDto, legalDocs: legalDoc.path }
      : updateUserBulkRequestDto;

    return await this.bulkClientRequestsService.updateUserWithBulkRequest(
      id,
      updateData,
    );
  }

  // DELETE
  @Delete(':id/with-bulk')
  async deleteUserWithBulkRequest(@Param('id') id: string) {
    await this.bulkClientRequestsService.deleteUserWithBulkRequest(id);
    return { message: 'User and bulk request deleted successfully' };
  }

  // Additional endpoint for updating bulk request status
  @Put('bulk-requests/:id')
  async updateBulkRequestStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('reviewedById') reviewedById?: string,
  ) {
    return this.bulkClientRequestsService.updateBulkRequestStatus(
      id,
      status,
      reviewedById,
    );
  }
  @Get()
  findAll() {
    return this.bulkClientRequestsService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserBulkRequestDto,
  ) {
    return await this.bulkClientRequestsService.update(id, updateDto);
  }
}
