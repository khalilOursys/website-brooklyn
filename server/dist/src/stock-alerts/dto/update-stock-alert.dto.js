"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStockAlertDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_stock_alert_dto_1 = require("./create-stock-alert.dto");
class UpdateStockAlertDto extends (0, mapped_types_1.PartialType)(create_stock_alert_dto_1.CreateStockAlertDto) {
}
exports.UpdateStockAlertDto = UpdateStockAlertDto;
//# sourceMappingURL=update-stock-alert.dto.js.map