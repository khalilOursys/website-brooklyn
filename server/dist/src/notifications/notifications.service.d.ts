import { PrismaService } from '../prisma.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
