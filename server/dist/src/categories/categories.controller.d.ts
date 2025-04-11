import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        description: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        description: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        description: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        description: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        description: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
    }>;
    getStructuredCategories(): Promise<{
        heading: string;
        links: {
            href: string;
            text: string;
        }[];
    }[]>;
}
