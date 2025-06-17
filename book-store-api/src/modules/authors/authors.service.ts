import { Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateAuthorInterface,
  UpdateAuthorInterface,
} from 'src/common/interfaces/author.interface';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  create(data: CreateAuthorInterface) {
    return this.authorRepository.save(data);
  }

  findAll(params: any) {
    return this.authorRepository.find(params);
  }

  findOne(params: any) {
    return this.authorRepository.findOne(params);
  }

  update(data: UpdateAuthorInterface, params: any) {
    return this.authorRepository.update(params, data);
  }
}
