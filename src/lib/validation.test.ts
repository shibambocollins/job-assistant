import { describe, expect, it } from 'vitest';
import { getPasswordError, isValidEmail } from './validation';

describe('isValidEmail', () => {
  it('accepts a normal email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('accepts an email with surrounding whitespace', () => {
    expect(isValidEmail('  user@example.com  ')).toBe(true);
  });

  it('rejects a string with no @', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
  });

  it('rejects a string with no domain', () => {
    expect(isValidEmail('user@')).toBe(false);
  });

  it('rejects a string with a one-character TLD', () => {
    expect(isValidEmail('user@example.c')).toBe(false);
  });

  it('rejects an email containing spaces', () => {
    expect(isValidEmail('user name@example.com')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

describe('getPasswordError', () => {
  it('accepts a strong, unique password', () => {
    expect(getPasswordError('Xq7$mPz2vLwT')).toBeUndefined();
  });

  it('rejects passwords under 8 characters', () => {
    expect(getPasswordError('Ab1$xyz')).toBe('Must be at least 8 characters long.');
  });

  it('rejects a common weak password regardless of case', () => {
    expect(getPasswordError('Password123')).toBe(
      'That password is too common. Choose something harder to guess.'
    );
    expect(getPasswordError('password123')).toBe(
      'That password is too common. Choose something harder to guess.'
    );
  });

  it('rejects an all-numeric password', () => {
    expect(getPasswordError('19283746')).toBe('Use more than just numbers.');
  });

  it('rejects an ascending sequence run', () => {
    expect(getPasswordError('abcd5678xyz')).toBe(
      'Avoid simple sequences or repeated characters, like "12345678" or "aaaaaaaa".'
    );
  });

  it('rejects a repeated-character run', () => {
    expect(getPasswordError('aaaaXyz9')).toBe(
      'Avoid simple sequences or repeated characters, like "12345678" or "aaaaaaaa".'
    );
  });

  it('rejects a descending sequence run', () => {
    expect(getPasswordError('Xyz9876w')).toBe(
      'Avoid simple sequences or repeated characters, like "12345678" or "aaaaaaaa".'
    );
  });
});
