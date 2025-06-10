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
exports.BulkClientRequestsService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs = require("bcryptjs");
const prisma_service_1 = require("../prisma.service");
let BulkClientRequestsService = class BulkClientRequestsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUserWithBulkRequest(data) {
        const hashedPassword = await bcryptjs.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                firstName: data.firstName,
                lastName: data.lastName,
                role: 'BULK_CLIENT',
                bulkRequests: {
                    create: {
                        storeName: data.storeName,
                        legalDocs: data.legalDocs,
                        status: 'en attente',
                    },
                },
            },
            include: {
                bulkRequests: true,
            },
        });
    }
    async getUserWithBulkRequest(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { bulkRequests: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateUserWithBulkRequest(userId, data) {
        const updateData = {};
        const bulkUpdateData = {};
        if (data.email)
            updateData.email = data.email;
        if (data.name)
            updateData.name = data.name;
        if (data.password) {
            updateData.password = await bcryptjs.hash(data.password, 10);
        }
        if (data.storeName)
            bulkUpdateData.storeName = data.storeName;
        if (data.legalDocs)
            bulkUpdateData.legalDocs = data.legalDocs;
        if (data.status) {
            bulkUpdateData.status = data.status;
            if (data.status === 'approuvée' || data.status === 'annulé') {
                bulkUpdateData.reviewedAt = new Date();
            }
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                ...updateData,
                bulkRequests: {
                    update: {
                        where: { userId },
                        data: bulkUpdateData,
                    },
                },
            },
            include: {
                bulkRequests: true,
            },
        });
    }
    async deleteUserWithBulkRequest(userId) {
        await this.prisma.bulkClientRequest.deleteMany({
            where: { userId },
        });
        return this.prisma.user.delete({
            where: { id: userId },
        });
    }
    async updateBulkRequestStatus(bulkRequestId, status, reviewedById) {
        const updateData = { status };
        if (status === 'approuvée' || status === 'annulé') {
            updateData.reviewedAt = new Date();
            if (reviewedById) {
                updateData.reviewedById = reviewedById;
            }
        }
        return this.prisma.bulkClientRequest.update({
            where: { id: bulkRequestId },
            data: updateData,
            include: {
                user: true,
                reviewedBy: true,
            },
        });
    }
    async findAll() {
        return await this.prisma.bulkClientRequest.findMany({
            include: {
                user: true,
            },
        });
    }
    async update(id, updateDto) {
        const currentRequest = await this.prisma.bulkClientRequest.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });
        if (!currentRequest) {
            throw new Error('Request not found');
        }
        const updatedRequest = await this.prisma.bulkClientRequest.update({
            where: { id },
            data: updateDto,
        });
        if (currentRequest.status !== 'approuvée' &&
            updatedRequest.status === 'approuvée') {
            const existingCart = await this.prisma.cart.findFirst({
                where: {
                    userId: currentRequest.userId,
                },
            });
            if (!existingCart) {
                await this.prisma.cart.create({
                    data: {
                        userId: currentRequest.userId,
                    },
                });
            }
            else {
                console.log(`User ${currentRequest.userId} already has a cart`);
            }
        }
        return updatedRequest;
    }
};
exports.BulkClientRequestsService = BulkClientRequestsService;
exports.BulkClientRequestsService = BulkClientRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BulkClientRequestsService);
//# sourceMappingURL=bulk-client-requests.service.js.map