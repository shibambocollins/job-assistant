import { useEffect, useState } from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * Circular progress ring. Uses an explicit viewBox matching its pixel size and
 * insets the radius by half the stroke width so the stroke never clips against
 * the SVG's edge — the previous inline circles omitted the viewBox entirely,
 * which let the stroke get cut off on some sides depending on container size.
 */
export function ScoreRing({ score, size = 96, strokeWidth = 6, className = '' }: ScoreRingProps) {
  const clamped = Math.min(Math.max(score, 0), 100);
  const center = size / 2;
  const radius = center - strokeWidth / 2 - 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference * (1 - clamped / 100);

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    setOffset(circumference);
    const id = requestAnimationFrame(() => setOffset(targetOffset));
    return () => cancelAnimationFrame(id);
  }, [targetOffset, circumference]);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className={`transform -rotate-90 ${className}`}>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#E8E5E1" strokeWidth={strokeWidth} />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#6F8A68"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.4, 0, 0.2, 1)' }}
      />
    </svg>
  );
}
