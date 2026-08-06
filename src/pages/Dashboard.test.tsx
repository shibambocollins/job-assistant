import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Dashboard } from './Dashboard';
import * as jobsApi from '../api/jobs';
import type { JobApplicationResponse } from '../types';

function makeApplications(count: number): JobApplicationResponse[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    jobTitle: `Job ${i + 1}`,
    company: `Company ${i + 1}`,
    location: 'Remote',
    status: 'SAVED',
    appliedDate: '2026-01-01',
    createdAt: '2026-01-01T00:00:00',
  }));
}

function renderDashboard() {
  return render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.spyOn(jobsApi, 'discoverJobs').mockResolvedValue([]);
  vi.spyOn(jobsApi, 'deleteApplication').mockResolvedValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Dashboard pagination', () => {
  it('does not show pagination controls when there are 10 or fewer applications', async () => {
    vi.spyOn(jobsApi, 'getMyApplications').mockResolvedValue(makeApplications(10));
    renderDashboard();

    await screen.findByText('Job 1');

    expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument();
  });

  it('shows only the first page of results and a page indicator when there are more than 10', async () => {
    vi.spyOn(jobsApi, 'getMyApplications').mockResolvedValue(makeApplications(25));
    renderDashboard();

    await screen.findByText('Job 1');

    expect(screen.getByText('Job 10')).toBeInTheDocument();
    expect(screen.queryByText('Job 11')).not.toBeInTheDocument();
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('advances to the next page and shows the next batch of results', async () => {
    vi.spyOn(jobsApi, 'getMyApplications').mockResolvedValue(makeApplications(25));
    const user = userEvent.setup();
    renderDashboard();

    await screen.findByText('Job 1');
    await user.click(screen.getByLabelText('Next page'));

    expect(screen.getByText('Job 11')).toBeInTheDocument();
    expect(screen.queryByText('Job 1')).not.toBeInTheDocument();
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
  });

  it('disables Prev on the first page and Next on the last page', async () => {
    vi.spyOn(jobsApi, 'getMyApplications').mockResolvedValue(makeApplications(15));
    const user = userEvent.setup();
    renderDashboard();

    await screen.findByText('Job 1');
    expect(screen.getByLabelText('Previous page')).toBeDisabled();

    await user.click(screen.getByLabelText('Next page'));
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('clamps back to the last valid page after deleting the only item on the current page', async () => {
    vi.spyOn(jobsApi, 'getMyApplications').mockResolvedValue(makeApplications(11));
    const user = userEvent.setup();
    renderDashboard();

    await screen.findByText('Job 1');
    await user.click(screen.getByLabelText('Next page'));
    expect(screen.getByText('Job 11')).toBeInTheDocument();

    const row = screen.getByText('Job 11').closest('tr');
    expect(row).not.toBeNull();
    const deleteButton = within(row as HTMLElement).getAllByRole('button')[1];

    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    await user.click(deleteButton);
    confirmSpy.mockRestore();

    await waitFor(() => {
      expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Job 1')).toBeInTheDocument();
  });
});
