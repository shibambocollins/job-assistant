import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, type CurrentUser } from '../api/auth';
import { getErrorMessage } from '../api/client';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Alert } from '../components/ui/Alert';

export function Profile() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle('Profile | Job Assistant AI');

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl mb-2">Profile</h1>
      <p className="text-[#6B6B6B] text-sm mb-8">Your account details.</p>

      {error && <Alert className="mb-4">{error}</Alert>}

      {loading ? (
        <div className="border border-[#E8E5E1] rounded-lg p-8 bg-white shadow-sm text-[#6B6B6B]">Loading…</div>
      ) : user ? (
        <div className="bg-white border border-[#E8E5E1] shadow-sm rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#A58A76] rounded-full flex items-center justify-center text-white text-xl font-medium shrink-0">
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

          <div className="border-t border-[#E8E5E1] pt-6">
            <Link to="/forgot-password" className="text-sm text-[#7A5C46] font-medium hover:underline">
              Change your password
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
