import type { ApplicationStatus } from '../../types';

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  SAVED: 'Saved',
  APPLIED: 'Applied',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
};

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  SAVED: 'bg-[var(--c-status-saved-bg)] text-[var(--c-status-saved-txt)]',
  APPLIED: 'bg-[var(--c-status-applied-bg)] text-[var(--c-status-applied-txt)]',
  INTERVIEW: 'bg-[var(--c-status-interview-bg)] text-[var(--c-status-interview-txt)]',
  OFFER: 'bg-[var(--c-status-offer-bg)] text-[var(--c-status-offer-txt)]',
  REJECTED: 'bg-[var(--c-status-rejected-bg)] text-[var(--c-status-rejected-txt)]',
};

export const STATUS_OPTIONS: ApplicationStatus[] = ['SAVED', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'];

export function statusLabel(status: ApplicationStatus): string {
  return STATUS_LABELS[status];
}

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
