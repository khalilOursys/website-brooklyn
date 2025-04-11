import { NotificationsService } from './notifications.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findByUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        orderId: string | null;
        isRead: boolean;
        message: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        orderId: string | null;
        isRead: boolean;
        message: string;
    }>;
    update(id: string, updateDto: UpdateNotificationDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        orderId: string | null;
        isRead: boolean;
        message: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        orderId: string | null;
        isRead: boolean;
        message: string;
    }>;
}
