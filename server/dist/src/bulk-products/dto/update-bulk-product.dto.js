"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBulkProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_bulk_product_dto_1 = require("./create-bulk-product.dto");
class UpdateBulkProductDto extends (0, mapped_types_1.PartialType)(create_bulk_product_dto_1.CreateBulkProductDto) {
}
exports.UpdateBulkProductDto = UpdateBulkProductDto;
//# sourceMappingURL=update-bulk-product.dto.js.map