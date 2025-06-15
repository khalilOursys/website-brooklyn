import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
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
        price: number;
        stock: number;
        isBulk: boolean;
        discount: number | null;
        isFeatured: boolean;
        specs: Prisma.JsonValue | null;
        categoryId: string;
        brandId: string;
        averageRating: number | null;
        ratingCount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
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
        price: number;
        stock: number;
        isBulk: boolean;
        discount: number | null;
        isFeatured: boolean;
        specs: Prisma.JsonValue | null;
        categoryId: string;
        brandId: string;
        averageRating: number | null;
        ratingCount: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
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
        price: number;
        stock: number;
        isBulk: boolean;
        discount: number | null;
        isFeatured: boolean;
        specs: Prisma.JsonValue | null;
        categoryId: string;
        brandId: string;
        averageRating: number | null;
        ratingCount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<({
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
        price: number;
        stock: number;
        isBulk: boolean;
        discount: number | null;
        isFeatured: boolean;
        specs: Prisma.JsonValue | null;
        categoryId: string;
        brandId: string;
        averageRating: number | null;
        ratingCount: number;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        isBulk: boolean;
        discount: number | null;
        isFeatured: boolean;
        specs: Prisma.JsonValue | null;
        categoryId: string;
        brandId: string;
        averageRating: number | null;
        ratingCount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByDiscountAndFeatured(options: {
        page?: number;
        limit?: number;
    }): Promise<{
        featuredProducts: ({
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
            price: number;
            stock: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: Prisma.JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        discountedProducts: ({
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
            price: number;
            stock: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: Prisma.JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    findByCategory(options: {
        categorySlug?: string;
        page?: number;
        limit?: number;
        promotions?: number;
        brandNames?: string[];
        minPrice?: number;
        maxPrice?: number;
    }): Promise<{
        products: ({
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
            price: number;
            stock: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: Prisma.JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        totalCount: number;
    }>;
    getFilterOptions(categorySlug: string): Promise<{
        brands: {
            id: string;
            name: string;
            productCount: number;
        }[];
        priceRange: {
            minPrice: number;
            maxPrice: number;
        };
    }>;
    getFilterOptionsPromotion(): Promise<{
        brands: {
            id: string;
            name: string;
            productCount: number;
        }[];
        priceRange: {
            minPrice: number;
            maxPrice: number;
        };
        discountInfo: {
            minDiscount: number;
            maxDiscount: number;
            avgDiscount: number;
        };
    }>;
    findByCategoryParent(options: {
        parentCategorySlug?: string;
        page?: number;
        limit?: number;
        brandNames?: string[];
        minPrice?: number;
        maxPrice?: number;
    }): Promise<{
        products: ({
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
            price: number;
            stock: number;
            isBulk: boolean;
            discount: number | null;
            isFeatured: boolean;
            specs: Prisma.JsonValue | null;
            categoryId: string;
            brandId: string;
            averageRating: number | null;
            ratingCount: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        totalCount: number;
    }>;
}
