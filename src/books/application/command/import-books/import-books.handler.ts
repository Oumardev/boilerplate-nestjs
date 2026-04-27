import { BookQueuePort } from "src/books/domain/ports/book-queue.port";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ImportBooksCommand } from "./import-books.command";

@CommandHandler(ImportBooksCommand)
export class ImportBooksHandler implements ICommandHandler<ImportBooksCommand> {

    constructor(
        private readonly driverQueue: BookQueuePort
    ) {}
    
    async execute(command: ImportBooksCommand): Promise<any> {

        for (const book of command.books) {
            await this.driverQueue.addCreateBookJob(book);
        }
    }
}