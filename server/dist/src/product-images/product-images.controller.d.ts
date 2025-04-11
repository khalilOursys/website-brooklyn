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
        productId: string;
    }>;
    findAll(productId?: string): Promise<{
        id: string;
        url: string;
        isPrimary: boolean;
        productId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        url: string;
        isPrimary: boolean;
        productId: string;
    }>;
    update(id: string, updateProductImageDto: UpdateProductImageDto): Promise<{
        id: string;
        url: string;
        isPrimary: boolean;
        productId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        url: string;
        isPrimary: boolean;
        productId: string;
    }>;
}
