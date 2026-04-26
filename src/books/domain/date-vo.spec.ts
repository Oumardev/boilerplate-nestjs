import { DateVO } from "./value-objects/date.vo";

describe('DateVO', () => {
  it('should create a valid date', () => {
    const date = new DateVO(new Date('2025-01-01'));
    expect(date.getValue()).toEqual(new Date('2025-01-01'));
  });

  it('should date not be in the future', () => {
    expect(() => new DateVO(new Date('2029-01-01'))).toThrow();
  });

  it('should throw on invalid date', () => {
    expect(() => new DateVO(new Date('bad'))).toThrow();
  });
});