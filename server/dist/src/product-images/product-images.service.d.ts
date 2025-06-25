import { PrismaService } from '../prisma.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
export declare class ProductImagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductImageDto: CreateProductImageDto): Promise<{
        id: string;
        url: string;
        isPrimary: boolean;
        variantId: string | null;
        productId: string | null;
    }>;
    findAll(productId?: string): Promise<{
        id: string;
        url: string;
        isPrimary: boolean;
        variantId: string | null;
        productId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        url: string;
        isPrimary: boolean;
        variantId: string | null;
        productId: string | null;
    }>;
    update(id: string, updateProductImageDto: UpdateProductImageDto): Promise<{
        id: string;
        url: string;
        isPrimary: boolean;
        variantId: string | null;
        productId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        url: string;
        isPrimary: boolean;
        variantId: string | null;
        productId: string | null;
    }>;
}
