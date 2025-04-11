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
exports.ProductRatingsController = void 0;
const common_1 = require("@nestjs/common");
const product_ratings_service_1 = require("./product-ratings.service");
const create_product_rating_dto_1 = require("./dto/create-product-rating.dto");
const update_product_rating_dto_1 = require("./dto/update-product-rating.dto");
let ProductRatingsController = class ProductRatingsController {
    constructor(productRatingsService) {
        this.productRatingsService = productRatingsService;
    }
    async create(createProductRatingDto) {
        return await this.productRatingsService.create(createProductRatingDto);
    }
    async findAll(productId) {
        return await this.productRatingsService.findAll(productId);
    }
    async findOne(id) {
        return await this.productRatingsService.findOne(id);
    }
    async update(id, updateProductRatingDto) {
        return await this.productRatingsService.update(id, updateProductRatingDto);
    }
    async remove(id) {
        return await this.productRatingsService.remove(id);
    }
};
exports.ProductRatingsController = ProductRatingsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_rating_dto_1.CreateProductRatingDto]),
    __metadata("design:returntype", Promise)
], ProductRatingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductRatingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductRatingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_rating_dto_1.UpdateProductRatingDto]),
    __metadata("design:returntype", Promise)
], ProductRatingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductRatingsController.prototype, "remove", null);
exports.ProductRatingsController = ProductRatingsController = __decorate([
    (0, common_1.Controller)('product-ratings'),
    __metadata("design:paramtypes", [product_ratings_service_1.ProductRatingsService])
], ProductRatingsController);
//# sourceMappingURL=product-ratings.controller.js.map