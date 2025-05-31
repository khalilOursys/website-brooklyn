import { CreateBulkClientRequestDto } from './dto/create-bulk-client-request.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserBulkRequestDto } from './dto/update-bulk-client-request.dto';
export declare class BulkClientRequestsService {
    private prisma;
    constructor(prisma: PrismaService);
    createUserWithBulkRequest(data: CreateBulkClientRequestDto): Promise<{
        bulkRequests: {
            id: string;
            userId: string;
            storeName: string;
            legalDocs: string;
            status: string;
            reviewedById: string | null;
            submittedAt: Date;
            reviewedAt: Date | null;
        } | null;
    } & {
        id: string;
        email: string;
        password: string;
        name: string | null;
        firstName: string | null;
        lastName: string | null;
        role: import(".prisma/client").$Enums.Role;
        oauthProvider: string | null;
        oauthId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserWithBulkRequest(userId: string): Promise<{
        bulkRequests: {
            id: string;
            userId: string;
            storeName: string;
            legalDocs: string;
            status: string;
            reviewedById: string | null;
            submittedAt: Date;
            reviewedAt: Date | null;
        } | null;
    } & {
        id: string;
        email: string;
        password: string;
        name: string | null;
        firstName: string | null;
        lastName: string | null;
        role: import(".prisma/client").$Enums.Role;
        oauthProvider: string | null;
        oauthId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserWithBulkRequest(userId: string, data: UpdateUserBulkRequestDto): Promise<{
        bulkRequests: {
            id: string;
            userId: string;
            storeName: string;
            legalDocs: string;
            status: string;
            reviewedById: string | null;
            submittedAt: Date;
            reviewedAt: Date | null;
        } | null;
    } & {
        id: string;
        email: string;
        password: string;
        name: string | null;
        firstName: string | null;
        lastName: string | null;
        role: import(".prisma/client").$Enums.Role;
        oauthProvider: string | null;
        oauthId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUserWithBulkRequest(userId: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        firstName: string | null;
        lastName: string | null;
        role: import(".prisma/client").$Enums.Role;
        oauthProvider: string | null;
        oauthId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateBulkRequestStatus(bulkRequestId: string, status: string, reviewedById?: string): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            name: string | null;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        reviewedBy: {
            id: string;
            email: string;
            password: string;
            name: string | null;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.Role;
            oauthProvider: string | null;
            oauthId: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
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
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            password: string;
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
        userId: string;
        storeName: string;
        legalDocs: string;
        status: string;
        reviewedById: string | null;
        submittedAt: Date;
        reviewedAt: Date | null;
    })[]>;
    update(id: string, updateDto: UpdateUserBulkRequestDto): Promise<{
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
