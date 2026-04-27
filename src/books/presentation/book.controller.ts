import {
  Body, Controller, Delete, Get,
  HttpCode, Param, Post, Query,
  Put
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

//Command
import { ImportBooksCommand } from '../application/command/import-books/import-books.command';
import { CreateBookCommand } from '../application/command/create-book/create-book.command';
import { DeleteBookCommand } from '../application/command/delete-book/delete-book.command';
import { UpdateBookCommand } from '../application/command/update-book/update-book.command';

//Query
import { FindBookISBNQuery } from '../application/query/find-book-isbn/find-book-isbn.query';
import { FindBookIdQuery } from '../application/query/find-book-id/find-book-id.query';
import { FindBooksQuery } from '../application/query/find-books/find-books.query';

//DTO
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from '../domain/entities/book.entitie';


@Controller('books')
export class BookController {
    
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Post()
    @HttpCode(201)
    async create(@Body() createBookDto: CreateBookDto) {
        const command = new CreateBookCommand(
            createBookDto.title,
            createBookDto.author,
            createBookDto.isbn,
            createBookDto.publishedDate,
            createBookDto.isRead
        );
        return this.commandBus.execute(command);
    }

    @Post('import')
    @HttpCode(201)
    async import(@Body() books: CreateBookDto[]) {
        const domainBooks = books.map(dto =>
            Book.create(dto.title, dto.author, dto.isbn, dto.publishedDate, dto.isRead)
        );
        const command = new ImportBooksCommand(domainBooks);
        
        return this.commandBus.execute(command);
    }

    @Get()
    @HttpCode(200)
    async findAll(@Query('page') limit: number = 10, @Query('limit') offset: number = 0) {
        const query = new FindBooksQuery(limit, offset);

        return this.queryBus.execute(query);
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id') id: number) {
        const query = new FindBookIdQuery(id);
        return this.queryBus.execute(query);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: number) {
        const command = new DeleteBookCommand(id);
        return this.commandBus.execute(command);
    }

    @Put(':id')
    @HttpCode(200)
    async update(@Param('id') id: number, @Body() updateBookDto: CreateBookDto) {
        const command = new UpdateBookCommand(
            id,
            updateBookDto.title,
            updateBookDto.author,
            updateBookDto.isbn,
            updateBookDto.publishedDate,
            updateBookDto.isRead
        );
        return this.commandBus.execute(command);
    }

    @Get('isbn/:isbn')
    @HttpCode(200)
    async findByIsbn(@Param('isbn') isbn: string) {
        const query = new FindBookISBNQuery(isbn);
        return this.queryBus.execute(query);
    }
}
