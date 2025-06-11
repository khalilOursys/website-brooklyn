import { BulkProductsService } from './bulk-products.service';
import { CreateBulkProductDto } from './dto/create-bulk-product.dto';
import { UpdateBulkProductDto } from './dto/update-bulk-product.dto';
export declare class BulkProductsController {
    private readonly bulkProductsService;
    constructor(bulkProductsService: BulkProductsService);
    create(createBulkProductDto: CreateBulkProductDto): Promise<{
        id: string;
        name: string | null;
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
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        discount: number | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
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
        };
    } & {
        id: string;
        name: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        discount: number | null;
        productId: string;
        bulkPrice: number;
        minQuantity: number;
    }>;
    findByCategory(categorySlug?: string, page?: number, limit?: number, brandNames?: string, minPrice?: number, maxPrice?: number, promotions?: number): Promise<{
        bulkProducts: ({
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
            };
        } & {
            id: string;
            name: string | null;
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
}
