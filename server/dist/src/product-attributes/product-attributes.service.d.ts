import { PrismaService } from '../prisma.service';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
export declare class ProductAttributesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductAttributeDto: CreateProductAttributeDto): Promise<{
        id: string;
        key: string;
        value: string;
        productId: string;
    }>;
    findAll(productId?: string): Promise<{
        id: string;
        key: string;
        value: string;
        productId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        key: string;
        value: string;
        productId: string;
    }>;
    update(id: string, updateProductAttributeDto: UpdateProductAttributeDto): Promise<{
        id: string;
        key: string;
        value: string;
        productId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        key: string;
        value: string;
        productId: string;
    }>;
}
