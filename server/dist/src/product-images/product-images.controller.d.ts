import { ProductImagesService } from './product-images.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
export declare class ProductImagesController {
    private readonly productImagesService;
    constructor(productImagesService: ProductImagesService);
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
