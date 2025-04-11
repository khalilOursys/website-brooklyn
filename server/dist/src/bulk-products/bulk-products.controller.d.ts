import { BulkProductsService } from './bulk-products.service';
import { CreateBulkProductDto } from './dto/create-bulk-product.dto';
import { UpdateBulkProductDto } from './dto/update-bulk-product.dto';
export declare class BulkProductsController {
    private readonly bulkProductsService;
    constructor(bulkProductsService: BulkProductsService);
    create(createBulkProductDto: CreateBulkProductDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: number | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
    }>;
    findAll(): Promise<({
        product: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            stock: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: number | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
    })[]>;
    findOne(id: string): Promise<{
        product: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            stock: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: number | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
    }>;
    update(id: string, updateBulkProductDto: UpdateBulkProductDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: number | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: number | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
    }>;
}
