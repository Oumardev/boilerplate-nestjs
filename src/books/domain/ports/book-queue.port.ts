import { Book } from "../entities/book.entitie";

export abstract class BookQueuePort {
    abstract addCreateBookJob(book: Book): Promise<void>;
}