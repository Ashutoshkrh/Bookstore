import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book();
    book.book_id = uuidv4();
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

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({
      where: { is_deleted: false },
      order: { created_date: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { book_id: id, is_deleted: false }
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (updateBookDto.title) book.title = updateBookDto.title;
    if (updateBookDto.description !== undefined) book.description = updateBookDto.description;
    if (updateBookDto.author_id) book.author_id = updateBookDto.author_id;
    if (updateBookDto.published_year) book.published_year = updateBookDto.published_year;

    book.modified_date = new Date();
    book.modified_from = 'web';
    book.modified_by = 'user';
    book.modified_name = 'User';

    return await this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);
    book.is_deleted = true;
    book.modified_date = new Date();
    book.modified_from = 'web';
    book.modified_by = 'user';
    book.modified_name = 'User';

    await this.bookRepository.save(book);
  }
}
