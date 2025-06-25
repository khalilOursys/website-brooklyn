import { PrismaService } from '../prisma.service';
import { CreateStockAlertDto } from './dto/create-stock-alert.dto';
import { UpdateStockAlertDto } from './dto/update-stock-alert.dto';
export declare class StockAlertsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createStockAlertDto: CreateStockAlertDto): Promise<{
        id: string;
        createdAt: Date;
        variantId: string | null;
        productId: string;
        userId: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        variantId: string | null;
        productId: string;
        userId: string;
    }[]>;
    findByUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        variantId: string | null;
        productId: string;
        userId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        variantId: string | null;
        productId: string;
        userId: string;
    }>;
    update(id: string, updateStockAlertDto: UpdateStockAlertDto): Promise<{
        id: string;
        createdAt: Date;
        variantId: string | null;
        productId: string;
        userId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        variantId: string | null;
        productId: string;
        userId: string;
    }>;
}
