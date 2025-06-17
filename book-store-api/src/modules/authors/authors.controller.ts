import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Res,
  Put,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import {
  CreateNewAuthorDto,
  AuthorIdDto,
  UpdateAuthorDto,
} from './dto/author.dto';
import { StampHelper } from 'src/common/helpers/stamp.helper';
import { Request, Response } from 'express';
import {
  CreateAuthorInterface,
  GetAuthorInterface,
  UpdateAuthorInterface,
} from 'src/common/interfaces/author.interface';
import { BufferHelper } from 'src/common/helpers/buffer.helper';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async create(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: CreateNewAuthorDto,
  ) {
    try {
      const data: CreateAuthorInterface = {
        ...body,
        ...StampHelper.setCreateStamp(request),
        ...StampHelper.setUpdateStamp(request),
      };

      await this.authorsService.create(data);

      return response.status(200).json({
        code: 200,
        success: true,
        message: 'Success - Author created successfully',
        data: null,
      });
    } catch (error) {
      return response.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  }

  @Get()
  async findAll(@Req() request: Request, @Res() response: Response) {
    try {
      const authors = await this.authorsService.findAll({
        select: ['author_id', 'name'],
        order: {
          name: 'ASC',
        },
      });

      const data = authors.map((author) => {
        return {
          author_id: BufferHelper.plainToBase64(author.author_id),
          name: author.name,
        };
      });

      return response.status(201).json({
        code: 200,
        success: true,
        message: 'Success - Find all authors',
        data,
      });
    } catch (error) {
      return response.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  }

  @Get(':authorId')
  async findOne(
    @Req() request: Request,
    @Res() response: Response,
    @Param() param: AuthorIdDto,
  ) {
    try {
      const authorId = BufferHelper.base64ToPlain(param.authorId);
      console.log(authorId);

      const author: GetAuthorInterface = await this.authorsService.findOne({
        select: ['author_id', 'name'],
        where: {
          author_id: authorId,
        },
      });

      author.author_id = BufferHelper.plainToBase64(author.author_id);

      return response.status(200).json({
        code: 200,
        success: true,
        message: 'Success - Find authors detail',
        data: author,
      });
    } catch (error) {
      return response.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  }

  @Put(':authorId')
  async update(
    @Req() request: Request,
    @Res() response: Response,
    @Param() param: AuthorIdDto,
    @Body() body: UpdateAuthorDto,
  ) {
    try {
      console.log(body);

      const authorId = BufferHelper.base64ToPlain(param.authorId);
      const data: UpdateAuthorInterface = {
        name: body.name,
        ...StampHelper.setUpdateStamp(request),
      };

      console.log(data);

      await this.authorsService.update(data, { author_id: authorId });

      return response.status(200).json({
        code: 200,
        success: true,
        message: 'Success - Update authors',
        data: null,
      });
    } catch (error) {
      return response.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
}
