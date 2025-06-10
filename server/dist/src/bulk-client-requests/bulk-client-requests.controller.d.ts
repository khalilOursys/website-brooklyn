import { BulkClientRequestsService } from './bulk-client-requests.service';
import { CreateBulkClientRequestDto } from './dto/create-bulk-client-request.dto';
import { UpdateUserBulkRequestDto } from './dto/update-bulk-client-request.dto';
export declare class BulkClientRequestsController {
    private readonly bulkClientRequestsService;
    constructor(bulkClientRequestsService: BulkClientRequestsService);
    createUserWithBulkRequest(createUserBulkRequestDto: CreateBulkClientRequestDto, legalDoc?: Express.Multer.File): Promise<{
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
    getUserWithBulkRequest(id: string): Promise<{
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
    updateUserWithBulkRequest(id: string, updateUserBulkRequestDto: UpdateUserBulkRequestDto, legalDoc?: Express.Multer.File): Promise<{
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
    deleteUserWithBulkRequest(id: string): Promise<{
        message: string;
    }>;
    updateBulkRequestStatus(id: string, status: string, reviewedById?: string): Promise<{
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
