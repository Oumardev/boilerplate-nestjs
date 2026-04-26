import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { FindBooksQuery } from "./find-books.query";

import { Book, BookQueryRepositoryPort } from "src/books/domain/ports/book-query.repository.port";


@QueryHandler(FindBooksQuery)
export class FindBooksHandler implements IQueryHandler<FindBooksQuery> {

    constructor(
        private readonly queryRepo: BookQueryRepositoryPort
    ) {}

    async execute(query: FindBooksQuery): Promise<Book[]> {
        
        const books = await this.queryRepo.findAll(query)
        return books;
    }
}