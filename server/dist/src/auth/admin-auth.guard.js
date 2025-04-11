"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthGuard = void 0;
class AdminAuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return request.user?.role === 'ADMIN';
    }
}
exports.AdminAuthGuard = AdminAuthGuard;
//# sourceMappingURL=admin-auth.guard.js.map