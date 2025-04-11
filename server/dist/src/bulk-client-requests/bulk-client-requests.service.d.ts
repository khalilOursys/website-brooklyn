import { PrismaService } from '../prisma.service';
import { CreateBulkClientRequestDto } from './dto/create-bulk-client-request.dto';
import { UpdateBulkClientRequestDto } from './dto/update-bulk-client-request.dto';
export declare class BulkClientRequestsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateBulkClientRequestDto): Promise<{
        id: string;
        userId: string;
        storeName: string;
        legalDocs: string;
        status: string;
        reviewedById: string | null;
        submittedAt: Date;
        reviewedAt: Date | null;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            password: string | null;
            name: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        userId: string;
        storeName: string;
        legalDocs: string;
        status: string;
        reviewedById: string | null;
        submittedAt: Date;
        reviewedAt: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            password: string | null;
            name: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        userId: string;
        storeName: string;
        legalDocs: string;
        status: string;
        reviewedById: string | null;
        submittedAt: Date;
        reviewedAt: Date | null;
    }>;
    update(id: string, updateDto: UpdateBulkClientRequestDto): Promise<{
        id: string;
        userId: string;
        storeName: string;
        legalDocs: string;
        status: string;
        reviewedById: string | null;
        submittedAt: Date;
        reviewedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        storeName: string;
        legalDocs: string;
        status: string;
        reviewedById: string | null;
        submittedAt: Date;
        reviewedAt: Date | null;
    }>;
}
