import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { MailerService } from 'src/mailer/mailer.services';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private authService;
    private usersService;
    private readonly mailerService;
    private readonly jwtService;
    constructor(authService: AuthService, usersService: UsersService, mailerService: MailerService, jwtService: JwtService);
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
                variantId: string | null;
                productId: string;
                quantity: number;
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
            address: string | null;
            rib: string | null;
            taxNumber: string | null;
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
        telephone: string | null;
        name: string | null;
        firstName: string | null;
        lastName: string | null;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        oauthProvider: string | null;
        oauthId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    forgotPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    resetPassword(body: {
        token: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
}
