import { describe, it, expect } from 'vitest';
import { isObjectEmpty } from '@/utils/common';

describe('isObjectEmpty', () => {
  it('returns true for an empty object', () => {
    const result = isObjectEmpty({});
    expect(result).toBe(true);
  });

  it('returns false for an object with properties', () => {
    const result = isObjectEmpty({ key: 'value' });
    expect(result).toBe(false);
  });

  it('returns false for an array', () => {
    const result = isObjectEmpty([]);
    expect(result).toBe(false);
  });

  it('returns false for a non-object', () => {
    const result = isObjectEmpty('string');
    expect(result).toBe(false);
  });

  it('returns false for a function', () => {
    const result = isObjectEmpty(function () {});
    expect(result).toBe(false);
  });

  it('returns false for a null value', () => {
    const result = isObjectEmpty(null);
    expect(result).toBe(false);
  });
});
