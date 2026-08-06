import { useEffect, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input, Textarea } from './ui/Input';
import { Alert } from './ui/Alert';
import { addJob, updateJobDetails, type JobPayload } from '../api/jobs';
import { getErrorMessage } from '../api/client';
import type { JobApplicationResponse } from '../types';

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (job: JobApplicationResponse) => void;
  editingJob?: JobApplicationResponse | null;
}

const emptyForm: JobPayload = { title: '', company: '', location: '', description: '', postingUrl: '' };

export function AddJobModal({ isOpen, onClose, onSaved, editingJob }: AddJobModalProps) {
  const [form, setForm] = useState<JobPayload>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setForm(
        editingJob
          ? {
              title: editingJob.jobTitle,
              company: editingJob.company,
              location: editingJob.location,
              description: '',
              postingUrl: editingJob.postingUrl ?? '',
            }
          : emptyForm
      );
      setError(null);
    }
  }, [isOpen, editingJob]);

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const saved = editingJob ? await updateJobDetails(editingJob.id, form) : await addJob(form);
      onSaved(saved);
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#F8F7F4]/80 backdrop-blur-sm">
      <div className="bg-white border border-[#E8E5E1] shadow-lg rounded-lg w-full max-w-lg p-6 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-heading">{editingJob ? 'Edit Job' : 'Add Job Manually'}</h2>
          <button onClick={onClose} className="text-[#6B6B6B] hover:text-[#1F1F1F]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="overflow-y-auto pr-2 flex-1">
            {error && <Alert className="mb-4">{error}</Alert>}
            <Input
              label="Job Title"
              placeholder="e.g. Software Engineer"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <Input
              label="Company Name"
              placeholder="e.g. Acme Corp"
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <Input
              label="Location (Optional)"
              placeholder="e.g. Remote, or New York"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <Input
              label="Posting URL (Optional)"
              type="url"
              placeholder="https://company.com/careers/job-id"
              value={form.postingUrl}
              onChange={(e) => setForm({ ...form, postingUrl: e.target.value })}
            />
            <Textarea
              label="Job Description"
              rows={5}
              placeholder="Paste the full job description here..."
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E5E1] flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Job'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
