import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
export declare class ProductVariantsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductVariantDto: CreateProductVariantDto): Promise<{
        product: {
            category: {
                id: string;
                name: string;
                isActive: boolean;
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
                isActive: boolean;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                img: string | null;
            };
        } & {
            id: string;
            name: string;
            stock: number;
            color: string | null;
            isActive: boolean;
            description: string | null;
            price: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            id: string;
            productId: string | null;
            variantId: string | null;
            url: string;
            isPrimary: boolean;
        }[];
    } & {
        id: string;
        productId: string;
        name: string;
        stock: number;
        color: string | null;
        isActive: boolean;
    }>;
    findAll(productId?: string): Promise<({
        product: {
            category: {
                id: string;
                name: string;
                isActive: boolean;
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
                isActive: boolean;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                img: string | null;
            };
        } & {
            id: string;
            name: string;
            stock: number;
            color: string | null;
            isActive: boolean;
            description: string | null;
            price: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            id: string;
            productId: string | null;
            variantId: string | null;
            url: string;
            isPrimary: boolean;
        }[];
    } & {
        id: string;
        productId: string;
        name: string;
        stock: number;
        color: string | null;
        isActive: boolean;
    })[]>;
    findOne(id: string): Promise<{
        product: {
            category: {
                id: string;
                name: string;
                isActive: boolean;
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
                isActive: boolean;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                img: string | null;
            };
        } & {
            id: string;
            name: string;
            stock: number;
            color: string | null;
            isActive: boolean;
            description: string | null;
            price: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            id: string;
            productId: string | null;
            variantId: string | null;
            url: string;
            isPrimary: boolean;
        }[];
    } & {
        id: string;
        productId: string;
        name: string;
        stock: number;
        color: string | null;
        isActive: boolean;
    }>;
    update(id: string, updateProductVariantDto: UpdateProductVariantDto): Promise<({
        product: {
            category: {
                id: string;
                name: string;
                isActive: boolean;
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
                isActive: boolean;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                img: string | null;
            };
        } & {
            id: string;
            name: string;
            stock: number;
            color: string | null;
            isActive: boolean;
            description: string | null;
            price: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            id: string;
            productId: string | null;
            variantId: string | null;
            url: string;
            isPrimary: boolean;
        }[];
    } & {
        id: string;
        productId: string;
        name: string;
        stock: number;
        color: string | null;
        isActive: boolean;
    }) | null>;
    remove(id: string): Promise<{
        id: string;
        productId: string;
        name: string;
        stock: number;
        color: string | null;
        isActive: boolean;
    }>;
    getVariantWithProduct(id: string): Promise<({
        product: {
            images: {
                id: string;
                productId: string | null;
                variantId: string | null;
                url: string;
                isPrimary: boolean;
            }[];
            category: {
                id: string;
                name: string;
                isActive: boolean;
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
                isActive: boolean;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                img: string | null;
            };
            variants: ({
                images: {
                    id: string;
                    productId: string | null;
                    variantId: string | null;
                    url: string;
                    isPrimary: boolean;
                }[];
            } & {
                id: string;
                productId: string;
                name: string;
                stock: number;
                color: string | null;
                isActive: boolean;
            })[];
            attributes: {
                id: string;
                productId: string;
                key: string;
                value: string;
            }[];
        } & {
            id: string;
            name: string;
            stock: number;
            color: string | null;
            isActive: boolean;
            description: string | null;
            price: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            id: string;
            productId: string | null;
            variantId: string | null;
            url: string;
            isPrimary: boolean;
        }[];
    } & {
        id: string;
        productId: string;
        name: string;
        stock: number;
        color: string | null;
        isActive: boolean;
    }) | null>;
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
