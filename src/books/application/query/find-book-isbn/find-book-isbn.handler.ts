import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { FindBookISBNQuery } from "./find-book-isbn.query";

import { Book, BookQueryRepositoryPort } from "src/books/domain/ports/book-query.repository.port";
import { HttpException, HttpStatus } from "@nestjs/common";

@QueryHandler(FindBookISBNQuery)
export class FindBookISBNHandler implements IQueryHandler<FindBookISBNQuery> {

    constructor(
        private readonly queryRepo: BookQueryRepositoryPort
    ) {}

    async execute(query: FindBookISBNQuery): Promise<Book> {
        
        const isExistBook = await this.queryRepo.findByISBN(query.isbn)
        if(!isExistBook){
            throw new HttpException("The book with this ISBN doesnt exist", HttpStatus.NOT_FOUND)
        }

        return isExistBook;
    }
}