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
