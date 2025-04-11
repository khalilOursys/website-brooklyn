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
const prisma_service_1 = require("../prisma.service");
let BulkClientRequestsService = class BulkClientRequestsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const existingRequest = await this.prisma.bulkClientRequest.findUnique({
            where: { userId: createDto.userId },
        });
        if (existingRequest) {
            throw new common_1.BadRequestException(`User with id ${createDto.userId} already has a bulk request.`);
        }
        return await this.prisma.bulkClientRequest.create({
            data: {
                userId: createDto.userId,
                storeName: createDto.storeName,
                legalDocs: createDto.legalDocs,
                status: 'pending',
            },
        });
    }
    async findAll() {
        return await this.prisma.bulkClientRequest.findMany({
            orderBy: { submittedAt: 'desc' },
            include: { user: true },
        });
    }
    async findOne(id) {
        const request = await this.prisma.bulkClientRequest.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!request) {
            throw new common_1.NotFoundException(`Bulk client request with id ${id} not found.`);
        }
        return request;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return await this.prisma.bulkClientRequest.update({
            where: { id },
            data: updateDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.bulkClientRequest.delete({
            where: { id },
        });
    }
};
exports.BulkClientRequestsService = BulkClientRequestsService;
exports.BulkClientRequestsService = BulkClientRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BulkClientRequestsService);
//# sourceMappingURL=bulk-client-requests.service.js.map