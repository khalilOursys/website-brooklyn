import { HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { MailerService } from 'src/mailer/mailer.services';
import { UpdateUserCitiesDto } from './dto/update-user-cities.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly mailerService;
    constructor(usersService: UsersService, mailerService: MailerService);
    register(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
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
    getUserById(id: string): Promise<{
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
    getUserCities(id: string): Promise<({
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
    })[]>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
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
    updateUserCities(id: string, updateUserCitiesDto: UpdateUserCitiesDto): Promise<{
        message: string;
        count: number;
        cities: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            cityId: string;
        }[];
    }>;
    toggleStatus(id: string): Promise<{
        success: boolean;
        isActive: boolean | undefined;
        statusCode: HttpStatus;
    }>;
    contact(body: {
        email: string;
        nom: string;
        prenom: string;
        msg: string;
    }): Promise<{
        success: boolean;
        messageId: string;
        response: string;
    }>;
}
