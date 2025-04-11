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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockAlertsController = void 0;
const common_1 = require("@nestjs/common");
const stock_alerts_service_1 = require("./stock-alerts.service");
const create_stock_alert_dto_1 = require("./dto/create-stock-alert.dto");
const update_stock_alert_dto_1 = require("./dto/update-stock-alert.dto");
let StockAlertsController = class StockAlertsController {
    constructor(stockAlertsService) {
        this.stockAlertsService = stockAlertsService;
    }
    async create(createStockAlertDto) {
        return await this.stockAlertsService.create(createStockAlertDto);
    }
    async findAll() {
        return await this.stockAlertsService.findAll();
    }
    async findByUser(userId) {
        return await this.stockAlertsService.findByUser(userId);
    }
    async findOne(id) {
        return await this.stockAlertsService.findOne(id);
    }
    async update(id, updateStockAlertDto) {
        return await this.stockAlertsService.update(id, updateStockAlertDto);
    }
    async remove(id) {
        return await this.stockAlertsService.remove(id);
    }
};
exports.StockAlertsController = StockAlertsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_alert_dto_1.CreateStockAlertDto]),
    __metadata("design:returntype", Promise)
], StockAlertsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StockAlertsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StockAlertsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StockAlertsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stock_alert_dto_1.UpdateStockAlertDto]),
    __metadata("design:returntype", Promise)
], StockAlertsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StockAlertsController.prototype, "remove", null);
exports.StockAlertsController = StockAlertsController = __decorate([
    (0, common_1.Controller)('stock-alerts'),
    __metadata("design:paramtypes", [stock_alerts_service_1.StockAlertsService])
], StockAlertsController);
//# sourceMappingURL=stock-alerts.controller.js.map