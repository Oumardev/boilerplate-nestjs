export class CreateBookCommand {
    constructor(
        public readonly title: string,
        public readonly author: string,
        public readonly isbn: string,
        public readonly publishedDate?: Date,
        public readonly isRead?: boolean
    ) {}
}
