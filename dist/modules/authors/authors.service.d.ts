import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorInterface, UpdateAuthorInterface } from 'src/common/interfaces/author.interface';
export declare class AuthorsService {
    private readonly authorRepository;
    constructor(authorRepository: Repository<Author>);
    create(data: CreateAuthorInterface): Promise<CreateAuthorInterface & Author>;
    findAll(params: any): Promise<Author[]>;
    findOne(params: any): Promise<Author>;
    update(data: UpdateAuthorInterface, params: any): Promise<import("typeorm").UpdateResult>;
}
