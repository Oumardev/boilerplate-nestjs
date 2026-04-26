
export class UpdateBookCommand {
    constructor(
        public readonly id: number,
        public readonly title?: string,
        public readonly author?: string,
        public readonly isbn?: string,
        public readonly publishedDate?: Date,
        public readonly isRead?: boolean
    ) { }
}