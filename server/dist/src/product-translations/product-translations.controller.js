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
exports.ProductTranslationsController = void 0;
const common_1 = require("@nestjs/common");
const product_translations_service_1 = require("./product-translations.service");
const create_product_translation_dto_1 = require("./dto/create-product-translation.dto");
const update_product_translation_dto_1 = require("./dto/update-product-translation.dto");
let ProductTranslationsController = class ProductTranslationsController {
    constructor(productTranslationsService) {
        this.productTranslationsService = productTranslationsService;
    }
    async create(createProductTranslationDto) {
        return await this.productTranslationsService.create(createProductTranslationDto);
    }
    async findAll(productId) {
        return await this.productTranslationsService.findAll(productId);
    }
    async findOne(id) {
        return await this.productTranslationsService.findOne(id);
    }
    async update(id, updateProductTranslationDto) {
        return await this.productTranslationsService.update(id, updateProductTranslationDto);
    }
    async remove(id) {
        return await this.productTranslationsService.remove(id);
    }
};
exports.ProductTranslationsController = ProductTranslationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_translation_dto_1.CreateProductTranslationDto]),
    __metadata("design:returntype", Promise)
], ProductTranslationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductTranslationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductTranslationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_translation_dto_1.UpdateProductTranslationDto]),
    __metadata("design:returntype", Promise)
], ProductTranslationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductTranslationsController.prototype, "remove", null);
exports.ProductTranslationsController = ProductTranslationsController = __decorate([
    (0, common_1.Controller)('product-translations'),
    __metadata("design:paramtypes", [product_translations_service_1.ProductTranslationsService])
], ProductTranslationsController);
//# sourceMappingURL=product-translations.controller.js.map