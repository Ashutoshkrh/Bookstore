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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const typeorm_1 = require("typeorm");
let Book = class Book {
};
exports.Book = Book;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Book.prototype, "book_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500,
        nullable: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "author_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Book.prototype, "published_year", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Book.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Book.prototype, "created_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "created_from", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "created_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Book.prototype, "modified_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "modified_from", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "modified_by", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "modified_name", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)({ name: 'book' })
], Book);
//# sourceMappingURL=book.entity.js.map