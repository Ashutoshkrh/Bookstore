import { AuthorsService } from './authors.service';
import { CreateNewAuthorDto, AuthorIdDto, UpdateAuthorDto } from './dto/author.dto';
import { Request, Response } from 'express';
export declare class AuthorsController {
    private readonly authorsService;
    constructor(authorsService: AuthorsService);
    create(request: Request, response: Response, body: CreateNewAuthorDto): Promise<Response<any, Record<string, any>>>;
    findAll(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    findOne(request: Request, response: Response, param: AuthorIdDto): Promise<Response<any, Record<string, any>>>;
    update(request: Request, response: Response, param: AuthorIdDto, body: UpdateAuthorDto): Promise<Response<any, Record<string, any>>>;
}
