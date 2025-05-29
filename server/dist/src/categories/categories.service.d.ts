import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        parent: {
            id: string;
            name: string;
            slug: string | null;
            description: string | null;
            bgUrl: string | null;
            iconUrl: string | null;
            bannerColor: string;
            bannerText: string;
            parentId: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: string;
        name: string;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        parent: {
            id: string;
            name: string;
            slug: string | null;
            description: string | null;
            bgUrl: string | null;
            iconUrl: string | null;
            bannerColor: string;
            bannerText: string;
            parentId: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: string;
        name: string;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCategoriesStructured(): Promise<{
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
    findAllChildren(): Promise<{
        id: string;
        name: string;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAllParent(): Promise<({
        children: {
            id: string;
            name: string;
            slug: string | null;
            description: string | null;
            bgUrl: string | null;
            iconUrl: string | null;
            bannerColor: string;
            bannerText: string;
            parentId: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        name: string;
        slug: string | null;
        description: string | null;
        bgUrl: string | null;
        iconUrl: string | null;
        bannerColor: string;
        bannerText: string;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
