import { ProductBundlesService } from './product-bundles.service';
import { CreateProductBundleDto } from './dto/create-product-bundle.dto';
export declare class ProductBundlesController {
    private readonly productBundlesService;
    constructor(productBundlesService: ProductBundlesService);
    uploadImages(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    create(createProductBundleDto: CreateProductBundleDto): Promise<{
        products: {
            id: string;
            quantity: number;
            productId: string;
            bundleId: string;
        }[];
    } & {
        id: string;
        name: string;
        discount: number;
        isActive: boolean;
        createdAt: Date;
        expiresAt: Date | null;
        img: string | null;
        stock: number;
    }>;
    findAll(): Promise<({
        products: {
            id: string;
            quantity: number;
            productId: string;
            bundleId: string;
        }[];
    } & {
        id: string;
        name: string;
        discount: number;
        isActive: boolean;
        createdAt: Date;
        expiresAt: Date | null;
        img: string | null;
        stock: number;
    })[]>;
    findOne(id: string): Promise<{
        products: ({
            product: {
                category: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    description: string | null;
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
                    createdAt: Date;
                    img: string | null;
                    description: string | null;
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
                name: string;
                discount: number | null;
                isActive: boolean;
                createdAt: Date;
                stock: number;
                description: string | null;
                color: string | null;
                price: number;
                isBulk: boolean;
                isFeatured: boolean;
                specs: import("@prisma/client/runtime/library").JsonValue | null;
                categoryId: string;
                brandId: string;
                averageRating: number | null;
                ratingCount: number;
                updatedAt: Date;
            };
        } & {
            id: string;
            quantity: number;
            productId: string;
            bundleId: string;
        })[];
    } & {
        id: string;
        name: string;
        discount: number;
        isActive: boolean;
        createdAt: Date;
        expiresAt: Date | null;
        img: string | null;
        stock: number;
    }>;
    update(id: string, updateProductBundleDto: CreateProductBundleDto): Promise<{
        products: {
            id: string;
            quantity: number;
            productId: string;
            bundleId: string;
        }[];
    } & {
        id: string;
        name: string;
        discount: number;
        isActive: boolean;
        createdAt: Date;
        expiresAt: Date | null;
        img: string | null;
        stock: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        discount: number;
        isActive: boolean;
        createdAt: Date;
        expiresAt: Date | null;
        img: string | null;
        stock: number;
    }>;
    toggleStatus(id: string): Promise<{
        success: boolean;
        isActive: boolean | undefined;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    getIsActived(): Promise<{
        id: string;
        name: string;
        discount: number;
        isActive: boolean;
        createdAt: Date;
        expiresAt: Date | null;
        img: string | null;
        stock: number;
    }[]>;
}
