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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const book_entity_1 = require("./entities/book.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const uuid_1 = require("uuid");
let BooksService = class BooksService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async create(createBookDto) {
        const book = new book_entity_1.Book();
        book.book_id = (0, uuid_1.v4)();
        book.title = createBookDto.title;
        book.description = createBookDto.description || '';
        book.author_id = createBookDto.author_id;
        book.published_year = createBookDto.published_year;
        book.is_deleted = false;
        book.created_date = new Date();
        book.created_from = 'web';
        book.created_by = 'user';
        book.created_name = 'User';
        book.modified_date = new Date();
        book.modified_from = 'web';
        book.modified_by = 'user';
        book.modified_name = 'User';
        return await this.bookRepository.save(book);
    }
    async findAll() {
        return await this.bookRepository.find({
            where: { is_deleted: false },
            order: { created_date: 'DESC' }
        });
    }
    async findOne(id) {
        const book = await this.bookRepository.findOne({
            where: { book_id: id, is_deleted: false }
        });
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }
    async update(id, updateBookDto) {
        const book = await this.findOne(id);
        if (updateBookDto.title)
            book.title = updateBookDto.title;
        if (updateBookDto.description !== undefined)
            book.description = updateBookDto.description;
        if (updateBookDto.author_id)
            book.author_id = updateBookDto.author_id;
        if (updateBookDto.published_year)
            book.published_year = updateBookDto.published_year;
        book.modified_date = new Date();
        book.modified_from = 'web';
        book.modified_by = 'user';
        book.modified_name = 'User';
        return await this.bookRepository.save(book);
    }
    async remove(id) {
        const book = await this.findOne(id);
        book.is_deleted = true;
        book.modified_date = new Date();
        book.modified_from = 'web';
        book.modified_by = 'user';
        book.modified_name = 'User';
        await this.bookRepository.save(book);
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BooksService);
//# sourceMappingURL=books.service.js.map