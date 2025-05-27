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
exports.ProductBundlesController = void 0;
const common_1 = require("@nestjs/common");
const product_bundles_service_1 = require("./product-bundles.service");
const create_product_bundle_dto_1 = require("./dto/create-product-bundle.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../config/multer.config");
let ProductBundlesController = class ProductBundlesController {
    constructor(productBundlesService) {
        this.productBundlesService = productBundlesService;
    }
    async uploadImages(file) {
        const hostUrl = process.env.imagePath || 'http://localhost:3001';
        const imageUrl = `${hostUrl}/${file.path.replace(/\\/g, '/')}`;
        return { url: imageUrl };
    }
    async create(createProductBundleDto) {
        return await this.productBundlesService.create(createProductBundleDto);
    }
    async findAll() {
        return await this.productBundlesService.findAll();
    }
    async findOne(id) {
        return await this.productBundlesService.findOne(id);
    }
    async update(id, updateProductBundleDto) {
        return await this.productBundlesService.update(id, updateProductBundleDto);
    }
    async remove(id) {
        return await this.productBundlesService.remove(id);
    }
};
exports.ProductBundlesController = ProductBundlesController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_config_1.multerConfigBundle)),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductBundlesController.prototype, "uploadImages", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_bundle_dto_1.CreateProductBundleDto]),
    __metadata("design:returntype", Promise)
], ProductBundlesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductBundlesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('getProductBundlesById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductBundlesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_product_bundle_dto_1.CreateProductBundleDto]),
    __metadata("design:returntype", Promise)
], ProductBundlesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductBundlesController.prototype, "remove", null);
exports.ProductBundlesController = ProductBundlesController = __decorate([
    (0, common_1.Controller)('productBundles'),
    __metadata("design:paramtypes", [product_bundles_service_1.ProductBundlesService])
], ProductBundlesController);
//# sourceMappingURL=product-bundles.controller.js.map