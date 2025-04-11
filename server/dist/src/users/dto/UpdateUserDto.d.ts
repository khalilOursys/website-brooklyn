import { Role } from '@prisma/client';
export declare class UpdateUserDto {
    email?: string;
    password?: string | null;
    name?: string;
    role?: Role;
}
