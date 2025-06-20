import { Role } from '@prisma/client';
export declare class CreateUserDto {
    email: string;
    password: string;
    name?: string;
    telephone?: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
}
