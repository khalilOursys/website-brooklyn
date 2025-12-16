"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcryptjs = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
let UsersService = class UsersService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async onModuleInit() {
        await this.ensureAdminUserExists();
    }
    async ensureAdminUserExists() {
        const adminEmail = 'admin.admin@admin.com';
        const adminPassword = 'adminadmin';
        const usersCount = await this.prisma.user.count();
        if (usersCount === 0) {
            const adminUserDto = {
                email: adminEmail,
                password: adminPassword,
                name: 'Admin',
                firstName: 'Admin',
                lastName: 'Admin',
                role: client_1.Role.ADMIN,
            };
            await this.create(adminUserDto);
        }
    }
    async create(createUserDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            if (existingUser.role === 'GUEST') {
                const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);
                return await this.prisma.user.update({
                    where: { id: existingUser.id },
                    data: {
                        email: createUserDto.email,
                        password: hashedPassword,
                        name: createUserDto.name,
                        telephone: createUserDto.telephone,
                        firstName: createUserDto.firstName,
                        lastName: createUserDto.lastName,
                        role: createUserDto.role,
                    },
                });
            }
            else {
                throw new common_1.ConflictException('E-mail déjà utilisé');
            }
        }
        const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);
        return await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: hashedPassword,
                name: createUserDto.name,
                telephone: createUserDto.telephone,
                firstName: createUserDto.firstName,
                lastName: createUserDto.lastName,
                role: createUserDto.role,
            },
        });
    }
    async login(loginDto) {
        const user = await this.prisma.user.findFirst({
            where: { email: loginDto.email },
        });
        if (!user || !user.password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcryptjs.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);
        return { accessToken: token };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                cart: {
                    include: {
                        items: true,
                    },
                },
                bulkRequests: true,
                userCities: {
                    include: {
                        city: true,
                    },
                },
            },
        });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
    async findByEmail(email) {
        return await this.prisma.user.findFirst({
            where: { email },
        });
    }
    async getAllUsers(role) {
        const whereCondition = role ? { role } : { role: { not: client_1.Role.GUEST } };
        return this.prisma.user.findMany({
            where: whereCondition,
            include: {
                bulkRequests: true,
                userCities: {
                    include: {
                        city: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getUserById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                bulkRequests: true,
                userCities: {
                    include: {
                        city: true,
                    },
                },
            },
        });
    }
    async getUserWithCities(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                userCities: {
                    include: {
                        city: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }
    async updateUser(userId, updateUserDto) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!existingUser) {
                throw new common_1.NotFoundException(`User with ID ${userId} not found`);
            }
            if (!updateUserDto.password || updateUserDto.password.trim() === '') {
                updateUserDto.password =
                    existingUser.password || updateUserDto.password;
            }
            else {
                updateUserDto.password = await bcryptjs.hash(updateUserDto.password, 10);
            }
            return await this.prisma.user.update({
                where: { id: userId },
                data: updateUserDto,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`User with ID ${userId} not found`);
            }
            throw error;
        }
    }
    async updateUserCities(userId, updateUserCitiesDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${userId} not found`);
            }
            return await this.prisma.$transaction(async (prisma) => {
                await prisma.userCity.deleteMany({
                    where: { userId },
                });
                const cities = await prisma.city.findMany({
                    where: {
                        id: { in: updateUserCitiesDto.cityIds },
                    },
                });
                if (cities.length !== updateUserCitiesDto.cityIds.length) {
                    throw new common_1.NotFoundException('One or more cities not found');
                }
                const newUserCities = await Promise.all(updateUserCitiesDto.cityIds.map((cityId) => prisma.userCity.create({
                    data: {
                        userId,
                        cityId,
                    },
                })));
                return newUserCities;
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`User or City not found`);
            }
            throw error;
        }
    }
    async updatePassword(userId, newPassword) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
    }
    async toggleStatus(id) {
        try {
            const user = await this.prisma.user.findUnique({ where: { id } });
            if (!user) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND };
            }
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: { isActive: !user.isActive },
            });
            return {
                success: true,
                status: common_1.HttpStatus.OK,
                isActive: updatedUser.isActive,
            };
        }
        catch (error) {
            return { success: false, status: common_1.HttpStatus.FORBIDDEN };
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map