"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = processImage;
const sharp_1 = require("sharp");
async function processImage(buffer) {
    return (0, sharp_1.default)(buffer)
        .resize(800, 800, { fit: 'inside' })
        .webp({ quality: 80 })
        .toBuffer();
}
//# sourceMappingURL=image-processor.js.map