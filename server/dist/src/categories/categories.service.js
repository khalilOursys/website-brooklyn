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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CategoriesService = class CategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto) {
        const existing = await this.prisma.category.findUnique({
            where: { name: createCategoryDto.name },
        });
        if (existing) {
            throw new common_1.BadRequestException(`Category with name "${createCategoryDto.name}" already exists.`);
        }
        return await this.prisma.category.create({
            data: createCategoryDto,
        });
    }
    async findAll() {
        return await this.prisma.category.findMany({
            include: {
                parent: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                parent: true,
            },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with id ${id} not found.`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        await this.findOne(id);
        return await this.prisma.category.update({
            where: { id },
            data: updateCategoryDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.category.delete({
            where: { id },
        });
    }
    async getCategoriesStructured() {
        const categories = await this.prisma.category.findMany({
            where: { parentId: null },
            include: { children: true },
        });
        return categories.map((category) => ({
            heading: category.name,
            links: category.children.map((child) => ({
                href: `/category/${child.slug || child.name.toLowerCase().replace(/\s+/g, '-')}`,
                text: child.name,
            })),
        }));
    }
    async getCategoriesStructuredMobile() {
        const categories = await this.prisma.category.findMany({
            where: { parentId: null },
            include: { children: true },
        });
        return categories.map((category) => ({
            id: category.id,
            label: category.name,
            links: category.children.map((child) => ({
                href: `/category/${child.slug || child.name.toLowerCase().replace(/\s+/g, '-')}`,
                label: child.name,
            })),
        }));
    }
    async findAllChildren() {
        return await this.prisma.category.findMany({
            where: {
                parentId: {
                    not: null,
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findAllParent() {
        return await this.prisma.category.findMany({
            where: { parentId: null },
            include: { children: true },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map