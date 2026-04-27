import { BookQueuePort } from "src/books/domain/ports/book-queue.port";
import { Book } from "src/books/domain/entities/book.entitie";
import { Injectable, Logger } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";

@Injectable()
export class BullDriverQueueAdapter implements BookQueuePort {
    private readonly logger = new Logger(BullDriverQueueAdapter.name);
    
    constructor(
        @InjectQueue('book-queue') private readonly bookQueue: Queue
    ) {}

    async addCreateBookJob(book: Book): Promise<void> {
        const isbn = book['isbn'].getValue();
        const payload = {
            title: book['title'],
            author: book['author'],
            isbn,
            publishedDate: book['publishedDate'].getValue()
        };
        this.logger.log(`[QUEUE] Adding job for isbn=${isbn} payload=${JSON.stringify(payload)}`);
        await this.bookQueue.add('create-book', payload, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 3000
            },
            jobId: `isbn-${isbn}`
        });
    }
}