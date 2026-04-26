import { Injectable } from '@nestjs/common';
import { Book } from 'src/books/domain/entities/book.entitie';
import { BookCommandRepositoryPort } from 'src/books/domain/ports/book-command.repository.port';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class PrismaBookCommandRepository implements BookCommandRepositoryPort {

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(book: Book): Promise<Book> {
        const created = await this.prisma.book.create({
            data: {
                title: book['title'],
                author: book['author'],
                isbn: book['isbn'].getValue(),
                publishedDate: book['publishedDate'].getValue(),
                isRead: book['isRead']
            }
        });
        
        return Book.create(
            created.title,
            created.author,
            created.isbn,
            created.publishedDate,
            created.isRead
        );
    }

    async update(book: Partial<Book> & {id: number}): Promise<Book> {
        const updated = await this.prisma.book.update({
            where: {
                id: book.id
            },
            data: {
                title: book['title'],
                author: book['author'],
                isbn: book['isbn'].getValue(),
                publishedDate: book['publishedDate'].getValue(),
                isRead: book['isRead']
            }
        });
        
        return Book.create(
            updated.title,
            updated.author,
            updated.isbn,
            updated.publishedDate,
            updated.isRead
        );
    }

    async delete(id: number): Promise<{id: number}> {
        const deleted = await this.prisma.book.delete({
            where: {
                id
            }
        });
        
        return {id: deleted.id};
    }

}
