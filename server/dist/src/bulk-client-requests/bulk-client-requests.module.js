"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkClientRequestsModule = void 0;
const common_1 = require("@nestjs/common");
const bulk_client_requests_controller_1 = require("./bulk-client-requests.controller");
const bulk_client_requests_service_1 = require("./bulk-client-requests.service");
const prisma_service_1 = require("../prisma.service");
let BulkClientRequestsModule = class BulkClientRequestsModule {
};
exports.BulkClientRequestsModule = BulkClientRequestsModule;
exports.BulkClientRequestsModule = BulkClientRequestsModule = __decorate([
    (0, common_1.Module)({
        controllers: [bulk_client_requests_controller_1.BulkClientRequestsController],
        providers: [bulk_client_requests_service_1.BulkClientRequestsService, prisma_service_1.PrismaService],
    })
], BulkClientRequestsModule);
//# sourceMappingURL=bulk-client-requests.module.js.map