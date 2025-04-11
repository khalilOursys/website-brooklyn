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
exports.BulkProductsController = void 0;
const common_1 = require("@nestjs/common");
const bulk_products_service_1 = require("./bulk-products.service");
const create_bulk_product_dto_1 = require("./dto/create-bulk-product.dto");
const update_bulk_product_dto_1 = require("./dto/update-bulk-product.dto");
let BulkProductsController = class BulkProductsController {
    constructor(bulkProductsService) {
        this.bulkProductsService = bulkProductsService;
    }
    async create(createBulkProductDto) {
        return await this.bulkProductsService.create(createBulkProductDto);
    }
    async findAll() {
        return await this.bulkProductsService.findAll();
    }
    async findOne(id) {
        return await this.bulkProductsService.findOne(id);
    }
    async update(id, updateBulkProductDto) {
        return await this.bulkProductsService.update(id, updateBulkProductDto);
    }
    async remove(id) {
        return await this.bulkProductsService.remove(id);
    }
};
exports.BulkProductsController = BulkProductsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bulk_product_dto_1.CreateBulkProductDto]),
    __metadata("design:returntype", Promise)
], BulkProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BulkProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BulkProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bulk_product_dto_1.UpdateBulkProductDto]),
    __metadata("design:returntype", Promise)
], BulkProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BulkProductsController.prototype, "remove", null);
exports.BulkProductsController = BulkProductsController = __decorate([
    (0, common_1.Controller)('bulk-products'),
    __metadata("design:paramtypes", [bulk_products_service_1.BulkProductsService])
], BulkProductsController);
//# sourceMappingURL=bulk-products.controller.js.map