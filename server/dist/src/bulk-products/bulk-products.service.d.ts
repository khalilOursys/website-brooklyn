import { PrismaService } from '../prisma.service';
import { CreateBulkProductDto } from './dto/create-bulk-product.dto';
import { UpdateBulkProductDto } from './dto/update-bulk-product.dto';
import { Prisma } from '@prisma/client';
export declare class BulkProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createBulkProductDto: CreateBulkProductDto): Promise<{
        id: string;
        name: string | null;
        description: string | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
        discount: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        product: {
            id: string;
            name: string;
            description: string | null;
            discount: number | null;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            stock: number;
            isBulk: boolean;
            isFeatured: boolean;
            specs: Prisma.JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
        };
    } & {
        id: string;
        name: string | null;
        description: string | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
        discount: number | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        product: {
            category: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                slug: string | null;
                bgUrl: string | null;
                iconUrl: string | null;
                bannerColor: string;
                bannerText: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                img: string | null;
            };
            images: {
                id: string;
                productId: string;
                url: string;
                isPrimary: boolean;
            }[];
            attributes: {
                id: string;
                productId: string;
                key: string;
                value: string;
            }[];
        } & {
            id: string;
            name: string;
            description: string | null;
            discount: number | null;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            stock: number;
            isBulk: boolean;
            isFeatured: boolean;
            specs: Prisma.JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
        };
    } & {
        id: string;
        name: string | null;
        description: string | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
        discount: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateBulkProductDto: UpdateBulkProductDto): Promise<{
        id: string;
        name: string | null;
        description: string | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
        discount: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string | null;
        description: string | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
        discount: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findBulkProductsByCategory(options: {
        categorySlug?: string;
        page?: number;
        limit?: number;
        promotions?: number;
        brandNames?: string[];
        minPrice?: number;
        maxPrice?: number;
    }): Promise<{
        bulkProducts: ({
            product: {
                category: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    slug: string | null;
                    bgUrl: string | null;
                    iconUrl: string | null;
                    bannerColor: string;
                    bannerText: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    img: string | null;
                };
                images: {
                    id: string;
                    productId: string;
                    url: string;
                    isPrimary: boolean;
                }[];
            } & {
                id: string;
                name: string;
                description: string | null;
                discount: number | null;
                createdAt: Date;
                updatedAt: Date;
                price: number;
                stock: number;
                isBulk: boolean;
                isFeatured: boolean;
                specs: Prisma.JsonValue | null;
                categoryId: string;
                brandId: string;
                averageRating: number | null;
                ratingCount: number;
            };
        } & {
            id: string;
            name: string | null;
            description: string | null;
            productId: string;
            bulkPrice: number;
            minQuantity: number;
            discount: number | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        totalCount: number;
    }>;
}
