import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    uploadImages(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
    }>;
    findAll(): Promise<({
        parent: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
            description: string | null;
            bgUrl: string | null;
            iconUrl: string | null;
            bannerColor: string;
            bannerText: string;
            parentId: string | null;
        } | null;
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        parent: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
            description: string | null;
            bgUrl: string | null;
            iconUrl: string | null;
            bannerColor: string;
            bannerText: string;
            parentId: string | null;
        } | null;
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
    }>;
    findBySlug(slug: string): Promise<{
        parent: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
            description: string | null;
            bgUrl: string | null;
            iconUrl: string | null;
            bannerColor: string;
            bannerText: string;
            parentId: string | null;
        } | null;
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
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
        bgUrl: string | null;
        iconUrl: string | null;
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
        bgUrl: string | null;
        iconUrl: string | null;
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
    getCategoriesStructuredMobile(): Promise<{
        id: string;
        label: string;
        links: {
            href: string;
            label: string;
        }[];
    }[]>;
    getAllParent(): Promise<({
        children: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
            description: string | null;
            bgUrl: string | null;
            iconUrl: string | null;
            bannerColor: string;
            bannerText: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
    })[]>;
    getAllChildren(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
    }[]>;
}
