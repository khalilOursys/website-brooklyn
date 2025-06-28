import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
export declare class ProductVariantsController {
    private readonly productVariantsService;
    constructor(productVariantsService: ProductVariantsService);
    create(createProductVariantDto: CreateProductVariantDto): Promise<{
        product: {
            category: {
                id: string;
                name: string;
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
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                img: string | null;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            color: string | null;
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
        color: string | null;
        stock: number;
        productId: string;
    }>;
    findAll(): Promise<({
        product: {
            category: {
                id: string;
                name: string;
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
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                img: string | null;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            color: string | null;
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
        color: string | null;
        stock: number;
        productId: string;
    })[]>;
    findOne(id: string): Promise<{
        product: {
            category: {
                id: string;
                name: string;
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
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                img: string | null;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            color: string | null;
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
        color: string | null;
        stock: number;
        productId: string;
    }>;
    getVariantWithProduct(id: string): Promise<({
        product: {
            category: {
                id: string;
                name: string;
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
            variants: ({
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
                color: string | null;
                stock: number;
                productId: string;
            })[];
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
            color: string | null;
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
        color: string | null;
        stock: number;
        productId: string;
    }) | null>;
    update(id: string, updateProductVariantDto: UpdateProductVariantDto): Promise<({
        product: {
            category: {
                id: string;
                name: string;
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
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                img: string | null;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            color: string | null;
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
        color: string | null;
        stock: number;
        productId: string;
    }) | null>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        color: string | null;
        stock: number;
        productId: string;
    }>;
}
