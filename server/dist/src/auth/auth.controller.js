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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
const mailer_services_1 = require("../mailer/mailer.services");
const jwt_1 = require("@nestjs/jwt");
let AuthController = class AuthController {
    constructor(authService, usersService, mailerService, jwtService) {
        this.authService = authService;
        this.usersService = usersService;
        this.mailerService = mailerService;
        this.jwtService = jwtService;
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    getProfile(req) {
        var idUser = req.user.userId;
        var user = this.usersService.findOne(idUser);
        return user;
    }
    async forgotPassword(body) {
        const user = await this.usersService.findByEmail(body.email);
        if (!user) {
            return { message: 'If this email exists, a reset link has been sent' };
        }
        const resetToken = this.jwtService.sign({ userId: user.id }, {
            secret: process.env.JWT_RESET_SECRET,
            expiresIn: '1h',
        });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        await this.mailerService.sendPasswordResetEmail(user.email, resetLink, '1 heure');
        return { message: 'If this email exists, a reset link has been sent' };
    }
    async resetPassword(body) {
        try {
            const payload = this.jwtService.verify(body.token, {
                secret: process.env.JWT_RESET_SECRET,
            });
            await this.usersService.updatePassword(payload.userId, body.newPassword);
            return { message: 'Mot de passe mis à jour avec succès' };
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new common_1.BadRequestException('Password reset token has expired');
            }
            throw new common_1.BadRequestException('Invalid token');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        mailer_services_1.MailerService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map