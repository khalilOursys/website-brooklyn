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
exports.StockAlertsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let StockAlertsService = class StockAlertsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createStockAlertDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: createStockAlertDto.userId },
        });
        if (!user) {
            throw new common_1.BadRequestException(`User with id ${createStockAlertDto.userId} does not exist.`);
        }
        const product = await this.prisma.product.findUnique({
            where: { id: createStockAlertDto.productId },
        });
        if (!product) {
            throw new common_1.BadRequestException(`Product with id ${createStockAlertDto.productId} does not exist.`);
        }
        if (createStockAlertDto.variantId) {
            const variant = await this.prisma.productVariant.findUnique({
                where: { id: createStockAlertDto.variantId },
            });
            if (!variant) {
                throw new common_1.BadRequestException(`Variant with id ${createStockAlertDto.variantId} does not exist.`);
            }
        }
        return await this.prisma.stockAlert.create({
            data: {
                userId: createStockAlertDto.userId,
                productId: createStockAlertDto.productId,
                variantId: createStockAlertDto.variantId,
            },
        });
    }
    async findAll() {
        return await this.prisma.stockAlert.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByUser(userId) {
        return await this.prisma.stockAlert.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const alert = await this.prisma.stockAlert.findUnique({
            where: { id },
        });
        if (!alert) {
            throw new common_1.NotFoundException(`Stock alert with id ${id} not found.`);
        }
        return alert;
    }
    async update(id, updateStockAlertDto) {
        await this.findOne(id);
        return await this.prisma.stockAlert.update({
            where: { id },
            data: updateStockAlertDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.stockAlert.delete({
            where: { id },
        });
    }
};
exports.StockAlertsService = StockAlertsService;
exports.StockAlertsService = StockAlertsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockAlertsService);
//# sourceMappingURL=stock-alerts.service.js.map