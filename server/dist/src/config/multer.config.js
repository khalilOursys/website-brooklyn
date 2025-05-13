"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfigBundle = exports.multerConfigClientRequests = exports.multerConfigBrands = exports.multerConfigProduct = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.multerConfigProduct = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/products',
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = (0, path_1.extname)(file.originalname);
            callback(null, `${uniqueSuffix}${ext}`);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 10,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
};
exports.multerConfigBrands = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/brands',
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = (0, path_1.extname)(file.originalname);
            callback(null, `${uniqueSuffix}${ext}`);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 4,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
};
exports.multerConfigClientRequests = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/users',
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = (0, path_1.extname)(file.originalname);
            callback(null, `${uniqueSuffix}${ext}`);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 4,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        }
        else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
};
exports.multerConfigBundle = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/bundles',
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = (0, path_1.extname)(file.originalname);
            callback(null, `${uniqueSuffix}${ext}`);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 4,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
};
//# sourceMappingURL=multer.config.js.map