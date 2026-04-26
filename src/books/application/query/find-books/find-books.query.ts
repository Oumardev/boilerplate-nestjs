
export class FindBooksQuery {
    constructor(
        public readonly limit: number,
        public readonly offset: number,
    ) {}
}