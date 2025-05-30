"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductAttributeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_product_attribute_dto_1 = require("./create-product-attribute.dto");
class UpdateProductAttributeDto extends (0, mapped_types_1.PartialType)(create_product_attribute_dto_1.CreateProductAttributeDto) {
}
exports.UpdateProductAttributeDto = UpdateProductAttributeDto;
//# sourceMappingURL=update-product-attribute.dto.js.map