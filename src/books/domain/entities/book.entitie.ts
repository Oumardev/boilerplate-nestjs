import { DateVO } from "../value-objects/date.vo";
import { IsbnVO } from "../value-objects/isbn.vo";

export class Book {
    constructor(
        private readonly title: string,
        private readonly author: string,
        private readonly isbn: IsbnVO,
        private readonly publishedDate: DateVO,
        private readonly isRead: boolean
    ) {}

    static create(
        title: string,
        author: string,
        isbn: string,
        publishedDate?: Date,
        isRead?: boolean
    ): Book {
        const date = publishedDate ?? new Date();
        
        return new Book(title, author, new IsbnVO(isbn), new DateVO(date), isRead ?? false);
    }
}
