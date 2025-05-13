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
exports.BulkClientRequestsController = void 0;
const common_1 = require("@nestjs/common");
const bulk_client_requests_service_1 = require("./bulk-client-requests.service");
const create_bulk_client_request_dto_1 = require("./dto/create-bulk-client-request.dto");
const update_bulk_client_request_dto_1 = require("./dto/update-bulk-client-request.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../config/multer.config");
let BulkClientRequestsController = class BulkClientRequestsController {
    constructor(bulkClientRequestsService) {
        this.bulkClientRequestsService = bulkClientRequestsService;
    }
    async createUserWithBulkRequest(createUserBulkRequestDto, legalDoc) {
        const hostUrl = process.env.imagePath || 'http://localhost:3001';
        const imageUrl = `${hostUrl}/${legalDoc?.path.replace(/\\/g, '/')}`;
        return await this.bulkClientRequestsService.createUserWithBulkRequest({
            ...createUserBulkRequestDto,
            legalDocs: imageUrl,
        });
    }
    async getUserWithBulkRequest(id) {
        const user = await this.bulkClientRequestsService.getUserWithBulkRequest(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateUserWithBulkRequest(id, updateUserBulkRequestDto, legalDoc) {
        const updateData = legalDoc
            ? { ...updateUserBulkRequestDto, legalDocs: legalDoc.path }
            : updateUserBulkRequestDto;
        return await this.bulkClientRequestsService.updateUserWithBulkRequest(id, updateData);
    }
    async deleteUserWithBulkRequest(id) {
        await this.bulkClientRequestsService.deleteUserWithBulkRequest(id);
        return { message: 'User and bulk request deleted successfully' };
    }
    async updateBulkRequestStatus(id, status, reviewedById) {
        return this.bulkClientRequestsService.updateBulkRequestStatus(id, status, reviewedById);
    }
    findAll() {
        return this.bulkClientRequestsService.findAll();
    }
    async update(id, updateDto) {
        return await this.bulkClientRequestsService.update(id, updateDto);
    }
};
exports.BulkClientRequestsController = BulkClientRequestsController;
__decorate([
    (0, common_1.Post)('bulk-signup'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_config_1.multerConfigClientRequests)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bulk_client_request_dto_1.CreateBulkClientRequestDto, Object]),
    __metadata("design:returntype", Promise)
], BulkClientRequestsController.prototype, "createUserWithBulkRequest", null);
__decorate([
    (0, common_1.Get)('getUserWithBulkRequest/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BulkClientRequestsController.prototype, "getUserWithBulkRequest", null);
__decorate([
    (0, common_1.Put)(':id/with-bulk'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('legalDoc', multer_config_1.multerConfigClientRequests)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bulk_client_request_dto_1.UpdateUserBulkRequestDto, Object]),
    __metadata("design:returntype", Promise)
], BulkClientRequestsController.prototype, "updateUserWithBulkRequest", null);
__decorate([
    (0, common_1.Delete)(':id/with-bulk'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BulkClientRequestsController.prototype, "deleteUserWithBulkRequest", null);
__decorate([
    (0, common_1.Put)('bulk-requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('reviewedById')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BulkClientRequestsController.prototype, "updateBulkRequestStatus", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BulkClientRequestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bulk_client_request_dto_1.UpdateUserBulkRequestDto]),
    __metadata("design:returntype", Promise)
], BulkClientRequestsController.prototype, "update", null);
exports.BulkClientRequestsController = BulkClientRequestsController = __decorate([
    (0, common_1.Controller)('bulkClientRequests'),
    __metadata("design:paramtypes", [bulk_client_requests_service_1.BulkClientRequestsService])
], BulkClientRequestsController);
//# sourceMappingURL=bulk-client-requests.controller.js.map