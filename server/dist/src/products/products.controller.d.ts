import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    uploadImages(files: Array<Express.Multer.File>, body: {
        productId: string;
    }): Promise<{
        productId: string;
        url: string;
        isPrimary: boolean;
    }[]>;
    create(createProductDto: CreateProductDto): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
            description: string | null;
            bannerColor: string;
            bannerText: string;
            parentId: string | null;
        };
        brand: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            img: string | null;
        };
        images: {
            id: string;
            url: string;
            isPrimary: boolean;
            productId: string;
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
    }>;
    findAll(): Promise<({
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
            description: string | null;
            bannerColor: string;
            bannerText: string;
            parentId: string | null;
        };
        brand: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            img: string | null;
        };
        images: {
            id: string;
            url: string;
            isPrimary: boolean;
            productId: string;
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
    })[]>;
    findOne(id: string): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
            description: string | null;
            bannerColor: string;
            bannerText: string;
            parentId: string | null;
        };
        brand: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            img: string | null;
        };
        images: {
            id: string;
            url: string;
            isPrimary: boolean;
            productId: string;
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
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<({
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
            description: string | null;
            bannerColor: string;
            bannerText: string;
            parentId: string | null;
        };
        brand: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            img: string | null;
        };
        images: {
            id: string;
            url: string;
            isPrimary: boolean;
            productId: string;
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
    }) | null>;
    remove(id: string): Promise<{
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
    }>;
    findByDiscountAndFeatured(): Promise<{
        featuredProducts: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string | null;
                description: string | null;
                bannerColor: string;
                bannerText: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                img: string | null;
            };
            images: {
                id: string;
                url: string;
                isPrimary: boolean;
                productId: string;
            }[];
        } & {
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
        })[];
        discountedProducts: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string | null;
                description: string | null;
                bannerColor: string;
                bannerText: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                img: string | null;
            };
            images: {
                id: string;
                url: string;
                isPrimary: boolean;
                productId: string;
            }[];
        } & {
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
        })[];
    }>;
    findByCategory(categorySlug?: string, page?: number, limit?: number, brandNames?: string, minPrice?: number, maxPrice?: number, promotions?: number): Promise<{
        products: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string | null;
                description: string | null;
                bannerColor: string;
                bannerText: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                img: string | null;
            };
            images: {
                id: string;
                url: string;
                isPrimary: boolean;
                productId: string;
            }[];
        } & {
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
}
