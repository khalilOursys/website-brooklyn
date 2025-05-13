// src/BulkClientRequests/BulkClientRequests.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateBulkClientRequestDto } from './dto/create-bulk-client-request.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserBulkRequestDto } from './dto/update-bulk-client-request.dto';

@Injectable()
export class BulkClientRequestsService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async createUserWithBulkRequest(data: CreateBulkClientRequestDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: 'BULK_CLIENT',
        bulkRequests: {
          create: {
            storeName: data.storeName,
            legalDocs: data.legalDocs,
            status: 'pending',
          },
        },
      },
      include: {
        bulkRequests: true,
      },
    });
  }

  // READ
  async getUserWithBulkRequest(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { bulkRequests: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // UPDATE
  async updateUserWithBulkRequest(
    userId: string,
    data: UpdateUserBulkRequestDto,
  ) {
    const updateData: any = {};
    const bulkUpdateData: any = {};

    if (data.email) updateData.email = data.email;
    if (data.name) updateData.name = data.name;
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    if (data.storeName) bulkUpdateData.storeName = data.storeName;
    if (data.legalDocs) bulkUpdateData.legalDocs = data.legalDocs;
    if (data.status) {
      bulkUpdateData.status = data.status;
      if (data.status === 'approved' || data.status === 'rejected') {
        bulkUpdateData.reviewedAt = new Date();
      }
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...updateData,
        bulkRequests: {
          update: {
            where: { userId },
            data: bulkUpdateData,
          },
        },
      },
      include: {
        bulkRequests: true,
      },
    });
  }

  // DELETE
  async deleteUserWithBulkRequest(userId: string) {
    // First delete the bulk request (due to foreign key constraint)
    await this.prisma.bulkClientRequest.deleteMany({
      where: { userId },
    });

    // Then delete the user
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  // Additional methods for separate operations
  async updateBulkRequestStatus(
    bulkRequestId: string,
    status: string,
    reviewedById?: string,
  ) {
    const updateData: any = { status };

    if (status === 'approved' || status === 'rejected') {
      updateData.reviewedAt = new Date();
      if (reviewedById) {
        updateData.reviewedById = reviewedById;
      }
    }

    return this.prisma.bulkClientRequest.update({
      where: { id: bulkRequestId },
      data: updateData,
      include: {
        user: true,
        reviewedBy: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.bulkClientRequest.findMany({
      include: {
        user: true,
      },
    });
  }

  /* async update(id: string, updateDto: UpdateUserBulkRequestDto) {
    // Ensure the request exists
    return await this.prisma.bulkClientRequest.update({
      where: { id },
      data: updateDto,
    });
  } */

  async update(id: string, updateDto: UpdateUserBulkRequestDto) {
    // Get the current request to check its status
    const currentRequest = await this.prisma.bulkClientRequest.findUnique({
      where: { id },
      include: {
        user: true, // Assuming there's a relation to the user
      },
    });

    if (!currentRequest) {
      throw new Error('Request not found');
    }

    // Update the request
    const updatedRequest = await this.prisma.bulkClientRequest.update({
      where: { id },
      data: updateDto,
    });

    // Check if status was changed to 'approved'
    if (
      currentRequest.status !== 'approved' &&
      updatedRequest.status === 'approved'
    ) {
      // Check if user already has a cart
      const existingCart = await this.prisma.cart.findFirst({
        where: {
          userId: currentRequest.userId, // Assuming userId is the field that links to the user
        },
      });

      // Only create cart if user doesn't have one already
      if (!existingCart) {
        await this.prisma.cart.create({
          data: {
            userId: currentRequest.userId,
          },
        });
      } else {
        // Optional: handle case where cart already exists
        console.log(`User ${currentRequest.userId} already has a cart`);
      }
    }

    return updatedRequest;
  }
}
