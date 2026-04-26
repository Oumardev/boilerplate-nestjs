export abstract class BookQueryRepositoryPort {
    abstract findAll(params: BookParamsPagination): Promise<Book[]>;
    abstract findById(id: number): Promise<Book>;
    abstract findByISBN(isbn: string): Promise<Book>;
}

export interface Book {
    id: number,
    title: string,
    author: string,
    isbn: string,
    publishedDate: Date,
    isRead: boolean
}

export interface BookParamsPagination {
    limit: number,
    offset: number
}