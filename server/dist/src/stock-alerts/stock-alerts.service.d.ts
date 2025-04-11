import { PrismaService } from '../prisma.service';
import { CreateStockAlertDto } from './dto/create-stock-alert.dto';
import { UpdateStockAlertDto } from './dto/update-stock-alert.dto';
export declare class StockAlertsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createStockAlertDto: CreateStockAlertDto): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
        variantId: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
        variantId: string | null;
    }[]>;
    findByUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
        variantId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
        variantId: string | null;
    }>;
    update(id: string, updateStockAlertDto: UpdateStockAlertDto): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
        variantId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
        variantId: string | null;
    }>;
}
