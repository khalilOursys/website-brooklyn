import { HttpStatus } from '@nestjs/common';
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
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        discount: number | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
    }>;
    findAll(): Promise<({
        product: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            color: string | null;
            price: number;
            purchasePrice: number | null;
            stock: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: Prisma.JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
        } | null;
    } & {
        id: string;
        name: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        discount: number | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
    })[]>;
    findOne(id: string): Promise<{
        product: ({
            category: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                slug: string | null;
                description: string | null;
                bgUrl: string | null;
                iconUrl: string | null;
                bannerColor: string;
                bannerText: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                img: string | null;
            };
            images: {
                id: string;
                url: string;
                isPrimary: boolean;
                variantId: string | null;
                productId: string | null;
            }[];
            attributes: {
                id: string;
                key: string;
                value: string;
                productId: string;
            }[];
        } & {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            color: string | null;
            price: number;
            purchasePrice: number | null;
            stock: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: Prisma.JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
        }) | null;
    } & {
        id: string;
        name: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        discount: number | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
    }>;
    update(id: string, updateBulkProductDto: UpdateBulkProductDto): Promise<{
        id: string;
        name: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        discount: number | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        discount: number | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
    }>;
    findBulkProductsByCategory(options: {
        categorySlug?: string[];
        page?: number;
        limit?: number;
        promotions?: number;
        brandNames?: string[];
        minPrice?: number;
        maxPrice?: number;
    }): Promise<{
        bulkProducts: ({
            product: ({
                category: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    slug: string | null;
                    description: string | null;
                    bgUrl: string | null;
                    iconUrl: string | null;
                    bannerColor: string;
                    bannerText: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    img: string | null;
                };
                images: {
                    id: string;
                    url: string;
                    isPrimary: boolean;
                    variantId: string | null;
                    productId: string | null;
                }[];
            } & {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                color: string | null;
                price: number;
                purchasePrice: number | null;
                stock: number;
                isBulk: boolean;
                discount: number | null;
                isFeatured: boolean;
                specs: Prisma.JsonValue | null;
                categoryId: string;
                brandId: string;
                averageRating: number | null;
                ratingCount: number;
            }) | null;
        } & {
            id: string;
            name: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            discount: number | null;
            productId: string;
            bulkPrice: number;
            minQuantity: number;
        })[];
        totalCount: number;
    }>;
    toggleStatus(id: string): Promise<{
        success: boolean;
        status: HttpStatus;
        isActive?: undefined;
    } | {
        success: boolean;
        status: HttpStatus;
        isActive: boolean;
    }>;
}
