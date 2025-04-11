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
exports.ProductImagesController = void 0;
const common_1 = require("@nestjs/common");
const product_images_service_1 = require("./product-images.service");
const create_product_image_dto_1 = require("./dto/create-product-image.dto");
const update_product_image_dto_1 = require("./dto/update-product-image.dto");
let ProductImagesController = class ProductImagesController {
    constructor(productImagesService) {
        this.productImagesService = productImagesService;
    }
    async create(createProductImageDto) {
        return await this.productImagesService.create(createProductImageDto);
    }
    async findAll(productId) {
        return await this.productImagesService.findAll(productId);
    }
    async findOne(id) {
        return await this.productImagesService.findOne(id);
    }
    async update(id, updateProductImageDto) {
        return await this.productImagesService.update(id, updateProductImageDto);
    }
    async remove(id) {
        return await this.productImagesService.remove(id);
    }
};
exports.ProductImagesController = ProductImagesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_image_dto_1.CreateProductImageDto]),
    __metadata("design:returntype", Promise)
], ProductImagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductImagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductImagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_image_dto_1.UpdateProductImageDto]),
    __metadata("design:returntype", Promise)
], ProductImagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductImagesController.prototype, "remove", null);
exports.ProductImagesController = ProductImagesController = __decorate([
    (0, common_1.Controller)('product-images'),
    __metadata("design:paramtypes", [product_images_service_1.ProductImagesService])
], ProductImagesController);
//# sourceMappingURL=product-images.controller.js.map