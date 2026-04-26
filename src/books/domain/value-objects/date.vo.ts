export class DateVO {
  private readonly value: Date;

  constructor(value: Date) {
    if (this.isFutureDate(value)) {
      throw new Error('Date cannot be in the future');
    }
    this.value = value;
  }

  private isFutureDate(value: Date): boolean {
    return value > new Date();
  }

  getValue(): Date {
    return this.value;
  }
}