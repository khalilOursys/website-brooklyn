import { PrismaService } from '../prisma.service';
import { CreateProductBundleDto } from './dto/create-product-bundle.dto';
export declare class ProductBundlesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
        createdAt: Date;
        expiresAt: Date | null;
        img: string | null;
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
        createdAt: Date;
        expiresAt: Date | null;
        img: string | null;
    })[]>;
    findOne(id: string): Promise<{
        products: ({
            product: {
                category: {
                    id: string;
                    name: string;
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
                    createdAt: Date;
                    img: string | null;
                    description: string | null;
                    updatedAt: Date;
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
                discount: number | null;
                createdAt: Date;
                description: string | null;
                price: number;
                stock: number;
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
        createdAt: Date;
        expiresAt: Date | null;
        img: string | null;
    }>;
    update(id: string, createProductBundleDto: CreateProductBundleDto): Promise<{
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
        createdAt: Date;
        expiresAt: Date | null;
        img: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        discount: number;
        createdAt: Date;
        expiresAt: Date | null;
        img: string | null;
    }>;
}
