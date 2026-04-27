import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateBookCommand } from "./update-book.command";

import { Book } from "src/books/domain/entities/book.entitie";
import { BookCommandRepositoryPort } from "src/books/domain/ports/book-command.repository.port";
import { BookQueryRepositoryPort } from "src/books/domain/ports/book-query.repository.port";

import { HttpException, HttpStatus } from "@nestjs/common";

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {

    constructor(
        private readonly commandRepo: BookCommandRepositoryPort,
        private readonly queryRepo: BookQueryRepositoryPort
    ) {}

    async execute(command: UpdateBookCommand): Promise<Book> {
        const isExistBook = await this.queryRepo.findById(command.id);
        if(!isExistBook) {
            throw new HttpException("The book you try to update doesnt existing", HttpStatus.NOT_FOUND)
        }

        const updateBook = Book.create(
            command.title ?? isExistBook.title,
            command.author ?? isExistBook.author,
            command.isbn ?? isExistBook.isbn,
            command.publishedDate ?? isExistBook.publishedDate
        )

        const book = await this.commandRepo.update(updateBook)

        return book;
    }
}