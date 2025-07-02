import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    uploadImages(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    create(createBrandDto: CreateBrandDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        img: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        description: string | null;
        img: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        img: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateBrandDto: UpdateBrandDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        img: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        img: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    toggleStatus(id: string): Promise<{
        success: boolean;
        isActive: boolean | undefined;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    getIsActived(): Promise<{
        id: string;
        name: string;
        description: string | null;
        img: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
