"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductTranslationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_product_translation_dto_1 = require("./create-product-translation.dto");
class UpdateProductTranslationDto extends (0, mapped_types_1.PartialType)(create_product_translation_dto_1.CreateProductTranslationDto) {
}
exports.UpdateProductTranslationDto = UpdateProductTranslationDto;
//# sourceMappingURL=update-product-translation.dto.js.map