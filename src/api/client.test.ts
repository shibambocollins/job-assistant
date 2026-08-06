import { describe, expect, it } from 'vitest';
import { getErrorMessage, isTokenExpired } from './client';

function fakeAxiosError(overrides: { status?: number; data?: unknown; noResponse?: boolean }) {
  return {
    isAxiosError: true,
    response: overrides.noResponse ? undefined : { status: overrides.status ?? 400, data: overrides.data },
  };
}

function fakeJwt(payload: Record<string, unknown>): string {
  const base64 = (obj: object) => btoa(JSON.stringify(obj)).replace(/=+$/, '');
  return `${base64({ alg: 'HS512' })}.${base64(payload)}.signature`;
}

describe('getErrorMessage', () => {
  it('uses the server-provided message when present', () => {
    const err = fakeAxiosError({ status: 401, data: { message: 'Invalid password' } });
    expect(getErrorMessage(err)).toBe('Invalid password');
  });

  it('falls back to a network-specific message when there is no response', () => {
    const err = fakeAxiosError({ noResponse: true });
    expect(getErrorMessage(err)).toBe("Can't reach the server. Check that the backend is running and try again.");
  });

  it('falls back to a generic message for a response with no message field', () => {
    const err = fakeAxiosError({ status: 500, data: {} });
    expect(getErrorMessage(err)).toBe('Something went wrong. Please try again.');
  });

  it('falls back to a generic message for a non-axios error', () => {
    expect(getErrorMessage(new Error('boom'))).toBe('Something went wrong. Please try again.');
  });

  it('falls back to a generic message for a non-error value', () => {
    expect(getErrorMessage('just a string')).toBe('Something went wrong. Please try again.');
  });
});

describe('isTokenExpired', () => {
  it('returns false for a token with a future expiry', () => {
    const token = fakeJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
    expect(isTokenExpired(token)).toBe(false);
  });

  it('returns true for a token with a past expiry', () => {
    const token = fakeJwt({ exp: Math.floor(Date.now() / 1000) - 3600 });
    expect(isTokenExpired(token)).toBe(true);
  });

  it('returns false for a token with no exp claim', () => {
    const token = fakeJwt({ sub: 'user@example.com' });
    expect(isTokenExpired(token)).toBe(false);
  });

  it('returns true for a malformed token', () => {
    expect(isTokenExpired('not-a-real-token')).toBe(true);
  });
});
