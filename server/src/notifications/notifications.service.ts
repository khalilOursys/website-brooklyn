import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  // Get all notifications for a user
  async findByUser(userId: string) {
    return await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get a single notification by its ID
  async findOne(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification) {
      throw new NotFoundException(`Notification with id ${id} not found.`);
    }
    return notification;
  }

  // Mark a notification as read (or update other fields)
  async update(id: string, updateDto: UpdateNotificationDto) {
    // Ensure the notification exists
    await this.findOne(id);
    return await this.prisma.notification.update({
      where: { id },
      data: updateDto,
    });
  }

  // Delete a notification
  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.notification.delete({
      where: { id },
    });
  }
}
