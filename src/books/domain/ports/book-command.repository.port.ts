import { Book } from "../entities/book.entitie";

export abstract class BookCommandRepositoryPort {
    abstract create(book: Book): Promise<Book>;
    abstract update(book: Partial<Book>): Promise<Book>;
    abstract delete(id: number): Promise<{id: number}>;
}