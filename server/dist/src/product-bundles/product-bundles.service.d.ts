import { PrismaService } from '../prisma.service';
import { CreateProductBundleDto } from './dto/create-product-bundle.dto';
import { UpdateProductBundleDto } from './dto/update-product-bundle.dto';
export declare class ProductBundlesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductBundleDto: CreateProductBundleDto): Promise<{
        products: {
            id: string;
            productId: string;
            quantity: number;
            bundleId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        discount: number;
        expiresAt: Date | null;
    }>;
    findAll(): Promise<({
        products: {
            id: string;
            productId: string;
            quantity: number;
            bundleId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        discount: number;
        expiresAt: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        products: {
            id: string;
            productId: string;
            quantity: number;
            bundleId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        discount: number;
        expiresAt: Date | null;
    }>;
    update(id: string, updateProductBundleDto: UpdateProductBundleDto): Promise<{
        products: {
            id: string;
            productId: string;
            quantity: number;
            bundleId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        discount: number;
        expiresAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        discount: number;
        expiresAt: Date | null;
    }>;
}
