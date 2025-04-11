import { Controller, Get, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Get notifications for a specific user (e.g., GET /notifications?userId=xxx)
  @Get()
  async findByUser(@Query('userId') userId: string) {
    return await this.notificationsService.findByUser(userId);
  }

  // Get a single notification by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.notificationsService.findOne(id);
  }

  // Update a notification (e.g., mark as read)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateNotificationDto) {
    return await this.notificationsService.update(id, updateDto);
  }

  // Delete a notification
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.notificationsService.remove(id);
  }
}
