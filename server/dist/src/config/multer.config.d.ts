export declare const multerConfigProduct: {
    storage: import("multer").StorageEngine;
    limits: {
        fileSize: number;
        files: number;
    };
    fileFilter: (req: any, file: {
        mimetype: string;
    }, cb: (arg0: Error | null, arg1: boolean) => void) => void;
};
export declare const multerConfigBrands: {
    storage: import("multer").StorageEngine;
    limits: {
        fileSize: number;
        files: number;
    };
    fileFilter: (req: any, file: {
        mimetype: string;
    }, cb: (arg0: Error | null, arg1: boolean) => void) => void;
};
