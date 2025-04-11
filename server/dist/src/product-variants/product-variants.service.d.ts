import { PrismaService } from '../prisma.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
export declare class ProductVariantsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductVariantDto: CreateProductVariantDto): Promise<{
        id: string;
        name: string;
        price: number | null;
        stock: number;
        productId: string;
    }>;
    findAll(productId?: string): Promise<{
        id: string;
        name: string;
        price: number | null;
        stock: number;
        productId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        price: number | null;
        stock: number;
        productId: string;
    }>;
    update(id: string, updateProductVariantDto: UpdateProductVariantDto): Promise<{
        id: string;
        name: string;
        price: number | null;
        stock: number;
        productId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        price: number | null;
        stock: number;
        productId: string;
    }>;
}
