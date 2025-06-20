import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/UpdateUserDto';
export declare class UsersService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<{
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
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    findOne(id: string): Promise<{
        cart: ({
            items: {
                id: string;
                cartId: string;
                productId: string;
                variantId: string | null;
                bulkId: string | null;
                quantity: number;
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
        oauthProvider: string | null;
        oauthId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
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
    } | null>;
    getAllUsers(role?: Role): Promise<({
        bulkRequests: {
            id: string;
            userId: string;
            storeName: string;
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
        oauthProvider: string | null;
        oauthId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getUserById(id: string): Promise<({
        bulkRequests: {
            id: string;
            userId: string;
            storeName: string;
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
        oauthProvider: string | null;
        oauthId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<{
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
    }>;
}
