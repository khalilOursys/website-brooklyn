"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductBundleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_product_bundle_dto_1 = require("./create-product-bundle.dto");
class UpdateProductBundleDto extends (0, mapped_types_1.PartialType)(create_product_bundle_dto_1.CreateProductBundleDto) {
}
exports.UpdateProductBundleDto = UpdateProductBundleDto;
//# sourceMappingURL=update-product-bundle.dto.js.map