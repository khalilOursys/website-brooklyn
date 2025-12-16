import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UpdateUserCitiesDto } from './dto/update-user-cities.dto';
export declare class UsersService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    onModuleInit(): Promise<void>;
    private ensureAdminUserExists;
    create(createUserDto: CreateUserDto): Promise<{
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
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    findOne(id: string): Promise<{
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
        userCities: ({
            city: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                state: string | null;
                country: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            cityId: string;
        })[];
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
    findByEmail(email: string): Promise<{
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
    } | null>;
    getAllUsers(role?: Role): Promise<({
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
        userCities: ({
            city: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                state: string | null;
                country: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            cityId: string;
        })[];
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
    })[]>;
    getUserById(id: string): Promise<({
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
        userCities: ({
            city: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                state: string | null;
                country: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            cityId: string;
        })[];
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
    }) | null>;
    getUserWithCities(userId: string): Promise<{
        userCities: ({
            city: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                state: string | null;
                country: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            cityId: string;
        })[];
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
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<{
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
    updateUserCities(userId: string, updateUserCitiesDto: UpdateUserCitiesDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        cityId: string;
    }[]>;
    updatePassword(userId: string, newPassword: string): Promise<void>;
    toggleStatus(id: string): Promise<{
        success: boolean;
        status: HttpStatus;
        isActive?: undefined;
    } | {
        success: boolean;
        status: HttpStatus;
        isActive: boolean;
    }>;
}
