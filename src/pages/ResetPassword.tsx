import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../api/auth';
import { getErrorMessage } from '../api/client';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/ui/Button';
import { PasswordInput } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <AuthLayout title="Invalid link">
        <Alert className="mb-6">
          This password reset link is missing its token. Request a new one from the forgot password page.
        </Alert>
        <div className="text-center text-sm text-[#6B6B6B]">
          <Link to="/forgot-password" className="text-[#7A5C46] font-medium hover:underline">
            Request a new link
          </Link>
        </div>
      </AuthLayout>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await resetPassword(token as string, password);
      navigate('/login');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = password.length >= 8 && confirmPassword.length > 0 && !loading;

  return (
    <AuthLayout title="Choose a new password">
      {error && <Alert className="mb-6">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <PasswordInput
          label="New password"
          placeholder="••••••••"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          label="Confirm new password"
          placeholder="••••••••"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button className="w-full mt-2" type="submit" disabled={!canSubmit}>
          {loading ? 'Resetting…' : 'Reset password'}
        </Button>
      </form>
    </AuthLayout>
  );
}
