import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BullModule } from '@nestjs/bullmq';

// Domain ports
import { BookCommandRepositoryPort } from './domain/ports/book-command.repository.port';
import { BookQueryRepositoryPort } from './domain/ports/book-query.repository.port';
import { BookQueuePort } from './domain/ports/book-queue.port';

// Handlers
import { CreateBookHandler } from './application/command/create-book/create-book.handler';
import { DeleteBookHandler } from './application/command/delete-book/delete-book.handler';
import { UpdateBookHandler } from './application/command/update-book/update-book.handler';
import { ImportBooksHandler } from './application/command/import-books/import-books.handler';
import { FindBookISBNHandler } from './application/query/find-book-isbn/find-book-isbn.handler';
import { FindBookIdHandler } from './application/query/find-book-id/find-book-id.handler';
import { FindBooksHandler } from './application/query/find-books/find-books.handler';

// Infrastructure
import { PrismaBookCommandRepository } from './infracstructure/persistence/prisma-book-command.repository';
import { PrismaBookQueryRepository } from './infracstructure/persistence/prisma-book-query.repository';
import { BullDriverQueueAdapter } from './infracstructure/queue/book.queue';
import { DriverProcessor } from './infracstructure/queue/driver.processor';

// Presentation
import { BookController } from './presentation/book.controller';

const CommandHandlers = [
  CreateBookHandler,
  DeleteBookHandler,
  UpdateBookHandler,
  ImportBooksHandler,
];

const QueryHandlers = [
  FindBookISBNHandler,
  FindBookIdHandler,
  FindBooksHandler,
];

const Repositories = [
  {
    provide: BookCommandRepositoryPort,
    useClass: PrismaBookCommandRepository,
  },
  {
    provide: BookQueryRepositoryPort,
    useClass: PrismaBookQueryRepository,
  },
  {
    provide: BookQueuePort,
    useClass: BullDriverQueueAdapter,
  },
];

@Module({
  imports: [
    CqrsModule,
    BullModule.registerQueue({ name: 'book-queue' }),
  ],
  controllers: [BookController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...Repositories,
    DriverProcessor,
  ],
})
export class BooksModule {}