import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            role: any;
        };
    }>;
    getProfile(req: any): Promise<{
        cart: ({
            items: {
                id: string;
                productId: string;
                quantity: number;
                variantId: string | null;
                bulkId: string | null;
                cartId: string;
            }[];
        } & {
            id: string;
            updatedAt: Date;
            userId: string;
        }) | null;
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
}
