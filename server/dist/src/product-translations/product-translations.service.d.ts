import { PrismaService } from '../prisma.service';
import { CreateProductTranslationDto } from './dto/create-product-translation.dto';
import { UpdateProductTranslationDto } from './dto/update-product-translation.dto';
export declare class ProductTranslationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductTranslationDto: CreateProductTranslationDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        productId: string;
        language: string;
    }>;
    findAll(productId?: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        productId: string;
        language: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        productId: string;
        language: string;
    }>;
    update(id: string, updateProductTranslationDto: UpdateProductTranslationDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        productId: string;
        language: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        productId: string;
        language: string;
    }>;
}
