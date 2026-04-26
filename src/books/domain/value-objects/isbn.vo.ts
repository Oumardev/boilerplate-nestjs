export class IsbnVO {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValidIsbn(value)) {
      throw new Error('Invalid ISBN');
    }
    this.value = value;
  }

  private isValidIsbn(value: string): boolean {
    return value.length === 13 || value.length === 10;
  }

  getValue(): string {
    return this.value;
  }
}