"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const express = require("express");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.use('/uploads', express.static((0, path_1.join)(process.cwd(), 'uploads')));
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map