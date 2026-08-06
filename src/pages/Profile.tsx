import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FileText, FileX } from 'lucide-react';
import { getCurrentUser, changePassword, type CurrentUser } from '../api/auth';
import { getMyCV } from '../api/cv';
import { getErrorMessage } from '../api/client';
import { getPasswordError } from '../lib/validation';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { PasswordInput } from '../components/ui/Input';
import { DeleteAccountModal } from '../components/DeleteAccountModal';
import type { CV } from '../types';

export function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [cv, setCv] = useState<CV | null>(null);
  const [cvLoading, setCvLoading] = useState(true);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useDocumentTitle('Profile | Job Assistant AI');

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));

    getMyCV()
      .then(setCv)
      .catch((err) => {
        if (!axios.isAxiosError(err) || err.response?.status !== 404) {
          setError(getErrorMessage(err));
        }
        setCv(null);
      })
      .finally(() => setCvLoading(false));
  }, []);

  const newPasswordError = newPasswordTouched ? getPasswordError(newPassword) : undefined;

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);
    setPasswordSaving(true);
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordTouched(false);
    } catch (err) {
      setPasswordError(getErrorMessage(err));
    } finally {
      setPasswordSaving(false);
    }
  }

  function handleAccountDeleted() {
    logout();
    navigate('/');
  }

  const canChangePassword = currentPassword.length > 0 && !getPasswordError(newPassword) && !passwordSaving;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl mb-2">Profile</h1>
      <p className="text-[#6B6B6B] text-sm mb-8">Your account details and settings.</p>

      {error && <Alert className="mb-4">{error}</Alert>}

      {loading ? (
        <div className="border border-[#E8E5E1] rounded-lg p-8 bg-white shadow-sm text-[#6B6B6B]">Loading…</div>
      ) : user ? (
        <div className="space-y-6">
          <div className="bg-white border border-[#E8E5E1] shadow-sm rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#8A6F5A] rounded-full flex items-center justify-center text-white text-xl font-medium shrink-0">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-[#1F1F1F] truncate">{user.fullName || 'No name on file'}</p>
                <p className="text-sm text-[#6B6B6B] truncate">{user.email}</p>
              </div>
            </div>

            <div className="border-t border-[#E8E5E1] pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#6B6B6B] mb-1">Email</p>
                <p className="text-sm text-[#1F1F1F]">{user.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[#6B6B6B] mb-1">Member since</p>
                <p className="text-sm text-[#1F1F1F]">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E8E5E1] shadow-sm rounded-lg p-6">
            <h2 className="font-heading text-lg mb-4">Your CV</h2>
            {cvLoading ? (
              <p className="text-sm text-[#6B6B6B]">Loading…</p>
            ) : cv ? (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 bg-[#F8F7F4] rounded-md text-[#7A5C46] shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#1F1F1F] truncate">{cv.originalFilename}</p>
                    <p className="text-xs text-[#6B6B6B]">
                      Uploaded {new Date(cv.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Link to="/cv" className="shrink-0">
                  <Button variant="secondary">Manage</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-[#6B6B6B]">
                  <FileX className="w-5 h-5 shrink-0" />
                  <p className="text-sm">No CV uploaded yet.</p>
                </div>
                <Link to="/cv" className="shrink-0">
                  <Button variant="secondary">Upload CV</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="bg-white border border-[#E8E5E1] shadow-sm rounded-lg p-6">
            <h2 className="font-heading text-lg mb-1">Change password</h2>
            <p className="text-sm text-[#6B6B6B] mb-4">Update the password you use to log in.</p>

            {passwordSuccess && (
              <Alert variant="success" className="mb-4">
                Password changed successfully.
              </Alert>
            )}
            {passwordError && <Alert className="mb-4">{passwordError}</Alert>}

            <form onSubmit={handleChangePassword} noValidate>
              <PasswordInput
                label="Current password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <div className="mb-1">
                <PasswordInput
                  label="New password"
                  required
                  minLength={8}
                  value={newPassword}
                  error={newPasswordError}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onBlur={() => setNewPasswordTouched(true)}
                />
                {!newPasswordError && (
                  <p className="text-xs text-[#6B6B6B] -mt-3 mb-4">At least 8 characters. Avoid common passwords.</p>
                )}
              </div>
              <Button type="submit" variant="primary" disabled={!canChangePassword}>
                {passwordSaving ? 'Saving…' : 'Update password'}
              </Button>
            </form>
          </div>

          <div className="bg-white border border-[#B5654A]/30 shadow-sm rounded-lg p-6">
            <h2 className="font-heading text-lg mb-1 text-[#9C4E38]">Danger zone</h2>
            <p className="text-sm text-[#6B6B6B] mb-4">
              Permanently delete your account, CV, job applications, and chat history. This cannot be undone.
            </p>
            <Button variant="destructive" onClick={() => setDeleteModalOpen(true)}>
              Delete my account
            </Button>
          </div>
        </div>
      ) : null}

      <DeleteAccountModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDeleted={handleAccountDeleted}
      />
    </div>
  );
}
