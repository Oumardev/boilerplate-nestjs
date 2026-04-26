import { IsbnVO } from "./value-objects/isbn.vo";

describe('IsbnVO', () => {
  it('should create a valid ISBN', () => {
    const isbn = new IsbnVO('1234567890');
    expect(isbn.getValue()).toBe('1234567890');
  });

  it('should throw on invalid ISBN', () => {
    expect(() => new IsbnVO('bad')).toThrow();
  });
});