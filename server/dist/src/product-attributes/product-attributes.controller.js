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
exports.ProductAttributesController = void 0;
const common_1 = require("@nestjs/common");
const product_attributes_service_1 = require("./product-attributes.service");
const create_product_attribute_dto_1 = require("./dto/create-product-attribute.dto");
const update_product_attribute_dto_1 = require("./dto/update-product-attribute.dto");
let ProductAttributesController = class ProductAttributesController {
    constructor(productAttributesService) {
        this.productAttributesService = productAttributesService;
    }
    async create(createProductAttributeDto) {
        return await this.productAttributesService.create(createProductAttributeDto);
    }
    async findAll(productId) {
        return await this.productAttributesService.findAll(productId);
    }
    async findOne(id) {
        return await this.productAttributesService.findOne(id);
    }
    async update(id, updateProductAttributeDto) {
        return await this.productAttributesService.update(id, updateProductAttributeDto);
    }
    async remove(id) {
        return await this.productAttributesService.remove(id);
    }
};
exports.ProductAttributesController = ProductAttributesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_attribute_dto_1.CreateProductAttributeDto]),
    __metadata("design:returntype", Promise)
], ProductAttributesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductAttributesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductAttributesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_attribute_dto_1.UpdateProductAttributeDto]),
    __metadata("design:returntype", Promise)
], ProductAttributesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductAttributesController.prototype, "remove", null);
exports.ProductAttributesController = ProductAttributesController = __decorate([
    (0, common_1.Controller)('product-attributes'),
    __metadata("design:paramtypes", [product_attributes_service_1.ProductAttributesService])
], ProductAttributesController);
//# sourceMappingURL=product-attributes.controller.js.map