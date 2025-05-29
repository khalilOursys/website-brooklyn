import { CreateBulkClientRequestDto } from './dto/create-bulk-client-request.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserBulkRequestDto } from './dto/update-bulk-client-request.dto';
export declare class BulkClientRequestsService {
    private prisma;
    constructor(prisma: PrismaService);
    createUserWithBulkRequest(data: CreateBulkClientRequestDto): Promise<{
        bulkRequests: {
            id: string;
            storeName: string;
            legalDocs: string;
            status: string;
            submittedAt: Date;
            reviewedAt: Date | null;
            reviewedById: string | null;
            userId: string;
        } | null;
    } & {
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        role: import(".prisma/client").$Enums.Role;
        oauthProvider: string | null;
        oauthId: string | null;
    }>;
    getUserWithBulkRequest(userId: string): Promise<{
        bulkRequests: {
            id: string;
            storeName: string;
            legalDocs: string;
            status: string;
            submittedAt: Date;
            reviewedAt: Date | null;
            reviewedById: string | null;
            userId: string;
        } | null;
    } & {
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        role: import(".prisma/client").$Enums.Role;
        oauthProvider: string | null;
        oauthId: string | null;
    }>;
    updateUserWithBulkRequest(userId: string, data: UpdateUserBulkRequestDto): Promise<{
        bulkRequests: {
            id: string;
            storeName: string;
            legalDocs: string;
            status: string;
            submittedAt: Date;
            reviewedAt: Date | null;
            reviewedById: string | null;
            userId: string;
        } | null;
    } & {
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        role: import(".prisma/client").$Enums.Role;
        oauthProvider: string | null;
        oauthId: string | null;
    }>;
    deleteUserWithBulkRequest(userId: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        role: import(".prisma/client").$Enums.Role;
        oauthProvider: string | null;
        oauthId: string | null;
    }>;
    updateBulkRequestStatus(bulkRequestId: string, status: string, reviewedById?: string): Promise<{
        user: {
            id: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
        };
        reviewedBy: {
            id: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
        } | null;
    } & {
        id: string;
        storeName: string;
        legalDocs: string;
        status: string;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedById: string | null;
        userId: string;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
        };
    } & {
        id: string;
        storeName: string;
        legalDocs: string;
        status: string;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedById: string | null;
        userId: string;
    })[]>;
    update(id: string, updateDto: UpdateUserBulkRequestDto): Promise<{
        id: string;
        storeName: string;
        legalDocs: string;
        status: string;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedById: string | null;
        userId: string;
    }>;
}
