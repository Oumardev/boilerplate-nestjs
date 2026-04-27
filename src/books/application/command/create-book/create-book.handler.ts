import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BookCommandRepositoryPort } from "src/books/domain/ports/book-command.repository.port";
import { BookQueryRepositoryPort } from "src/books/domain/ports/book-query.repository.port";
import { Book } from "src/books/domain/entities/book.entitie";
import { CreateBookCommand } from "./create-book.command";
import { HttpException, HttpStatus } from "@nestjs/common";

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {

    constructor(
        private readonly commandRepo: BookCommandRepositoryPort,
        private readonly queryRepo: BookQueryRepositoryPort
    ) { }

    async execute(command: CreateBookCommand): Promise<Book> {
        const isExistBook = await this.queryRepo.findByISBN(command.isbn);
        
        if(isExistBook) {
            throw new HttpException('Book already exists', HttpStatus.BAD_REQUEST);
        }

        const book = Book.create(
            command.title,
            command.author,
            command.isbn,
            command.publishedDate
        );

        return await this.commandRepo.create(book);
    }

}