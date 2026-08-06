import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Reveal } from './Reveal';

type ObserverCallback = (entries: Pick<IntersectionObserverEntry, 'isIntersecting'>[]) => void;

let lastCallback: ObserverCallback | null = null;
let disconnectSpy: ReturnType<typeof vi.fn>;

class MockIntersectionObserver {
  constructor(callback: ObserverCallback) {
    lastCallback = callback;
  }
  observe = vi.fn();
  disconnect = disconnectSpy;
  unobserve = vi.fn();
}

beforeEach(() => {
  disconnectSpy = vi.fn();
  lastCallback = null;
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Reveal', () => {
  it('starts hidden before the element intersects the viewport', () => {
    render(<Reveal>Content</Reveal>);
    expect(screen.getByText('Content')).toHaveClass('opacity-0');
  });

  it('becomes visible once IntersectionObserver reports an intersection', () => {
    render(<Reveal>Content</Reveal>);

    act(() => lastCallback?.([{ isIntersecting: true }]));

    expect(screen.getByText('Content')).toHaveClass('opacity-100');
  });

  it('disconnects the observer after the first intersection', () => {
    render(<Reveal>Content</Reveal>);

    act(() => lastCallback?.([{ isIntersecting: true }]));

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });

  it('stays hidden when the callback reports no intersection', () => {
    render(<Reveal>Content</Reveal>);

    act(() => lastCallback?.([{ isIntersecting: false }]));

    expect(screen.getByText('Content')).toHaveClass('opacity-0');
  });
});
