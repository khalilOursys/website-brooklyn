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
exports.ProductSearchController = void 0;
const common_1 = require("@nestjs/common");
const product_search_service_1 = require("./product-search.service");
const search_product_dto_1 = require("./dto/search-product.dto");
let ProductSearchController = class ProductSearchController {
    constructor(productSearchService) {
        this.productSearchService = productSearchService;
    }
    async search(query) {
        return await this.productSearchService.searchProducts(query);
    }
};
exports.ProductSearchController = ProductSearchController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_product_dto_1.SearchProductDto]),
    __metadata("design:returntype", Promise)
], ProductSearchController.prototype, "search", null);
exports.ProductSearchController = ProductSearchController = __decorate([
    (0, common_1.Controller)('product-search'),
    __metadata("design:paramtypes", [product_search_service_1.ProductSearchService])
], ProductSearchController);
//# sourceMappingURL=product-search.controller.js.map