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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let BrandsService = class BrandsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBrandDto) {
        const existing = await this.prisma.brand.findUnique({
            where: { name: createBrandDto.name },
        });
        if (existing) {
            throw new common_1.BadRequestException(`Brand with name "${createBrandDto.name}" already exists.`);
        }
        return await this.prisma.brand.create({
            data: createBrandDto,
        });
    }
    async findAll() {
        return await this.prisma.brand.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const brand = await this.prisma.brand.findUnique({ where: { id } });
        if (!brand) {
            throw new common_1.NotFoundException(`Brand with id ${id} not found.`);
        }
        return brand;
    }
    async update(id, updateBrandDto) {
        await this.findOne(id);
        return await this.prisma.brand.update({
            where: { id },
            data: updateBrandDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.brand.delete({
            where: { id },
        });
    }
    async toggleStatus(id) {
        try {
            const brand = await this.prisma.brand.findUnique({ where: { id } });
            if (!brand) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND };
            }
            const updatedBrand = await this.prisma.brand.update({
                where: { id },
                data: { isActive: !brand.isActive },
            });
            return {
                success: true,
                status: common_1.HttpStatus.OK,
                isActive: updatedBrand.isActive,
            };
        }
        catch (error) {
            return { success: false, status: common_1.HttpStatus.FORBIDDEN };
        }
    }
};
exports.BrandsService = BrandsService;
exports.BrandsService = BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BrandsService);
//# sourceMappingURL=brands.service.js.map