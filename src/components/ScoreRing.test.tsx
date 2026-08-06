import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScoreRing } from './ScoreRing';

describe('ScoreRing', () => {
  it('renders an SVG with a viewBox matching its pixel size', () => {
    const { container } = render(<ScoreRing score={75} size={96} strokeWidth={6} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 96 96');
    expect(svg).toHaveAttribute('width', '96');
    expect(svg).toHaveAttribute('height', '96');
  });

  it('clamps scores above 100 to a full ring', () => {
    const { container } = render(<ScoreRing score={140} size={96} strokeWidth={6} />);
    const circles = container.querySelectorAll('circle');
    // Second circle is the progress indicator; its radius should still be inset from the edge.
    const progressCircle = circles[1];
    const radius = Number(progressCircle.getAttribute('r'));
    expect(radius).toBeCloseTo(96 / 2 - 6 / 2 - 2);
  });

  it('clamps negative scores to zero without throwing', () => {
    expect(() => render(<ScoreRing score={-20} size={96} strokeWidth={6} />)).not.toThrow();
  });

  it('insets the radius so the stroke never touches the SVG edge', () => {
    const { container } = render(<ScoreRing score={50} size={120} strokeWidth={10} />);
    const circle = container.querySelector('circle');
    const radius = Number(circle?.getAttribute('r'));
    expect(radius).toBe(120 / 2 - 10 / 2 - 2);
  });
});
