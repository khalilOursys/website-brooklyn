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
            productId: string;
            quantity: number;
            bundleId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        img: string | null;
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
        img: string | null;
        discount: number;
        expiresAt: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        products: ({
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
            productId: string;
            quantity: number;
            bundleId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        img: string | null;
        discount: number;
        expiresAt: Date | null;
    }>;
    update(id: string, updateProductBundleDto: CreateProductBundleDto): Promise<{
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
        img: string | null;
        discount: number;
        expiresAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        img: string | null;
        discount: number;
        expiresAt: Date | null;
    }>;
}
