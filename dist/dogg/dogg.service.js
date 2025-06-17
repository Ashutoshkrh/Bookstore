"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoggService = void 0;
const common_1 = require("@nestjs/common");
(0, common_1.Injectable)();
class DoggService {
    constructor() {
        this.doggList = [];
    }
    createDogg(dogg) {
        this.doggList.push(dogg);
    }
    getDoggList() {
        return this.doggList;
    }
    solve(a, b) {
        let result = "";
        for (let i = 0; i < a; i++) {
            result += b;
        }
        return result;
    }
}
exports.DoggService = DoggService;
//# sourceMappingURL=dogg.service.js.map