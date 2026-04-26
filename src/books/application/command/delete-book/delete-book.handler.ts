import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteBookCommand } from "./delete-book.command";
import { BookCommandRepositoryPort } from "src/books/domain/ports/book-command.repository.port";
import { BookQueryRepositoryPort } from "src/books/domain/ports/book-query.repository.port";

import { HttpException, HttpStatus } from "@nestjs/common";

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {

    constructor(
        private readonly commandRepo: BookCommandRepositoryPort,
        private readonly queryRepo: BookQueryRepositoryPort
    ) {}

    async execute(command: DeleteBookCommand): Promise<{ id: number }> {
        
        const isExistBook = await this.queryRepo.findById(command.id)
        if(!isExistBook){
            throw new HttpException("You cannot delete book that not exist", HttpStatus.NOT_FOUND)
        }

        const deleteBook = await this.commandRepo.delete(isExistBook.id);

        return deleteBook
    }
}