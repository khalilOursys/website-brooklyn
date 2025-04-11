import { ProductAttributesService } from './product-attributes.service';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
export declare class ProductAttributesController {
    private readonly productAttributesService;
    constructor(productAttributesService: ProductAttributesService);
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
