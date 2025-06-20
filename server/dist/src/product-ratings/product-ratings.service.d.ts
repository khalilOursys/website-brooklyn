import { PrismaService } from '../prisma.service';
import { CreateProductRatingDto } from './dto/create-product-rating.dto';
import { UpdateProductRatingDto } from './dto/update-product-rating.dto';
export declare class ProductRatingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductRatingDto: CreateProductRatingDto): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
        rating: number;
        comment: string | null;
    }>;
    findAll(productId?: string): Promise<({
        user: {
            id: string;
            email: string;
            password: string;
            telephone: string | null;
            name: string | null;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
        rating: number;
        comment: string | null;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
        rating: number;
        comment: string | null;
    }>;
    update(id: string, updateProductRatingDto: UpdateProductRatingDto): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
        rating: number;
        comment: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
        rating: number;
        comment: string | null;
    }>;
}
