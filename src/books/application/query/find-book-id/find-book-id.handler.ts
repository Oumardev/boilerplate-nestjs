import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { FindBookIdQuery } from "./find-book-id.query";
import { Book, BookQueryRepositoryPort } from "src/books/domain/ports/book-query.repository.port";
import { HttpException, HttpStatus } from "@nestjs/common";


@QueryHandler(FindBookIdQuery)
export class FindBookIdHandler implements IQueryHandler<FindBookIdQuery> {

    constructor(
        private readonly queryRepo: BookQueryRepositoryPort
    ) {}

    async execute(query: FindBookIdQuery): Promise<Book> {
        const book = await this.queryRepo.findById(query.id)
        if(!book){
            throw new HttpException("This Book doesnt exist", HttpStatus.NOT_FOUND)
        }

        return book;
    }
}