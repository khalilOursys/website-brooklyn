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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PaymentsService = class PaymentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPaymentDto) {
        const order = await this.prisma.order.findUnique({
            where: { id: createPaymentDto.orderId },
        });
        if (!order) {
            throw new common_1.BadRequestException(`Order with id ${createPaymentDto.orderId} does not exist.`);
        }
        return await this.prisma.payment.create({
            data: {
                orderId: createPaymentDto.orderId,
                amount: createPaymentDto.amount,
                method: createPaymentDto.method,
                status: createPaymentDto.status,
                paymentId: createPaymentDto.paymentId,
            },
        });
    }
    async findAll() {
        return await this.prisma.payment.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with id ${id} not found.`);
        }
        return payment;
    }
    async update(id, updatePaymentDto) {
        await this.findOne(id);
        return await this.prisma.payment.update({
            where: { id },
            data: updatePaymentDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.payment.delete({
            where: { id },
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map