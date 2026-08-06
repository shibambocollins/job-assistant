import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { STATUS_OPTIONS, StatusBadge, statusLabel } from './StatusBadge';
import type { ApplicationStatus } from '../../types';

describe('StatusBadge', () => {
  it('renders the human-readable label for every status', () => {
    for (const status of STATUS_OPTIONS) {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(screen.getByText(statusLabel(status))).toBeInTheDocument();
      unmount();
    }
  });

  it('renders "Interview" for the INTERVIEW status', () => {
    render(<StatusBadge status={'INTERVIEW' as ApplicationStatus} />);
    expect(screen.getByText('Interview')).toBeInTheDocument();
  });
});
