import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDocumentTitle } from './useDocumentTitle';

describe('useDocumentTitle', () => {
  it('sets document.title to the given value', () => {
    renderHook(() => useDocumentTitle('Dashboard | Job Assistant AI'));
    expect(document.title).toBe('Dashboard | Job Assistant AI');
  });

  it('updates document.title when the title prop changes', () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'First | Job Assistant AI' },
    });
    expect(document.title).toBe('First | Job Assistant AI');

    rerender({ title: 'Second | Job Assistant AI' });
    expect(document.title).toBe('Second | Job Assistant AI');
  });

  it('restores the previous title on unmount', () => {
    document.title = 'Original Title';
    const { unmount } = renderHook(() => useDocumentTitle('Temporary | Job Assistant AI'));
    expect(document.title).toBe('Temporary | Job Assistant AI');

    unmount();
    expect(document.title).toBe('Original Title');
  });
});
