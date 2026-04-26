import { Injectable } from '@nestjs/common';
import { BookParamsPagination, Book, BookQueryRepositoryPort } from "src/books/domain/ports/book-query.repository.port";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaBookQueryRepository implements BookQueryRepositoryPort {

    constructor(
        private readonly prisma: PrismaService
    ) {}
    
    findAll(params: BookParamsPagination): Promise<Book[]> {
        return this.prisma.book.findMany({
            take: params.limit,
            skip: params.offset
        });
    }

    findById(id: number): Promise<Book> {
        return this.prisma.book.findUnique({
            where: {
                id: Number(id)
            }
        });
    }
    findByISBN(isbn: string): Promise<Book> {
        return this.prisma.book.findUnique({
            where: {
                isbn
            }
        });
    }
    
}