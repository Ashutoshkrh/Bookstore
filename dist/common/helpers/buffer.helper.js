"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferHelper = void 0;
class BufferHelper {
    static plainToBase64(value) {
        return Buffer.from(value).toString('base64');
    }
    static base64ToPlain(value) {
        return Buffer.from(value, 'base64').toString();
    }
}
exports.BufferHelper = BufferHelper;
//# sourceMappingURL=buffer.helper.js.map