import { Book } from "src/books/domain/entities/book.entitie";

export class ImportBooksCommand {
    constructor(
        public readonly books: Book[]
    ) { }
}