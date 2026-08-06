import { useState, type FormEvent } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Alert } from './ui/Alert';
import { deleteAccount } from '../api/auth';
import { getErrorMessage } from '../api/client';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

const CONFIRM_TEXT = 'DELETE';

export function DeleteAccountModal({ isOpen, onClose, onDeleted }: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setDeleting(true);
    setError(null);
    try {
      await deleteAccount();
      onDeleted();
    } catch (err) {
      setError(getErrorMessage(err));
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#F8F7F4]/80 backdrop-blur-sm">
      <div className="bg-white border border-[#E8E5E1] shadow-lg rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-[#B5654A]/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-[#B5654A]" />
          </div>
          <button onClick={onClose} className="text-[#6B6B6B] hover:text-[#1F1F1F]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-xl font-heading mb-2">Delete your account</h2>
        <p className="text-sm text-[#6B6B6B] mb-4">
          This permanently deletes your account, uploaded CV, job applications, and chat history. This cannot be
          undone.
        </p>

        {error && <Alert className="mb-4">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <label className="text-sm font-medium text-[#1F1F1F] mb-1.5 block">
            Type <span className="font-mono font-semibold">{CONFIRM_TEXT}</span> to confirm
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-3 py-2 border border-[#E8E5E1] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#B5654A] focus:border-[#B5654A] bg-white text-[#1F1F1F] mb-4"
            autoComplete="off"
          />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={confirmText !== CONFIRM_TEXT || deleting}>
              {deleting ? 'Deleting…' : 'Delete my account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
