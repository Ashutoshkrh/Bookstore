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
exports.AuthorsController = void 0;
const common_1 = require("@nestjs/common");
const authors_service_1 = require("./authors.service");
const author_dto_1 = require("./dto/author.dto");
const stamp_helper_1 = require("../../common/helpers/stamp.helper");
const buffer_helper_1 = require("../../common/helpers/buffer.helper");
let AuthorsController = class AuthorsController {
    constructor(authorsService) {
        this.authorsService = authorsService;
    }
    async create(request, response, body) {
        try {
            const data = {
                ...body,
                ...stamp_helper_1.StampHelper.setCreateStamp(request),
                ...stamp_helper_1.StampHelper.setUpdateStamp(request),
            };
            await this.authorsService.create(data);
            return response.status(200).json({
                code: 200,
                success: true,
                message: 'Success - Author created successfully',
                data: null,
            });
        }
        catch (error) {
            return response.status(500).json({
                code: 500,
                success: false,
                message: error.message,
                data: null,
            });
        }
    }
    async findAll(request, response) {
        try {
            const authors = await this.authorsService.findAll({
                select: ['author_id', 'name'],
                order: {
                    name: 'ASC',
                },
            });
            const data = authors.map((author) => {
                return {
                    author_id: buffer_helper_1.BufferHelper.plainToBase64(author.author_id),
                    name: author.name,
                };
            });
            return response.status(201).json({
                code: 200,
                success: true,
                message: 'Success - Find all authors',
                data,
            });
        }
        catch (error) {
            return response.status(500).json({
                code: 500,
                success: false,
                message: error.message,
                data: null,
            });
        }
    }
    async findOne(request, response, param) {
        try {
            const authorId = buffer_helper_1.BufferHelper.base64ToPlain(param.authorId);
            console.log(authorId);
            const author = await this.authorsService.findOne({
                select: ['author_id', 'name'],
                where: {
                    author_id: authorId,
                },
            });
            author.author_id = buffer_helper_1.BufferHelper.plainToBase64(author.author_id);
            return response.status(200).json({
                code: 200,
                success: true,
                message: 'Success - Find authors detail',
                data: author,
            });
        }
        catch (error) {
            return response.status(500).json({
                code: 500,
                success: false,
                message: error.message,
                data: null,
            });
        }
    }
    async update(request, response, param, body) {
        try {
            console.log(body);
            const authorId = buffer_helper_1.BufferHelper.base64ToPlain(param.authorId);
            const data = {
                name: body.name,
                ...stamp_helper_1.StampHelper.setUpdateStamp(request),
            };
            console.log(data);
            await this.authorsService.update(data, { author_id: authorId });
            return response.status(200).json({
                code: 200,
                success: true,
                message: 'Success - Update authors',
                data: null,
            });
        }
        catch (error) {
            return response.status(500).json({
                code: 500,
                success: false,
                message: error.message,
                data: null,
            });
        }
    }
};
exports.AuthorsController = AuthorsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, author_dto_1.CreateNewAuthorDto]),
    __metadata("design:returntype", Promise)
], AuthorsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':authorId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, author_dto_1.AuthorIdDto]),
    __metadata("design:returntype", Promise)
], AuthorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':authorId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, author_dto_1.AuthorIdDto,
        author_dto_1.UpdateAuthorDto]),
    __metadata("design:returntype", Promise)
], AuthorsController.prototype, "update", null);
exports.AuthorsController = AuthorsController = __decorate([
    (0, common_1.Controller)('authors'),
    __metadata("design:paramtypes", [authors_service_1.AuthorsService])
], AuthorsController);
//# sourceMappingURL=authors.controller.js.map