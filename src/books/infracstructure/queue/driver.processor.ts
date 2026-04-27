import { CreateBookCommand } from "src/books/application/command/create-book/create-book.command";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { CommandBus } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

@Processor('book-queue')
export class DriverProcessor extends WorkerHost {
    private readonly logger = new Logger(DriverProcessor.name);

    constructor(
        private readonly commandBus: CommandBus
    ) {
        super();
    }
    
    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.log(`[PROCESSOR] Received job id=${job.id} name=${job.name} data=${JSON.stringify(job.data)}`);
        try {
            switch(job.name) {
                case 'create-book': {
                    const isbn = typeof job.data.isbn === 'object' ? job.data.isbn?.value : job.data.isbn;
                    const publishedDate = job.data.publishedDate
                        ? new Date(typeof job.data.publishedDate === 'object' ? job.data.publishedDate?.value : job.data.publishedDate)
                        : undefined;
                    await this.commandBus.execute(
                        new CreateBookCommand(
                            job.data.title,
                            job.data.author,
                            isbn,
                            publishedDate
                        )
                    );
                    this.logger.log(`[PROCESSOR] Job id=${job.id} completed for isbn=${job.data.isbn}`);
                    break;
                }
                default:
                    throw new Error(`Unknown job type: ${job.name}`);
            }
        } catch (error) {
            this.logger.error(`[PROCESSOR] Job id=${job.id} failed: ${error.message}`, error.stack);
            throw error;
        }
    }
    
}