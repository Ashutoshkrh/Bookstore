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
exports.DoggController = void 0;
const common_1 = require("@nestjs/common");
const dogg_service_1 = require("./dogg.service");
const createdogg_dto_1 = require("./dto/createdogg.dto");
let DoggController = class DoggController {
    constructor(doggService) {
        this.doggService = doggService;
    }
    getAllDoggs() {
        return this.doggService.getDoggList();
    }
    createDogg(dog) {
        this.doggService.createDogg(dog.name);
        return { message: "Dogg created successfully" };
    }
    solveDogg(dog) {
        const result = this.doggService.solve(dog.dognum, dog.doggnaam);
        return { doggnaam: result };
    }
};
exports.DoggController = DoggController;
__decorate([
    (0, common_1.Get)("listall"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoggController.prototype, "getAllDoggs", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createdogg_dto_1.CreateDoggDTO]),
    __metadata("design:returntype", void 0)
], DoggController.prototype, "createDogg", null);
__decorate([
    (0, common_1.Post)("solve"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createdogg_dto_1.SolveDoggDTO]),
    __metadata("design:returntype", createdogg_dto_1.DoggresponseDTO)
], DoggController.prototype, "solveDogg", null);
exports.DoggController = DoggController = __decorate([
    (0, common_1.Controller)('dogg'),
    __metadata("design:paramtypes", [dogg_service_1.DoggService])
], DoggController);
//# sourceMappingURL=dogg.controller.js.map